import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Producto } from '../interfaces/productos.interface';
import { environments } from '../../../environments/environmnets';

@Injectable({providedIn: 'root'})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = environments.baseUrl;

  getProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/productos`);
  }

  getSuggestions(query: string):Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/productos?q=${query}`)
  }

  getFrutas():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/productos?q=FR`)
  }
  getHortalizas():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/productos?q=HO`)
  }

  addProducto(producto: Producto):Observable<Producto>{
    return this.httpClient.post<Producto>(`${this.baseUrl}/productos`, producto);
  }

  updateProducto(producto: Producto):Observable<Producto>{
    if (!producto.id) {
      throw new Error("El campo ID es necesario");

    }

    return this.httpClient.patch<Producto>(`${this.baseUrl}/productos/${producto.id}`, producto);
  }

  delteByIdProducto(producto: Producto):Observable<boolean>{
    debugger
    return this.httpClient.delete(`${this.baseUrl}/productos/${producto.id}`)
    .pipe(
      catchError(error => of(false)),
      map(resp =>true)
    );
  }
}
