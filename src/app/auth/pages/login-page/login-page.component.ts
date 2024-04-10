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

  get currentDatosLogin():Usuario{
    const datosLogin = this.loginForm.value as unknown as Usuario;

    console.log(datosLogin)
    return datosLogin;
  }

  // async onLogin() {
  //   const usuario = this.loginForm.get('usuario')?.value;
  //   const contrasena = this.loginForm.get('contrasena')?.value;

  //   try {
  //     const usuarioEncontrado = this.usuariosInfo.find(u => u.usuario === usuario && u.contrasena === contrasena);
  //     if (usuarioEncontrado) {
  //       // Usuario y contraseña válidos, redirige al usuario a la página principal
  //       this.router.navigate(['/']);
  //     } else {
  //       // Usuario o contraseña incorrectos, muestra un mensaje de error
  //       alert('Usuario o contraseña incorrectos');
  //     }
  //   } catch (error) {
  //     console.error('Error al buscar usuario:', error);
  //   }



  // }

  onLogin(){
    const usuario = this.loginForm.get('usuario')?.value;
    const contrasena = this.loginForm.get('contrasena')?.value;
    this.authService.login(usuario!, contrasena!);
  }

  // ngOnInit(){
  //   this.authService.getUsuarios().subscribe({
  //     next: (usuarios: Usuario[]) => {
  //       this.usuariosInfo = usuarios;
  //       // Puedes realizar cualquier acción adicional aquí, si es necesario
  //     },
  //     error: (error: any) => {
  //       console.error('Error al obtener usuarios:', error);
  //     }
  //   });
  // }


}
