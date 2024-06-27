import { Component, Input } from '@angular/core';
import { productDto } from 'src/app/_interfaces/productDto';
import { CommonModule } from '@angular/common';
import { RoundPipe } from 'src/app/_pipes/round.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RoundPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: productDto | undefined;

  constructor() {}

  createRange(n: number): number[] {
    return new Array(n);
  }
}
