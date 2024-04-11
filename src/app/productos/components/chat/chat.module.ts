import { MaterialModule } from './../../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat.component';
@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [ChatComponent]
})
export class ChatModule { }
