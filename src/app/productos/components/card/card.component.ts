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
  selector: 'productos-producto-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  @Input()
  public producto!: Producto;
  unidades: number = 0;

  public nuevoProductoCarrito?: ProductoCarrito;

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private productoService: ProductoService){
    this.nuevoProductoCarrito = {
      nombre: '',
      pesoAproximadoUnidad: 0,
      precio: 0,
      idCliente: "",
      cantidad: 0,
      idImagen: "",
      origen:""
    };
  }

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
    this.productoService.deleteByIdProducto(this.producto.id).subscribe(
      () => {
        alert('Producto borrado exitosamente.');
        // Aquí podrías realizar cualquier acción adicional después de borrar el producto, como actualizar la lista de productos, mostrar un mensaje de éxito, etc.
        window.location.reload();
      },
      (error) => {
        console.error('Error al borrar el producto:', error);
        alert('Error al borrar el producto.');
        // Manejar cualquier error que ocurra durante la solicitud HTTP
      }
    );
  }

  anadirProductoCarrito(producto: Producto){
    this.nuevoProductoCarrito!.nombre = producto.nombre;
    this.nuevoProductoCarrito!.pesoAproximadoUnidad = producto.pesoAproximadoUnidad;
    this.nuevoProductoCarrito!.idImagen = producto.id;
    this.nuevoProductoCarrito!.precio = producto.precio;
    this.nuevoProductoCarrito!.origen = producto.origen;
    this.nuevoProductoCarrito!.idCliente = this.usuario!.id;
    this.nuevoProductoCarrito!.cantidad = this.unidades; // Aquí asignamos la cantidad de unidades recogida del input

    this.productoService.anadirAlCarrito(this.nuevoProductoCarrito!).subscribe(
      () => {
        this.showSnackBar('Producto añadido exitosamente al carrito.');
        // Aquí podrías realizar cualquier acción adicional después de borrar el producto, como actualizar la lista de productos, mostrar un mensaje de éxito, etc.

      },
      (error) => {
        console.error('Error al añadir el producto al carrito:', error);
        alert('Error al añadir el producto al carrito.');
      });
  }

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'Cerrar', {duration: 5000})
  }


  irPaginaActualizarProducto(productoId: string): void {
    this.router.navigate([`productos/editarProducto/${productoId}`]);
  }

}
