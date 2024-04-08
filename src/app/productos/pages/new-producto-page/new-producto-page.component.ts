import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

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
    alt_img: new FormControl('', {nonNullable:true}),



  });



  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  onSubmit(){
    console.log({formIsValid: this.productoForm.valid, value : this.productoForm.value});
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
