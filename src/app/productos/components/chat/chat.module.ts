import { MaterialModule } from './../../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
  exports: [ChatComponent]
})
export class ChatModule { }
