import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MotosService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  async uploadPhoto(id: string, file: any): Promise<any>{
    if(file && file.length){
      try{
        const task = await this.storage.ref('motos').child(id).put(file[0]);
        return this.storage.ref(`motos/${id}`).getDownloadURL().toPromise();
      }catch(err){
        console.error('Error uploading file: ', err.message);
      }
    }
  }
}
