import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchProductsComponent } from '../admin/pages/search-products/search-products.component';
import { ProductCardComponent } from "../admin/pages/product-card/product-card.component";
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
    declarations: [
        SearchProductsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        ProductCardComponent
    ]
})
export class AdminModule { }
