import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  constructor(private router: Router, private authService: AuthService){
  }



  public carroCompra = [
    {url:'./listaProductos'}
  ]

  get usuario():Usuario |undefined{
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

  verMisProductos(){
    this.router.navigate([`./productos/productor/${this.usuario?.id}`])
  }


}
