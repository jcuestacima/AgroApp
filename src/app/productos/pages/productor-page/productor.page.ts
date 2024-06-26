import { Component, Injectable, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../../interfaces/productos.interface';
import { Router } from '@angular/router';
import { Usuario } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Resena } from '../../interfaces/resena.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../environments/environments';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productor-page',
  templateUrl: './productor.page.html',
  styles: ``
})
@Injectable()
export class ProductorPageComponent implements OnInit{
  thisProductor: Usuario | undefined;
  productosDelProductor: Producto[] = [];
  resenasDelProductor: Resena[] = [];
  idProductor: string = '';
  currentUser?: Usuario = this.authServic.currentUser;
  private baseUrl: string = environments.baseUrl;
  constructor(private snackBar: MatSnackBar,private httpClient: HttpClient, private productosService: ProductoService, private router: Router, private authServic: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authServic.currentUser;

    this.idProductor = this.getIdProductorFromUrl();

    this.authServic.searchProductorById(this.idProductor).subscribe(productor => {
      this.thisProductor = productor;
    });

    this.getResenasDelProductor(this.idProductor);


    this.getProductosDelProductor(this.idProductor);
  }

  get usuario():Usuario |undefined{
    return this.authServic.currentUser;
  }

  public resenaForm = new FormGroup({
    contenido:              new FormControl('', {nonNullable:true}),
    usuarioCliente:                   new FormControl(this.currentUser?.usuario),
    idProductor:          new FormControl(this.getIdProductorFromUrl()),
  });

  getIdProductorFromUrl(): string {
    const currentUrl = this.router.url;
    const parts = currentUrl.split('/');
    const idProductor = parts[parts.length - 1];

    return idProductor;
  }

  getProductosDelProductor(idProductor: string) {
    this.productosService.getProductos().subscribe(productos => {
      this.productosDelProductor = productos.filter(producto => producto.idProductor === idProductor);
    });
  }


  getResenasDelProductor(idProductor: string) {
    this.productosService.getResenas().subscribe(resenas => {
      this.resenasDelProductor = resenas.filter(resena => resena.idProductor === idProductor);
    });
  }

  submitResena() {

    if (this.currentUser?.id) {
      const resenaData = this.resenaForm.value;
      const resena: Resena = {
      contenido: resenaData.contenido || "Se han perdido los datos de la reseña",
      usuarioCliente: this.currentUser?.usuario ||"Usuario desconocido",
      idProductor: this.getIdProductorFromUrl()
      };

      this.addResena(resena).subscribe(producto => {
        this.getResenasDelProductor(resena.idProductor)
      // Mostrar snackbar y navegar a otra ventana
      this.showSnackBar(`Reseña añadida!`);
      });
    }else{
      alert("Inica sesión para añadir una reseña")
    }





  }

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'Cerrar', {duration: 3000})
  }

  addResena(resena: Resena):Observable<Resena>{
    return this.httpClient.post<Resena>(`${this.baseUrl}/resenas`, resena);
  }
}
