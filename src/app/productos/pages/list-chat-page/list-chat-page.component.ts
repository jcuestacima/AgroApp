import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Mensaje } from '../../components/chat/interfaces/mensaje.interface';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../environments/environments';
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
  public currentUser: Usuario;
  public clientes: Usuario[]=[];
  public emisores: string[] = [];
  public actualCliente?: Usuario;

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient, private router: Router, private authService : AuthService){this.currentUser = this.authService.currentUser!;}


  async ngOnInit(): Promise<void> {
    try {

      if (!this.currentUser) {
        this.currentUser = { usuario: "Inicia sesión", contrasena:"",cuentaBanco:"",direccion:"",email:"",id:"",esAgricultor:false, telefono: 0};
      }

      this.getMensajesDelProductor().subscribe(async mensajes => {
        this.mensajes = mensajes;
        this.emisoresUnicos = this.obtenerEmisoresUnicos();


        forkJoin(this.emisoresUnicos.map(emisor => this.getUsuarioPorUsuario(emisor)))
          .subscribe(clientes => {

            this.clientes = clientes.filter(cliente => cliente !== null) as Usuario[];
          });
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
    return  this.httpClient.get<Mensaje[]>(`${this.baseUrl}/mensajes/?idProductor=${this.authService.currentUser?.id}`);

  }

  obtenerEmisoresUnicos(): string[] {
    this.mensajes.forEach(mensaje => {
      if (mensaje.emisor === this.currentUser.usuario) {

      } else {
        if (!this.emisores.includes(mensaje.emisor)) {
          this.emisores.push(mensaje.emisor);
        }
      }

    });
    return this.emisores;
  }

  getUsuariosPorId(nombresUsuarios: string[]): Observable<Usuario[]> {
    return forkJoin(nombresUsuarios.map(nombreUsuario => this.getUsuarioPorUsuario(nombreUsuario)))
      .pipe(
        switchMap(clientes => {

          const usuarios: Usuario[] = clientes.filter(cliente => cliente !== null) as Usuario[];
          return of(usuarios);
        })
      );
  }

  getUsuarioPorUsuario(nombreUsuario: string): Observable<Usuario | null> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios/?usuario=${nombreUsuario}`)
      .pipe(
        map(usuarios => usuarios.length > 0 ? usuarios[0] : null)
      );
  }

}
