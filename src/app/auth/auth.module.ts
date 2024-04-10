import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayourPageComponent } from './pages/layour-page/layour-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MaterialModule } from "../material/material.module";
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosModule } from '../productos/productos.module';

@NgModule({
  declarations: [
    LayourPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    ProductosModule,
  ]
})
export class AuthModule { }
