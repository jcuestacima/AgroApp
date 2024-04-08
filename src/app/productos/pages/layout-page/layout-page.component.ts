import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  constructor(private router: Router){
  }
  public sidebarItems = [
    {label: 'Lista de productos', icon: 'label', url:'./listaProductos'},
    {label: 'Añadir producto', icon: 'add', url:'./nuevoProducto'},
    {label: 'Buscar producto', icon: 'search', url:'./buscarProducto'},
    {label: 'Carrito de compra', icon: 'shopping_cart', url:'./carritoCompra'},
  ]

  public carroCompra = [
    {url:'./listaProductos'}
  ]
}
