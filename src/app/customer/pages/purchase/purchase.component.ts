import { Component } from '@angular/core';
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
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private purchaseService: PurchaseService,
  ) {}

  onProductSelected(event: { product: productDto, quantity: number }) {
    this.selectedProduct = event.product;
    this.selectedQuantity = event.quantity;
  }

  makePurchase() {
    if (this.selectedProduct && this.selectedQuantity > 0) {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      const user_id = auth?.user?.id;
      const userS = user_id.toString();

      const purchase: PurchaseDto = {
        quantity: this.selectedQuantity.toString(),
        userId: userS,
        productId: this.selectedProduct.id.toString(),
      };

      this.purchaseService.makePurchase(purchase).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (error) => {
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      });
    } else {
      console.warn('No se puede realizar la compra. Verifica que hay un producto seleccionado y la cantidad es mayor que cero.');
    }
  }
}
