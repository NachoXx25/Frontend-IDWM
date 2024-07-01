import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HomeNavBarComponent } from './components/home-nav-bar/home-nav-bar.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    HomeNavBarComponent,
    SelectInputComponent,
    TextInputComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgClass
  ],
  exports: [
    FooterComponent,
    HomeNavBarComponent,
    SelectInputComponent,
    TextInputComponent,
    SideBarComponent,

  ]
})
export class SharedModule { }
