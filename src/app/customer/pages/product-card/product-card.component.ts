import { Component, Input, Output, EventEmitter } from '@angular/core';
import { productDto } from 'src/app/_interfaces/productDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card-customer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponentCustomer {
  @Input() product: productDto | undefined; // Producto a mostrar
  @Output() productSelected = new EventEmitter<{ product: productDto, quantity: number }>(); // Evento al seleccionar un producto
  quantity: number = 1; // Cantidad seleccionada

  constructor() {}
  /**
   * Selecciona un producto
   */
  selectProduct() {
    if (this.product) {
      this.productSelected.emit({ product: this.product, quantity: this.quantity });
    }
  }
  /**
   *  Cambia la cantidad
   * @param n  Nueva cantidad
   * @returns  Rango de números
   */
  createRange(n: number): number[] {
    return new Array(n);
  }

}
