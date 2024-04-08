import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  public productos: Producto[] = [];

  public searchInput = new FormControl('');

  public productosSearch: Producto[]=[];

  public selectedProducto?: Producto;

  constructor(private productosService: ProductoService, private router: Router){}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(productos=> this.productos = productos);
  }


  searchProducto(){
    const value: string = this.searchInput.value || "";

    this.productosService.getSuggestions(value).subscribe(productos=> this.productosSearch=productos);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent):void{
    if (!event.option.value) {
        this.selectedProducto = undefined;
        return;
    }

    const producto: Producto = event.option.value;
    this.searchInput.setValue(producto.nombre);

    this.selectedProducto = producto;
  }

}
