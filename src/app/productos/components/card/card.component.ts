import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';
import { ProductoService } from '../../services/productos.service';
import { Observable } from 'rxjs';
import { LoginPageComponent } from '../../../auth/pages/login-page/login-page.component';

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

  get productoEdit():Producto|undefined{
    return this.productoService.currentProducto;
  }

  ngOnInit(): void {
    if (!this.producto) {
      throw Error('Propiedad producto es necesaria');
    };
  }

  irPaginaProductor(){
    this.router.navigate([`/productos/productor/${this.producto.idProductor}`]);
  }

  borrarProducto() {
    console.log(this.producto);
    this.productoService.deleteByIdProducto(this.producto).subscribe(
      () => {
        alert('Producto borrado exitosamente.');
        // Aquí podrías realizar cualquier acción adicional después de borrar el producto, como actualizar la lista de productos, mostrar un mensaje de éxito, etc.
      },
      (error) => {
        console.error('Error al borrar el producto:', error);
        alert('Error al borrar el producto.');
        // Manejar cualquier error que ocurra durante la solicitud HTTP
      }
    );

    this.router.navigate([`/productos/productor/${this.usuario?.id}`]);
  }


  // actualizarProducto(){
  //   this.router.navigate([`/productos/nuevoProducto`]);
  // }

}
