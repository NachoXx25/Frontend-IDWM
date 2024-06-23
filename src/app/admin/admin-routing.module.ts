import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchProductsComponent } from "./pages/search-products/search-products.component";

const routes: Routes = [

   { path: 'ProductsViewAndSearch', component: SearchProductsComponent},
   { path: '**', redirectTo: 'ProductsViewAndSearch' }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class AdminRoutingModule { }
