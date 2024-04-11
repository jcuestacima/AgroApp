// chat.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../auth/interfaces/user.interface';
import { ProductorPageComponent } from '../../../pages/productor-page/productor.page';
import {  ElementRef, ViewChild, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @Input() currentUser?: Usuario;
  @Input() agricultor?: Usuario;
  messageText: string = '';
  messages: { sender: string, text: string }[] = [];

  constructor(private authService: AuthService, private productorPage: ProductorPageComponent){}

  ngOnInit(){
    this.currentUser = this.authService.currentUser;
  if (!this.currentUser) {
    this.currentUser = { usuario: "Inicia sesión", contrasena:"",cuentaBanco:"",direccion:"",email:"",id:"",esAgricultor:false, telefono: 0};
  }

    this.agricultor = this.productorPage.thisProductor;

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(text: string) {
    if (text.trim() !== '') {
      if (this.currentUser && this.agricultor) {
        const sender = this.currentUser.usuario;
        this.messages.push({ sender, text });
      }
    }
  }
}
