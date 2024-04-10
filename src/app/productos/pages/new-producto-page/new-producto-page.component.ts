import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { EsFRoHO, Producto } from '../../interfaces/productos.interface';
import { ProductoService } from '../../services/productos.service';
import { ListPageComponent } from '../list-page/list-page.component';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../../../shared/file-upload/file-upload.service';

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

  productosInfo: Producto[]=[];
  currentProducto?: Producto = this.productosService.currentProducto;

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



  constructor(private uploadService: FileUploadService,
    private productosService: ProductoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
    this.productosService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productosInfo = productos;
        // Puedes realizar cualquier acción adicional aquí, si es necesario
      },
      error: (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    });

  }

  get currentFormProducto():Producto{
    const producto = this.productoForm.value as unknown as Producto;
    return producto;
  }
  onSubmit(){
    if (this.productoForm.invalid) {
      return
    }

    //TODO: primera condición del if inútil hay que arreglarlo
    if (this.currentProducto) {
      this.productosService.updateProducto(this.currentFormProducto).subscribe(producto =>{
        this.showSnackBar(`${this.productoForm.value.nombre} se editó!`);
        })
    }else{
      this.productoForm.value.id = this.generateProductoId();
      this.productosService.addProducto(this.currentFormProducto).subscribe(producto =>{
      //todo mostrar snackbar y navegar a otra ventana
      this.showSnackBar(`${this.productoForm.value.nombre} se añadió!`);

    })
    }






  }

  showSnackBar(message: string): void{
    this.snackBar.open(message, 'Cerrar', {duration: 3000})
  }

  generateProductoId(): string {
    const todoIdFr: string[] = [];
    const todoIdHo: string[] = [];
    var principioDelId: string;
    var numeroDeId: string="";
    var idFinal: string;

    this.productosInfo.forEach(producto => {
      if (producto.id.startsWith("FR") && producto.id.length === 5) {
        todoIdFr.push(producto.id);
      }

      if (producto.id.startsWith("HO") && producto.id.length === 5) {
        todoIdHo.push(producto.id);
      }
    });

      console.log("IDs que empiezan por FR y tienen 5 caracteres:", todoIdFr);
      console.log("IDs que empiezan por HO y tienen 5 caracteres:", todoIdHo);

      if (this.productoForm.get('esFRoHO') && this.productoForm.get('esFRoHO')!.value === "FR") {
        // Verificamos si todoIdFr no está vacío antes de acceder al último elemento
        if (todoIdFr.length > 0) {
          // Obtenemos el último elemento de todoIdFr
          const ultimoElemento = todoIdFr[todoIdFr.length - 1];
          // Extraemos los últimos 3 caracteres
          const ultimosTresCaracteres = ultimoElemento.substring(ultimoElemento.length - 3);
          // Convertimos los últimos 3 caracteres a números y sumamos 1
          const ultimoNumero = parseInt(ultimosTresCaracteres, 10) + 1;
          // Concatenamos "FR" con el último número obtenido
          numeroDeId = ultimoNumero.toString().padStart(3, '0');
        } else {
          // Si todoIdFr está vacío, establecemos numeroDeId como "001"
          numeroDeId = "001";
        }
        principioDelId = "FR";

        idFinal = principioDelId.concat(numeroDeId);
        return idFinal;
      }
      if (this.productoForm.get('esFRoHO') && this.productoForm.get('esFRoHO')!.value === "HO") {

        console.log("Entra")
        // Verificamos si todoIdHo no está vacío antes de acceder al último elemento
        if (todoIdHo.length > 0) {
          // Obtenemos el último elemento de todoIdHo
          const ultimoElemento = todoIdHo[todoIdHo.length - 1];
          // Extraemos los últimos 3 caracteres
          const ultimosTresCaracteres = ultimoElemento.substring(ultimoElemento.length - 3);
          // Convertimos los últimos 3 caracteres a números y sumamos 1
          const ultimoNumero = parseInt(ultimosTresCaracteres, 10) + 1;
          // Concatenamos "HO" con el último número obtenido
          numeroDeId = ultimoNumero.toString().padStart(3, '0');
        } else {
          // Si todoIdFr está vacío, establecemos numeroDeId como "001"
          numeroDeId = "001";
        }
        principioDelId = "HO";

        idFinal = principioDelId.concat(numeroDeId);
        return idFinal;
      }




    return "Error";
  }


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
