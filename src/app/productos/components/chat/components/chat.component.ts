
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../auth/interfaces/user.interface';
import { ProductorPageComponent } from '../../../pages/productor-page/productor.page';
import {  ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../../environments/environments';
import { Mensaje } from '../interfaces/mensaje.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @Input() currentUser?: Usuario;
  @Input() agricultor?: Usuario;
  messageText: string = '';
  messages: Mensaje[] = [];
  private baseUrl: string = environments.baseUrl;
  private idComunicacion: string='';

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private authService: AuthService, private productorPage: ProductorPageComponent) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    if (!this.currentUser) {
      this.currentUser = { usuario: "Inicia sesión", contrasena:"",cuentaBanco:"",direccion:"",email:"",id:"",esAgricultor:false, telefono: 0};
    }

    this.agricultor = this.productorPage.thisProductor;

    this.idComunicacion = this.productorPage.getIdProductorFromUrl().concat(this.currentUser?.id!);

    if (this.currentUser.id) {
      this.getMensajes(this.idComunicacion).subscribe(mensajes => {
        this.messages = mensajes;
      });
    }
  }

  public chatForm = new FormGroup({
    contenido: new FormControl('', { nonNullable: true }),
    idCliente: new FormControl(this.currentUser?.id),
    idProductor: new FormControl(this.productorPage.getIdProductorFromUrl()),
    emisor: new FormControl(this.currentUser),
    idComunicacion: new FormControl(this.productorPage.getIdProductorFromUrl().concat(this.currentUser?.id!)),
  });

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (this.chatForm.value.contenido) {
      if (this.currentUser?.id) {
        const mensajeData = this.chatForm.value as unknown as Mensaje;

        mensajeData.emisor = this.currentUser.usuario;
        mensajeData.idCliente = this.currentUser.id;
        mensajeData.idComunicacion = this.productorPage.getIdProductorFromUrl().concat(this.currentUser?.id!)

        this.addMensaje(mensajeData)
          .pipe(
            tap(() => {
              this.showSnackBar(`Mensaje enviado.`);
              // Después de enviar el mensaje, obtener los mensajes actualizados
              this.getMensajes(this.idComunicacion).subscribe(mensajes => {
                this.messages = mensajes;
              });
            }),
            catchError((error) => {
              console.error('Error al enviar el mensaje:', error);
              this.showSnackBar('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
              throw error; // Re-emitir el error para que el controlador de errores superior pueda manejarlo
            })
          )
          .subscribe(); // Suscripción necesaria para activar la cadena de operadores
      } else {
        alert("Inicia sesión para enviar mensajes");
      }
    }
  }

  addMensaje(mensaje: Mensaje): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/mensajes`, mensaje);
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  getMensajes(idComunicacion: string): Observable<Mensaje[]> {
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/mensajes/?q=${idComunicacion}`);
  }
}
