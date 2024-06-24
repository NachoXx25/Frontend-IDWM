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
  users$: Observable<User[]> | undefined;
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserOnChange();
  }

  loadUserOnChange(): void {
    const searchQueryControl = this.searchForm.get('searchQuery');
    if (searchQueryControl) {
      this.users$ = searchQueryControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
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
      this.userService.getUsers();
    }
  }

  changeUserState(userId: number, newUserState: string): void {
    this.userService.changeUserState(userId, newUserState).subscribe(
      response => {
        console.log(`Estado del usuario ${userId} cambiado a "${newUserState}"`);
        this.loadUserOnChange(); // Recargar los usuarios después de cambiar el estado
      },
      error => {
        console.error('Error al cambiar el estado del usuario:', error);
      }
    );
  }

}
