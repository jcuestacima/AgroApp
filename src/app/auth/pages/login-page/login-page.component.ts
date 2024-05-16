import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent{
  usuariosInfo: Usuario[]=[];
  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ){}

  public loginForm = new FormGroup({
    usuario:              new FormControl('', {nonNullable:true}),
    contrasena:                   new FormControl('', {nonNullable: true}),
  });


  onLogin(){
    const usuario = this.loginForm.get('usuario')?.value;
    const contrasena = this.loginForm.get('contrasena')?.value;
    this.authService.login(usuario!, contrasena!);
  }


}
