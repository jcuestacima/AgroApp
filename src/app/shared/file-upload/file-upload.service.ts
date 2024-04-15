import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = '../../../assets';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<boolean> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'text' // Cambiamos el tipo de respuesta a 'text' ya que no esperamos un JSON
    });

    return this.http.request(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          console.log('File uploaded successfully:', file.name);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error uploading file:', error);
        return of(false);
      })
    );
  }


  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
