import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchase } from 'src/app/_interfaces/purchase';
import { RoundPipe } from 'src/app/_pipes/round.pipe';

@Component({
  selector: 'app-receipt-card',
  standalone: true,
  imports: [CommonModule, RoundPipe],
  templateUrl: './sales-card.component.html',
})
export class SalesCardComponent {

  @Input() purchase: Purchase | undefined; // Compra a mostrar
  constructor() {} // Constructor del componente

  createRange(n: number): number[] {
    return new Array(n); // Crear un array de n elementos
  }
}
