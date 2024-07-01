import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
})
export class ManageUserComponent implements OnInit {
  users$: Observable<User[]> | undefined; // Lista de usuarios
  searchForm: FormGroup; // Formulario de búsqueda

  constructor( // Constructor del componente
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    }); // Crear el formulario de búsqueda
  }

  ngOnInit(): void {
    this.loadUserOnChange(); // Cargar los usuarios al iniciar
  }
  /**
   * Carga los usuarios al cambiar
   */
  loadUserOnChange(): void {
    const searchQueryControl = this.searchForm.get('searchQuery');
    if (searchQueryControl) {
      this.users$ = searchQueryControl.valueChanges.pipe(
        startWith(''), // Empezar con un valor vacío
        debounceTime(300), // Esperar 300ms
        distinctUntilChanged(), // No repetir si no cambia
        switchMap(query => {
          if (query.trim() === '') {
            return this.userService.getUsers();
          } else {
            return this.userService.searchUsers(query.trim());
          }
        })
      );
    }
    else{
      this.userService.getUsers(); // Llamar a la API para obtener los usuarios
    }
  }
  /**
   *  Cambia el estado de un usuario
   * @param userId  ID del usuario
   * @param newUserState  Nuevo estado del usuario
   */
  changeUserState(userId: number, newUserState: string): void {
    this.userService.changeUserState(userId, newUserState).subscribe(
      response => {
        console.log(`Estado del usuario ${userId} cambiado a "${newUserState}"`);
        this.loadUserOnChange(); // Recargar los usuarios
      },
      error => {
        console.error('Error al cambiar el estado del usuario:', error); // Mostrar error en consola
      }
    );
  }

}
