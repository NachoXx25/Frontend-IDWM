import { Component } from '@angular/core';
import { PurchaseService } from 'src/app/_services/purchase.service';
import { PurchaseDto } from 'src/app/_interfaces/purchaseDTO';
import { productDto } from 'src/app/_interfaces/productDto';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent {
  selectedProduct: productDto | undefined; // Producto seleccionado
  selectedQuantity: number = 1; // Cantidad seleccionada
  showSuccessMessage: boolean = false; // Mostrar mensaje de éxito
  showErrorMessage: boolean = false; // Mostrar mensaje de error

  constructor(
    private purchaseService: PurchaseService,
  ) {}
  /**
   *  Selecciona un producto
   * @param event  Evento del producto seleccionado
   */
  onProductSelected(event: { product: productDto, quantity: number }) {
    this.selectedProduct = event.product;
    this.selectedQuantity = event.quantity;
  }
  /**
   * Realiza una compra
   */
  makePurchase() {
    if (this.selectedProduct && this.selectedQuantity > 0) {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}'); // Datos de autenticación
      const user_id = auth?.user?.id; // ID del usuario
      const userS = user_id.toString(); // ID del usuario en string

      const purchase: PurchaseDto = {
        quantity: this.selectedQuantity.toString(),
        userId: userS,
        productId: this.selectedProduct.id.toString(),
      }; // Crear objeto de compra

      this.purchaseService.makePurchase(purchase).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000); // Manejar éxito
        },
        error: (error) => {
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000); // Manejar errores
        }
      });
    } else {
      console.warn('No se puede realizar la compra. Verifica que hay un producto seleccionado y la cantidad es mayor que cero.'); // Mostrar advertencia
    }
  }
}
