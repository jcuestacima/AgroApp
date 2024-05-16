import { Component, Injectable, OnInit } from '@angular/core';
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

@Injectable()
export class ListPageComponent implements OnInit{
  public productos: Producto[] = [];

  public searchInput = new FormControl('');

  public productosSearch: Producto[]=[];

  public selectedProducto?: Producto;

  constructor(private productosService: ProductoService, private router: Router){}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(productos=> this.productos = productos);
  }




}
