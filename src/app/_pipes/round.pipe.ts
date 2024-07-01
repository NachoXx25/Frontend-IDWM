import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true,
})
/**
 *  Pipe para redondear un número
 */
export class RoundPipe implements PipeTransform {
  /**
   * Redondea un número
   * @param value  Número a redondear
   * @returns  Número redondeado
   */
  transform(value: number): number {
    return Math.round(value);
  }
}
