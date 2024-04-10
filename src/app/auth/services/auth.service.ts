import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environmnets';
import { Usuario } from '../interfaces/user.interface';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService{

  private baseUrl = environments.baseUrl;
  private usuario?: Usuario;
  private usuariosInfo: Usuario[]=[];
  constructor(private httpClient: HttpClient, private router: Router,) { }

  get currentUser():Usuario| undefined{
    if (!this.usuario) {
      return undefined;
    }
    return structuredClone( this.usuario);
  }


  logout(){
    this.usuario = undefined;
    localStorage.clear;
  }

  login(usuario: string, contrasena: string){
    this.getUsuarios().subscribe({
        next: (usuarios: Usuario[]) => {
            try {
                const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
                if (usuarioEncontrado) {
                    // Usuario y contraseña válidos, redirige al usuario a la página principal
                    this.usuario = usuarioEncontrado;
                    this.router.navigate(['/']);
                } else {
                    // Usuario o contraseña incorrectos, muestra un mensaje de error
                    alert('Usuario o contraseña incorrectos');
                }
            } catch (error) {
                console.error('Error al buscar usuario:', error);
            }
        },
        error: (error: any) => {
            console.error('Error al obtener usuarios:', error);
        }
    });
}




  getUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  addUsuario(usuario: Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }
}
