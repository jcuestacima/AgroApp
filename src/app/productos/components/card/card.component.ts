import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';
import { ProductoService } from '../../services/productos.service';

@Component({
  selector: 'productos-producto-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  @Input()
  public producto!: Producto;

  constructor(private router: Router, private authService: AuthService, private productoService: ProductoService){}

  get usuario():Usuario |undefined{
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    if (!this.producto) {
      throw Error('Propiedad producto es necesaria');
    };
  }

  irPaginaProductor(){
    this.router.navigate([`/productos/productor/${this.producto.idProductor}`]);
  }

  borrarProducto(){
    console.log(this.producto)
    this.productoService.delteByIdProducto(this.producto);
  }

}
