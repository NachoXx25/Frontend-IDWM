import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PurchaseComponent } from "./pages/purchase/purchase.component";
import { CustomerGuard } from "./guards/customer.guard";

const routes: Routes = [

  { path: 'purchase', component: PurchaseComponent, canActivate: [CustomerGuard]},
  {path: '**', redirectTo: 'purchase'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
