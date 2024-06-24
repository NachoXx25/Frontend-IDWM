import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { productDto } from 'src/app/_interfaces/productDto';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
})
export class SearchProductsComponent implements OnInit {
  products$: Observable<productDto[]> | undefined;
  searchForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductsOnChange();
  }

  loadProductsOnChange(): void {
    const searchQueryControl = this.searchForm.get('searchQuery');
    if (searchQueryControl) {
      this.products$ = searchQueryControl.valueChanges.pipe(
        startWith(''), // Emite un valor inicial para que se carguen todos los productos al inicio
        debounceTime(300), // Espera 300ms después de cada pulsación de tecla
        distinctUntilChanged(), // Asegura que solo se realice una búsqueda si el valor ha cambiado
        switchMap(query => {
          if (query.trim() === '') {
            return this.productService.getProducts();
          } else {
            return this.productService.searchProducts(query.trim());
          }
        })
      );
    }
    else{
      this.productService.getProducts();
    }
  }
}
