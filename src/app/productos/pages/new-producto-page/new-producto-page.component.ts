import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { EsFRoHO, Producto} from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { ListPageComponent } from '../list-page/list-page.component';

@Component({
  selector: 'app-new-producto-page',
  templateUrl: './new-producto-page.component.html',
  styles: ``
})
export class NewProductoPageComponent implements OnInit{
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];


  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  //NO EDITABLE
  public productoForm = new FormGroup({
    nombre:              new FormControl('', {nonNullable:true}),
    id:                   new FormControl(''),
    idProductor:          new FormControl(''),
    precio:               new FormControl(0, {nonNullable:true}),
    origen:               new FormControl('', {nonNullable:true}),
    pesoAproximadoUnidad: new FormControl(0, {nonNullable:true}),
    esFRoHO:              new FormControl<EsFRoHO>(EsFRoHO.FR, {nonNullable: true}),
    alt_img: new FormControl('', {nonNullable:true}),



  });



  constructor(private uploadService: FileUploadService, private productosService: ProductoService) {}

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  get currentProducto():Producto{
    const producto = this.productoForm.value as unknown as Producto;
    return producto;
  }
  onSubmit(){
    if (this.productoForm.invalid) {
      return
    }

    this.productosService.addProducto(this.currentProducto).subscribe(producto =>{
      //todo mostrar snackbar y navegar a otra ventana
    })


  }
  //HAY QUE IMPLEMENTAR EL METODO QUE OBTIENE TODOS LOS ID Y LOS DIFERENCIA ENTRE FR Y HO
  // generateProductoId() {
  //   const productos = this.listaProductos.productos;
  //   const todoIdFr: string[] = [];
  //   const todoIdHo: string[] = [];

  //   productos.forEach(producto => {
  //     if (producto.id.startsWith("FR") && producto.id.length === 5) {
  //       todoIdFr.push(producto.id);
  //     }

  //     if (producto.id.startsWith("HO") && producto.id.length === 5) {
  //       todoIdHo.push(producto.id);
  //     }
  //   });

  //   console.log("IDs que empiezan por FR y tienen 5 caracteres:", todoIdFr);
  //   console.log("IDs que empiezan por HO y tienen 5 caracteres:", todoIdHo);
  // }


  selectFiles(event: any): void {
    this.message = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const firstFile = this.selectedFiles[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };
      reader.readAsDataURL(firstFile);

      this.selectedFileNames.push(firstFile.name);
    }

    console.log(this.previews);
  }


  upload(file: File): void {

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {

          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {

        this.upload(this.selectedFiles[0]);

    }
  }
}
