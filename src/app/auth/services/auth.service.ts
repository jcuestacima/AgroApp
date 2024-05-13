import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Usuario } from '../interfaces/user.interface';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService{

  private baseUrl = environments.baseUrl;
  private usuario?: Usuario;
  private usuariosInfo: Usuario[]=[];
  private productor?: Usuario;
  constructor(private httpClient: HttpClient, private router: Router,) {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      this.usuario = JSON.parse(storedUsuario);
    }
  }

  get currentUser():Usuario| undefined{
    if (!this.usuario) {
      return undefined;
    }
    return structuredClone( this.usuario);
  }


  logout(){
    this.usuario = undefined;
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: string, contrasena: string){
    this.getUsuarios().subscribe({
        next: (usuarios: Usuario[]) => {
            try {
                const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
                if (usuarioEncontrado) {
                    // Usuario y contraseña válidos, redirige al usuario a la página principal
                    this.usuario = usuarioEncontrado;
                    localStorage.setItem('usuario', JSON.stringify(this.usuario));
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

searchProductorById(id: string): Observable<Usuario | undefined> {
  return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios/`).pipe(
    map(usuarios => usuarios.find(usuario => usuario.id === id)),
    catchError(error => {
      console.error('Error al buscar productor:', error);
      return of(undefined); // Devuelve un observable de tipo Usuario | undefined en caso de error
    })
  );
}




  getUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  addUsuario(usuario: Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }
}
