import { Component } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { FormControl } from '@angular/forms';
import { ProductoService } from '../../services/productos.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-producto-page',
  templateUrl: './search-producto-page.component.html',
  styles: ``
})
export class SearchProductoPageComponent{
  selectedFilter: number;
  showProductosFilter: boolean = false;

  public searchInput = new FormControl('');

  public productos: Producto[]=[];

  public selectedProducto?: Producto;

  constructor(private productosService: ProductoService ){this.selectedFilter = 0;}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(productos=> this.productos = productos);
  }

  searchProducto(){
    const value: string = this.searchInput.value || "";

    this.productosService.getSuggestions(value).subscribe(productos=> this.productos=productos);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent):void{
    if (!event.option.value) {
        this.selectedProducto = undefined;
        return;
    }

    const producto: Producto = event.option.value;
    this.searchInput.setValue(producto.nombre);

    this.selectedProducto = producto;
    this.searchProducto();
  }


  roleSelected(role: number) {
    this.selectedFilter = role;

    if (role === 1) {
      this.productosService.getFrutas().subscribe(productos=> this.productos=productos);
    } else if (role===2) {
      this.productosService.getHortalizas().subscribe(productos=> this.productos=productos);
    }
  }




}
