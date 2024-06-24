import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Purchase } from 'src/app/_interfaces/purchase';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-purchases',
  templateUrl: './sales.component.html',
})
export class SearchPurchasesComponent implements OnInit {
  purchases$: Observable<Purchase[]> | undefined;
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
    this.loadPurchasesOnChange();
  }

  loadPurchasesOnChange(): void {
    const searchQueryControl = this.searchForm.get('searchQuery');
    if (searchQueryControl) {
      this.purchases$ = searchQueryControl.valueChanges.pipe(
        startWith(''), // Emite un valor inicial para que se carguen todas las compras al inicio
        debounceTime(300), // Espera 300ms después de cada pulsación de tecla
        distinctUntilChanged(), // Asegura que solo se realice una búsqueda si el valor ha cambiado
        switchMap(query => {
          if (query.trim() === '') {
            return this.userService.getPurchases();
          } else {
            return this.userService.searchPurchases(query.trim());
          }
        })
      );
    }
    else{
      this.userService.getPurchases();
    }
  }

}
