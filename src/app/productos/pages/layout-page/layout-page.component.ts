import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/user.interface';
import { MongoClient, ServerApiVersion } from 'mongodb';
// import { environments } from '../../../../environments/environments';
// import { MongoService } from '../../services/mongo.service';

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

  verMisChats(){
    this.router.navigate([`./productos/misChats`])
  }




//   // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//  client = new MongoClient(environments.uriMongo, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
//   mongoRun=async()=> {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await this.client.connect();
//     // Send a ping to confirm a successful connection
//     await this.client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await this.client.close();
//   }
// }
}
