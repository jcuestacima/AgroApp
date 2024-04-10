import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'productos-producto-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  @Input()
  public producto!: Producto;

  constructor(private router: Router){}

  ngOnInit(): void {
    if (!this.producto) {
      throw Error('Propiedad producto es necesaria');
    };
  }

  irPaginaProductor(){
    this.router.navigate([`/productos/productor/${this.producto.idProductor}`]);
  }

}
