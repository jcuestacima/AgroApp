// chat.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../auth/interfaces/user.interface';
import { ProductorPageComponent } from '../../../pages/productor-page/productor.page';
import {  ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../../../environments/environmnets';
import { Mensaje } from '../interfaces/mensaje.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



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
  messages: Mensaje[] = [];
  private baseUrl: string = environments.baseUrl;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private authService: AuthService, private productorPage: ProductorPageComponent){}

  ngOnInit(){
    this.currentUser = this.authService.currentUser;
    if (!this.currentUser) {
      this.currentUser = { usuario: "Inicia sesión", contrasena:"",cuentaBanco:"",direccion:"",email:"",id:"",esAgricultor:false, telefono: 0};
    }

    this.agricultor = this.productorPage.thisProductor;

    // Llama a getMensajesIdComunicacion con la identificación de la comunicación adecuada
    const idComunicacion = this.productorPage.getIdProductorFromUrl().concat(this.currentUser?.id!);
    this.getMensajesIdComunicacion(idComunicacion);
  }

  public chatForm = new FormGroup({
    contenido:            new FormControl('', {nonNullable:true}),
    idCliente:            new FormControl(this.currentUser?.id),
    idProductor:          new FormControl(this.productorPage.getIdProductorFromUrl()),
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

      mensajeData.emisor = this.currentUser.id;
      mensajeData.idCliente = this.currentUser.id;
      mensajeData.idComunicacion = this.productorPage.getIdProductorFromUrl().concat(this.currentUser?.id!)

      this.addMensaje(mensajeData)
        .pipe(
          tap(() => {
            this.showSnackBar(`Mensaje enviado.`);
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

  getMensajes():Observable<Mensaje[]>{
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/mansajes`);
  }

  getMensajesIdComunicacion(idComunicacion: string) {
    this.getMensajes().subscribe(mensajes => {
      // Filtramos los mensajes por la ID de la comunicación
      this.messages = mensajes.filter(mensaje => mensaje.idComunicacion === idComunicacion);
    });
  }

}
