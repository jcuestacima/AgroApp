import { Component, Injectable, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productor-page',
  templateUrl: './productor.page.html',
  styles: ``
})
@Injectable()
export class ProductorPageComponent implements OnInit{
  productosDelProductor: Producto[] = [];
  idProductor: string = '';
  constructor(private productosService: ProductoService, private router: Router) {}

  ngOnInit() {
    // Obtenemos el ID del productor de la URL actual
    this.idProductor = this.getIdProductorFromUrl();

    // Llamamos al método que busca todos los productos del productor
    this.getProductosDelProductor(this.idProductor);
  }

  getIdProductorFromUrl(): string {
    // Obtenemos la URL actual
    const currentUrl = this.router.url;

    // Extraemos el ID del productor de la URL
    // Supongamos que el ID del productor está al final de la URL después de la última /
    const parts = currentUrl.split('/');
    const idProductor = parts[parts.length - 1];

    return idProductor;
  }

  getProductosDelProductor(idProductor: string) {
    this.productosService.getProductos().subscribe(productos => {
      // Filtramos los productos por el ID del productor
      this.productosDelProductor = productos.filter(producto => producto.idProductor === idProductor);
    });
  }
}
