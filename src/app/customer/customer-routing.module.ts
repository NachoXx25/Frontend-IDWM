import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PurchaseComponent } from "./pages/purchase/purchase.component";

const routes: Routes = [

  {path: 'purchase', component: PurchaseComponent},
  {path: '**', redirectTo: 'purchase'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
