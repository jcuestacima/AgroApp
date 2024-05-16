import { Component, Input, OnInit } from '@angular/core';
import { ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../interfaces/mensaje.interface';
import { Observable, catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../../../auth/interfaces/user.interface';
import { environments } from '../../../../../../environments/environments';
import { AuthService } from '../../../../../auth/services/auth.service';
import { ChatListPageComponent } from '../../list-chat-page.component';

@Component({
  selector: 'app-chatProveedor',
  templateUrl: './chatProveedor.component.html',
  styleUrls: ['./chatProveedor.component.css']
})
export class ChatProveedorComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  @Input() currentUser?: Usuario;
  @Input() agricultor!: Usuario;
  messageText: string = '';
  messages: Mensaje[] = [];
  private baseUrl: string = environments.baseUrl;
  private idComunicacion?: string;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private authService: AuthService, private chatList: ChatListPageComponent) {}

  ngOnInit() {
    this.idComunicacion = this.currentUser?.id ? this.agricultor?.id.concat(this.currentUser.id) : '';

    if (this.currentUser?.id) {
      this.getMensajes(this.idComunicacion!).subscribe(mensajes => {
        this.messages = mensajes;
      });
    }
  }

  public chatForm = new FormGroup({
    contenido: new FormControl('', { nonNullable: true }),
    idCliente: new FormControl(this.currentUser?.id),
    idProductor: new FormControl(this.agricultor?.id),
    emisor: new FormControl(this.currentUser),
    idComunicacion: new FormControl(this.currentUser?.id ? this.agricultor?.id.concat(this.currentUser.id) : ''),
  });

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    if (this.chatForm.value.contenido) {
      if (this.currentUser?.id) {
        const mensajeData = this.chatForm.value as unknown as Mensaje;

        mensajeData.emisor = this.agricultor?.usuario!;
        mensajeData.idCliente = this.currentUser.id;
        mensajeData.idProductor = this.agricultor.id
        mensajeData.idComunicacion = this.agricultor.id.concat(this.currentUser.id);

        this.addMensaje(mensajeData)
          .pipe(
            tap(() => {
              this.showSnackBar(`Mensaje enviado.`);

              this.getMensajes(mensajeData.idComunicacion).subscribe(mensajes => {
                this.messages = mensajes;
              });
            }),
            catchError((error) => {
              console.error('Error al enviar el mensaje:', error);
              this.showSnackBar('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
              throw error;
            })
          )
          .subscribe();
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
