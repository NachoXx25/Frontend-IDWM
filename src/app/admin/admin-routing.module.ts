import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchProductsComponent } from "./pages/search-products/search-products.component";
import { SearchPurchasesComponent } from "./pages/sales/sales.component";
import { ManageUserComponent } from "./pages/manage-user/manage-user.component";

const routes: Routes = [
   { path: 'ProductsViewAndSearch', component: SearchProductsComponent},
   { path: 'PurchasesViewAndSearch', component: SearchPurchasesComponent},
   { path: 'ManageUser', component: ManageUserComponent},
   { path: '**', redirectTo: 'ProductsViewAndSearch' }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class AdminRoutingModule { }
