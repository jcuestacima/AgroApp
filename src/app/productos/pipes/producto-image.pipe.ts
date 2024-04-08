import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/productos.interface';

@Pipe({
  name: 'productoImage'
})
export class ProductoImagePipe implements PipeTransform {

  transform(producto: Producto): string {
    if (!producto && !producto['alt_img']) {
      return "assets/assetsFrutasYHortalizas/no-image.png"
    }

    if (producto.alt_img) {
      return producto.alt_img;
    }

    return `assets/assetsFrutasYHortalizas/${producto.id}.jpg`;
  }

}
