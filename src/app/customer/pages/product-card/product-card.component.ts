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
  @Input() product: productDto | undefined;
  @Output() productSelected = new EventEmitter<{ product: productDto, quantity: number }>();
  quantity: number = 1;

  constructor() {}

  selectProduct() {
    if (this.product) {
      this.productSelected.emit({ product: this.product, quantity: this.quantity });
    }
  }

  createRange(n: number): number[] {
    return new Array(n);
  }

}
