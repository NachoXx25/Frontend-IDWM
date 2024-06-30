import { Component, EventEmitter, Input, Output } from '@angular/core';
import { productDto } from 'src/app/_interfaces/productDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoundPipe } from 'src/app/_pipes/round.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RoundPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: productDto | undefined;
  @Output() deleteProductClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() editProductClicked: EventEmitter<{ id: number; data: FormData }> = new EventEmitter<{ id: number; data: FormData }>();

  isEditing = false;
  editProduct = {
    name: '',
    price: 0,
    stock: 0,
    image: null as File | null,
  };

  constructor() {}

  toggleEdit(): void {
    if (this.product) {
      this.editProduct = {
        name: this.product.name,
        price: this.product.price,
        stock: this.product.stock,
        image: null,
      };
      this.isEditing = !this.isEditing;
    }
  }

  onDeleteProductClick(productId: number): void {
    this.deleteProductClicked.emit(productId);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editProduct.image = input.files[0];
    }
  }

  onSubmitEditForm(): void {
    if (this.product) {
      const updatedProductData = new FormData();
      updatedProductData.append('name', this.editProduct.name);
      updatedProductData.append('price', this.editProduct.price.toString());
      updatedProductData.append('stock', this.editProduct.stock.toString());

      if (this.editProduct.image) {
        updatedProductData.append('image', this.editProduct.image, this.editProduct.image.name);
      }

      this.editProductClicked.emit({ id: this.product.id, data: updatedProductData });
      this.isEditing = false;
    }
  }
}
