import { MaterialModule } from './../../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat.component';
@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, FormsModule, MaterialModule,],
  exports: [ChatComponent]
})
export class ChatModule { }
