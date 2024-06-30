import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { ProductType } from 'src/app/_interfaces/productType';
import { productDto } from 'src/app/_interfaces/productDto';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
})
export class SearchProductsComponent implements OnInit {
  products$: Observable<productDto[]> | undefined;
  searchForm: FormGroup;
  addForm: FormGroup;
  productTypes: ProductType[] = [];
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required]
    });

    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(64)]],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image: [null, Validators.required],
      productTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductTypes();
    this.loadProductsOnChange();
  }

  loadProductTypes(): void {
    this.productService.getProductTypes().subscribe({
      next: (types) => {
        this.productTypes = types;
      },
      error: (error) => {
        console.error('Error loading product types:', error);
        // Handle errors if needed
      }
    });
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

  onSubmitAddForm(): void {
    if (this.addForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.addForm.value.name);
      formData.append('Price', this.addForm.value.price);
      formData.append('Stock', this.addForm.value.stock);
      formData.append('Image', this.addForm.value.image);
      formData.append('ProductTypeId', this.addForm.value.productTypeId);

      this.productService.addProduct(formData).pipe(
        catchError(error => {
          console.error('Error adding product:', error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
          return throwError(error);
        })
      ).subscribe({
        next: () => {
          console.log('Product added successfully.');
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.addForm.reset();
          this.loadProductsOnChange();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  onDeleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delProducts(productId).subscribe({
        next: () => {
          console.log('Product deleted successfully.');
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          this.loadProductsOnChange();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      });
    }
  }

  onEditProduct(event: { id: number; data: FormData }): void {
    this.productService.editProduct(event.id, event.data).subscribe({
      next: () => {
        console.log(`Product with ID ${event.id} edited successfully.`);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        this.loadProductsOnChange();
      },
      error: (error) => {
        console.error(`Error editing product with ID ${event.id}:`, error);
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addForm.get('image')?.setValue(file);
    }
  }
}
