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

  onDeleteProduct(productId: number): void {
    this.productService.delProducts(productId).subscribe({
      next: () => {
        console.log(`Product with ID ${productId} deleted successfully.`);
        this.loadProductsOnChange();
      },
      error: (error) => {
        console.error(`Error deleting product with ID ${productId}:`, error);
      }
    });
  }

  onEditProduct(event: { id: number; data: FormData }): void {
    this.productService.editProduct(event.id, event.data).subscribe({
      next: (response) => {
        console.log(`Product with ID ${event.id} updated successfully. Response:`, response);
        this.loadProductsOnChange();
      },
      error: (error) => {
        console.error(`Error updating product with ID ${event.id}:`, error);
      }
    });
  }
}
