import { Injectable } from '@angular/core';
import { MongoClient } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  private readonly uri: string = 'mongodb+srv://jcuestarui1:LaQr0Eu1CLK7Eyfr@cluster0.v2etl1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  constructor() { }

  async connect() {
    try {
      const client = new MongoClient(this.uri);
      await client.connect();
      console.log('Conexión a MongoDB Atlas establecida');
      return client.db();
    } catch (error) {
      console.error('Error al conectar a MongoDB Atlas:', error);
      return null;
    }
  }
}
