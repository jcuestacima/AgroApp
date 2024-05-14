import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { EsFRoHO, Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-producto-page',
  templateUrl: './update-producto-page.component.html',
  styles: ``
})
export class UpdateProductoPageComponent implements OnInit {
  productoForm: FormGroup;
  currentProducto: Producto | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productosService: ProductoService,
              private snackBar: MatSnackBar) {
    this.productoForm = new FormGroup({
      nombre: new FormControl('', { nonNullable: true }),
      id: new FormControl(''),
      idProductor: new FormControl(''),
      precio: new FormControl(0, { nonNullable: true }),
      origen: new FormControl('', { nonNullable: true }),
      pesoAproximadoUnidad: new FormControl(0, { nonNullable: true }),
      esFRoHO: new FormControl<EsFRoHO>(EsFRoHO.FR, { nonNullable: true }),
      alt_img: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productoId = params['id']; // Obtener el ID del producto de los parámetros de la ruta
      if (productoId) {
        this.productosService.getProductoById(productoId).subscribe(producto => {
          if (producto) {
            this.currentProducto = producto;
            this.fillFormWithProductoDetails(this.currentProducto);
          } else {
            // Manejar el caso donde el producto no se encuentra
          }
        });
      } else {
        // Manejar el caso donde no se proporciona un ID de producto
      }
    });
  }

  fillFormWithProductoDetails(producto: Producto): void {
    this.productoForm.patchValue({
      nombre: producto.nombre,
      id: producto.id,
      idProductor: producto.idProductor,
      precio: producto.precio,
      origen: producto.origen,
      pesoAproximadoUnidad: producto.pesoAproximadoUnidad,
      esFRoHO: producto.esFRoHO,
      alt_img: producto.alt_img
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const updatedProducto = this.productoForm.value as Producto;
    this.productosService.updateProducto(updatedProducto).subscribe(() => {
      this.showSnackBar(`${updatedProducto.nombre} se editó!`);
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

}
