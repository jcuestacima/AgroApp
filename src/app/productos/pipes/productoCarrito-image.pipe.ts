import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/productos.interface';
import { ProductoCarrito } from '../interfaces/productoCarrito.interface';

@Pipe({
  name: 'productoCarritoImage'
})
export class ProductoCarritoImagePipe implements PipeTransform {

  transform(productoCarrito: ProductoCarrito): string {

    return `assets/assetsFrutasYHortalizas/${productoCarrito.idImagen}.jpg`;
  }

}
