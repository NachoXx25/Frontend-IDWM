import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [

  // { path: '', component: HomePageComponent},
   { path: 'login', component: LoginComponent},
  // { path: 'register', component: RegisterComponent},
  // { path: 'editProfile', component: EditProfileComponent},
  // { path: 'home', component: HomePageComponent},
  // { path: 'changePassword', component: ChangePasswordComponent}

];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class AuthRoutingModule { }
