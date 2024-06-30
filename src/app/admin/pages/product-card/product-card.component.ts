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
  @Input() product: productDto | undefined; // Producto a mostrar
  @Output() deleteProductClicked: EventEmitter<number> = new EventEmitter<number>(); // Evento al eliminar un producto
  @Output() editProductClicked: EventEmitter<{ id: number; data: FormData }> = new EventEmitter<{ id: number; data: FormData }>(); // Evento al editar un producto

  isEditing = false; // Si se está editando
  editProduct = {
    name: '',
    price: 0,
    stock: 0,
    image: null as File | null,
  }; // Producto a editar

  constructor() {} // Constructor del componente
  /**
   * Cambia el estado de edición
   */
  toggleEdit(): void {
    if (this.product) {
      this.editProduct = {
        name: this.product.name,
        price: this.product.price,
        stock: this.product.stock,
        image: null,
      }; // Crear un objeto con los datos del producto
      this.isEditing = !this.isEditing; // Cambiar el estado de edición
    }
  }
  /**
   *  Elimina un producto
   * @param productId  ID del producto a eliminar
   */
  onDeleteProductClick(productId: number): void {
    this.deleteProductClicked.emit(productId);
  }
  /**
   *  Selecciona un archivo
   * @param event  Evento del input
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editProduct.image = input.files[0];
    }
  }
  /**
   * Envía el formulario de edición
   */
  onSubmitEditForm(): void {
    if (this.product) { // Si hay un producto
      const updatedProductData = new FormData();
      updatedProductData.append('name', this.editProduct.name);
      updatedProductData.append('price', this.editProduct.price.toString());
      updatedProductData.append('stock', this.editProduct.stock.toString());

      if (this.editProduct.image) {
        updatedProductData.append('image', this.editProduct.image, this.editProduct.image.name);
      } // Crear un objeto FormData con los datos del producto

      this.editProductClicked.emit({ id: this.product.id, data: updatedProductData });
      this.isEditing = false; // Cambiar el estado de edición
    }
  }
}
