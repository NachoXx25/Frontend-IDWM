import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchProductsComponent } from "./pages/search-products/search-products.component";
import { SearchPurchasesComponent } from "./pages/sales/sales.component";
import { ManageUserComponent } from "./pages/manage-user/manage-user.component";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
   { path: 'ProductsViewAndSearch', component: SearchProductsComponent, canActivate: [AdminGuard]},
   { path: 'PurchasesViewAndSearch', component: SearchPurchasesComponent, canActivate: [AdminGuard]},
   { path: 'ManageUser', component: ManageUserComponent, canActivate: [AdminGuard]},
   { path: '**', redirectTo: 'ProductsViewAndSearch' }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class AdminRoutingModule { }
