import { Component, Injectable, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Mensaje } from '../../components/chat/interfaces/mensaje.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../environments/environmnets';
import { Usuario } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'chat-list-page',
  templateUrl: './list-chat-page.component.html',
  styles: ``
})

@Injectable()
export class ChatListPageComponent implements OnInit{
  public mensajes: Mensaje[] = [];
  public emisoresUnicos: string[] = [];
  public currentUser?: Usuario;
  public thisProductor?: Usuario;

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient, private productosService: ProductoService, private router: Router, private authService : AuthService){}

  async ngOnInit(): Promise<void> {
    try {
      this.currentUser = this.authService.currentUser;
      if (!this.currentUser) {
        this.currentUser = { usuario: "Inicia sesión", contrasena:"",cuentaBanco:"",direccion:"",email:"",id:"",esAgricultor:false, telefono: 0};
      }

      this.getMensajesDelProductor().subscribe(mensajes => {
        this.mensajes = mensajes;
        this.emisoresUnicos = this.obtenerEmisoresUnicos(); // Llamada al método para obtener emisores únicos
        console.log(this.mensajes);
      }, error => {
        console.error('Error al obtener los mensajes del productor:', error);
      });
    } catch (error) {
      console.error('Error al obtener los mensajes del productor:', error);
    }
  }

  verMisProductos(){
    this.router.navigate([`./productos/productor/${this.authService.currentUser?.id}`])
  }

  getMensajesDelProductor():Observable<Mensaje[]>{
    console.log(this.authService.currentUser?.id)
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/mensajes/?idProductor=${this.authService.currentUser?.id}`);
  }

  obtenerEmisoresUnicos(): string[] {
    const emisores: string[] = [];
    this.mensajes.forEach(mensaje => {
      if (!emisores.includes(mensaje.emisor)) {
        emisores.push(mensaje.emisor);
      }
    });
    return emisores;
  }
}
