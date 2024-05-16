import { Component } from '@angular/core';
import { ProductoService } from '../../services/productos.service';
import { ProductoCarrito } from '../../interfaces/productoCarrito.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'carro-compra-page',
  templateUrl: './carroCompra.component.html',
  styles: ``
})
export class CarroCompraComponent {
  public carritoProductos: ProductoCarrito[]=[];
  constructor(private authService: AuthService,  private productosService: ProductoService ){}
  ngOnInit(): void {
    this.productosService.getProductosCarritoIdUser().subscribe(productosCarrito=> this.carritoProductos = productosCarrito);
  }

  getTotalCarrito(): string {
    let totalCarrito = 0;
    this.carritoProductos.forEach(carritoProducto => {
      totalCarrito += (carritoProducto.pesoAproximadoUnidad / 1000) * carritoProducto.precio * carritoProducto.cantidad;
    });
    return totalCarrito.toFixed(2).replace('.', ',');
  }


}
