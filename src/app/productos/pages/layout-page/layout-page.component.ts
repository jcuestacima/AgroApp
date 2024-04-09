import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  constructor(private router: Router, private authSerevice: AuthService){
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

  get usuario():Usuario |undefined{
    return this.authSerevice.currentUser;
  }

  onLogout(){
    this.authSerevice.logout();
    this.router.navigate(['/auth/login'])
  }


}
