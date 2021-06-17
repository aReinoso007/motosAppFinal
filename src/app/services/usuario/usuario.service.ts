import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Moto } from 'src/app/model/moto.model';
import { UserInfo } from 'src/app/model/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private afs: AngularFirestore) { }

  insertUserData(userInfo: UserInfo, uid: string){
    const refUserInfo = this.afs.collection('users');
    const param = JSON.parse(JSON.stringify(userInfo));
    refUserInfo.doc(uid).collection<any>('informacion').doc(userInfo.uid).set(param, {merge: true});
  }

  addMotorcyle(moto: Moto){
    const refMotoInfo = this.afs.collection('users');
  }

}
