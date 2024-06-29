import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductCardComponentCustomer } from './pages/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchProductsComponentCustomer } from './pages/search-products/search-products.component';



@NgModule({
    declarations: [
        PurchaseComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CustomerRoutingModule,
        ProductCardComponentCustomer,
        ReactiveFormsModule,
        SearchProductsComponentCustomer,
        FormsModule
    ]
})
export class CustomerModule { }
