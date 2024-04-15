
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatProveedorComponent } from './components/chatProveedor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../../material/material.module';
@NgModule({
  declarations: [ChatProveedorComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
  exports: [ChatProveedorComponent]
})
export class ChatProveedorModule { }
