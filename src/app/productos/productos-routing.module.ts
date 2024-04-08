import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewProductoPageComponent } from './pages/new-producto-page/new-producto-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { SearchProductoPageComponent } from './pages/search-producto-page/search-producto-page.component';
import { CarroCompraComponent } from './pages/carroCompraPage/carroCompra.component';
import { RegisterPageComponent } from '../auth/pages/register-page/register-page.component';
import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      {path:'nuevoProducto',component: NewProductoPageComponent},
      {path:'editarProducto/:id',component: NewProductoPageComponent},
      {path:'listaProductos',component: ListPageComponent},
      {path:'buscarProducto', component: SearchProductoPageComponent},
      {path:'carritoCompra', component: CarroCompraComponent},
      {path:'auth/login', component: LoginPageComponent},
      {path:'**', redirectTo:'listaProductos'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
