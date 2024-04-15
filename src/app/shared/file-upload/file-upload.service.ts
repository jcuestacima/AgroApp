import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  saveImageInternally(imageData: string, imageName: string): void {
    // Convertir la imagen base64 a Blob
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crear un elemento 'a' para descargar la imagen
    const a = document.createElement('a');
    a.href = url;
    a.download = imageName;

    // Simular el clic en el enlace para descargar la imagen
    // document.body.appendChild(a);
    // a.click();

    // Guardar la imagen en la ruta local del proyecto
    const path = `assets/assetsFrutasYHortalizas/${imageName}`;
    this.saveBlobToFile(blob, path);

    // Liberar la URL del objeto Blob creado
    URL.revokeObjectURL(url);

    // Eliminar el elemento 'a' creado
    // document.body.removeChild(a);
  }

  private saveBlobToFile(blob: Blob, filePath: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      const array = Array.from(uint8Array);
      const blobToFile = new Blob([new Uint8Array(array)], { type: blob.type });

      const url = URL.createObjectURL(blobToFile);

      // Crear un elemento 'a' para descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'file';

      // Simular el clic en el enlace para descargar el archivo
      document.body.appendChild(a);
      a.click();

      // Eliminar el elemento 'a' creado
      document.body.removeChild(a);

      // Liberar la URL del objeto Blob creado
      URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(blob);
  }
}
