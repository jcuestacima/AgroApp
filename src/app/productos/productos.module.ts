import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewProductoPageComponent } from './pages/new-producto-page/new-producto-page.component';
import { SearchProductoPageComponent } from './pages/search-producto-page/search-producto-page.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { CarroCompraComponent } from './pages/carroCompraPage/carroCompra.component';
import { ProductoImagePipe } from './pipes/producto-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';


@NgModule({
  declarations: [
    ProductoPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewProductoPageComponent,
    SearchProductoPageComponent,
    CardComponent,
    CarroCompraComponent,
    ProductoImagePipe,

  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton
  ]
})
export class ProductosModule { }
