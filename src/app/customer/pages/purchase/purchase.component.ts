import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PurchaseService } from 'src/app/_services/purchase.service';
import { PurchaseDto } from 'src/app/_interfaces/purchaseDTO';
import { productDto } from 'src/app/_interfaces/productDto';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent {
  selectedProduct: productDto | undefined;
  selectedQuantity: number = 1;

  constructor(private purchaseService: PurchaseService) {}

  onProductSelected(event: { product: productDto, quantity: number }) {
    this.selectedProduct = event.product;
    this.selectedQuantity = event.quantity;
    console.log('Producto seleccionado:', this.selectedProduct);
    console.log('Cantidad seleccionada:', this.selectedQuantity);
  }

  makePurchase() {
    if (this.selectedProduct && this.selectedQuantity > 0) {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      const user_id = auth?.user?.id;
      const userS = user_id.toString()
      console.log("userid:  ", userS)
      const purchase: PurchaseDto = {
        quantity: this.selectedQuantity.toString(),
        userId: userS, // Cambiar por el ID de usuario correspondiente
        productId: this.selectedProduct.id.toString(),
      };

      console.log('Realizando compra:', purchase);

      this.purchaseService.makePurchase(purchase).subscribe({
        next: () => {
          console.log('Compra realizada con éxito');
        },
        error: (error) => {
          console.error('Error al realizar la compra:', error);
        }
      });
    } else {
      console.warn('No se puede realizar la compra. Verifica que hay un producto seleccionado y la cantidad es mayor que cero.');
    }
  }
}
