import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { productDto } from 'src/app/_interfaces/productDto';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ProductCardComponentCustomer } from "../product-card/product-card.component";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: 'app-search-products-customer',
  standalone: true,
  templateUrl: './search-products.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProductCardComponentCustomer, SharedModule]
})
export class SearchProductsComponentCustomer implements OnInit {
  @Output() productSelected = new EventEmitter<{ product: productDto, quantity: number }>();
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
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query.trim() === '') {
            return this.productService.getProducts();
          } else {
            return this.productService.searchProducts(query.trim());
          }
        })
      );
    }
  }

  onProductSelect(product: productDto, quantity: number) {
    this.productSelected.emit({ product, quantity });
  }
}
