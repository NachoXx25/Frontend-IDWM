import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { SearchProductsComponent } from '../admin/pages/search-products/search-products.component';
import { ProductCardComponent } from "../admin/pages/product-card/product-card.component";
import { AdminRoutingModule } from './admin-routing.module';
import { SearchPurchasesComponent } from './pages/sales/sales.component';
import { SalesCardComponent } from './pages/sales-card/sales-card.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';



@NgModule({
    declarations: [
        SearchProductsComponent,
        SearchPurchasesComponent,
        ManageUserComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        ProductCardComponent,
        SalesCardComponent,
    ]
})
export class AdminModule { }
