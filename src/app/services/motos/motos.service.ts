import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Moto } from 'src/app/model/moto.model';

@Injectable({
  providedIn: 'root'
})
export class MotosService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  async uploadPhoto(id, file: any): Promise<any>{
    if(file && file.length){
      try{
        const task = await this.storage.ref('motos').child(id).put(file[0]);
        return this.storage.ref(`motos/${id}`).getDownloadURL().toPromise();
      }catch(err){
        console.error('Error uploading file: ', err.message);
      }
    }
  }
  /*Refactor to get user uid from moto
  el uid de usuario no puede ser el nombre de las motos, eso toca mejorar*/
  addUserMoto(moto: Moto, uidUser: string){
    try{
      const refUser = this.afs.collection('users');
      const param = JSON.parse(JSON.stringify(moto));
      refUser.doc(uidUser).collection<any>('motos').doc(moto.uid).set(param, {merge: true});
    }catch(err){
      throw console.error('Error insertando moto de usuario: ', err.message);
    }
  }

  getUserMotos(uid: string): Observable<any[]>{
    return this.afs.collection('users').doc(uid).collection('motos').valueChanges();
  }
}
