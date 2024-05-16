import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';
import { ProductoService } from '../../services/productos.service';
import { Observable } from 'rxjs';
import { LoginPageComponent } from '../../../auth/pages/login-page/login-page.component';
import { ProductoCarrito } from '../../interfaces/productoCarrito.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'carrito-producto-card',
  templateUrl: './carritoCard.component.html',
  styles: ``
})
export class CarritoCardComponent implements OnInit{
  @Input()
  public productoCarrito!: ProductoCarrito;
  public total: number=0;

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private productoService: ProductoService){

  }

  get usuario():Usuario |undefined{
    return this.authService.currentUser;
  }

  get productoEdit():Producto|undefined{
    return this.productoService.currentProducto;
  }

  ngOnInit(): void {
    if (!this.productoCarrito) {
      throw Error('Propiedad producto es necesaria');
    };
  }

  borrarCarritoProducto() {
    console.log(this.productoCarrito);
    this.productoService.deleteByIdProductoCarrito(this.productoCarrito.id!).subscribe(
      () => {
        window.location.reload();

      },
      (error) => {
        console.error('Error al borrar el producto:', error);
        alert('Error al borrar el producto.');

      }
    );


  }

  calcularTotalProducto(): string {
    this.total = (this.productoCarrito.pesoAproximadoUnidad / 1000) * this.productoCarrito.precio * this.productoCarrito.cantidad;

    const totalFormateado = this.total.toFixed(2).replace('.', ',');
    return totalFormateado;
}

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'Cerrar', {duration: 3000})
  }
}
