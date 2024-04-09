import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  selectedRole: number;
  showBankAccountInput: boolean = false;
  usuariosInfo: Usuario[]=[];

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.selectedRole = 0;

  }

  public registerForm = new FormGroup({
    usuario:              new FormControl('', {nonNullable:true}),
    contrasena:           new FormControl('', {nonNullable: true}),
    id:new FormControl(''),
    email: new FormControl('', {nonNullable: true}),
    direccion:new FormControl('', {nonNullable: true}),
    esAgricultor:new FormControl('', {nonNullable: true}),
    cuentaBanco:new FormControl('', {nonNullable: false}),
  });



  roleSelected(role: number) {
    this.selectedRole = role;

    if (role === 1) {
      this.showBankAccountInput = true;
    } else {
      this.showBankAccountInput = false;
    }
  }
  get currentUsuario():Usuario{
    const usuario = this.registerForm.value as unknown as Usuario;
    return usuario;
  }
//   onSubmit(){
//     if (this.registerForm.invalid) {
//       return
//     }
//     this.registerForm.value.id = this.generateUsuarioId();
//     this.authService.addUsuario(this.currentUsuario).subscribe(usuario =>{
//       //todo mostrar snackbar y navegar a otra ventana
//       this.showSnackBar(`${this.registerForm.value.usuario} se creó!`);

//     })
//   }
//   showSnackBar(message: string): void{
//     this.snackBar.open(message, 'Cerrar', {duration: 3000})
//   }

//   generateUsuarioId(): string {
//     const userIds: string[] = [];
//     let idFinal: string;

//     // Filtrar los IDs que comienzan con 'P' y tienen 4 caracteres en total
//     this.usuariosInfo.forEach(usuario => {
//         if (usuario.id.startsWith("P") && usuario.id.length === 4) {
//             userIds.push(usuario.id);
//         }
//     });

//     console.log("IDs que empiezan por P y tienen 4 caracteres:", userIds);

//     // Determinar el siguiente número para el nuevo ID
//     let numeroSiguiente: number;
//     if (userIds.length > 0) {
//         const ultimoId = userIds[userIds.length - 1];
//         const ultimoNumero = parseInt(ultimoId.substring(1), 10);
//         numeroSiguiente = ultimoNumero + 1;
//     } else {
//         numeroSiguiente = 1;
//     }

//     // Formatear el número siguiente y concatenarlo con 'P' para obtener el nuevo ID
//     idFinal = "P" + numeroSiguiente.toString().padStart(3, '0');

//     return idFinal;
// }

}
