import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';

@Component({
  selector: 'productos-producto-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  @Input()
  public producto!: Producto;


  ngOnInit(): void {
    if (!this.producto) {
      throw Error('Propiedad producto es necesaria');
    };
  }


}
