import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  saveImageInternally(imageData: string, imageName: string): void {
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append('file', blob, imageName);

    // Envía la imagen al servidor
    this.http.post<any>('url_del_servidor/donde_guardar_la_imagen', formData).subscribe(
      response => {
        console.log('Imagen guardada en el servidor:', response);
      },
      error => {
        console.error('Error al guardar la imagen en el servidor:', error);
      }
    );
  }
}
