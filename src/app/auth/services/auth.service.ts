import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environmnets';
import { Usuario } from '../interfaces/user.interface';
import { Observable, catchError, filter, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private usuario?: Usuario;
  constructor(private httpClient: HttpClient) { }

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

  getUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  addUsuario(usuario: Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }
}
