/* eslint-disable no-throw-literal */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  public user: Observable<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user=>{
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          console.log('informacion de usuario: ', localStorage.getItem('user'));
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        }else {
          return of(null);
        }
      })
    );
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    try{
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = await this.afAuth.currentUser;
      return await user.updateProfile({
        displayName: name,
        photoURL: 'https://image.flaticon.com/icons/png/512/1341/1341527.png'
      });
    }catch(err){
      console.error('Error signinup user: ', JSON.stringify(err));
      return err;
    }
  }

  userExists(email: string){
    return this.afs
          .collection('users', ref=> ref.where('email', '==', email))
          .valueChanges().pipe(first()).toPromise();
  }

  async emailPasswordLogin(email: string, password: string){
    try{
      const credentials = firebase.default.auth.EmailAuthProvider.credential(email, password);
      const firebaseUser = await firebase.default.auth().signInWithCredential(credentials);
      return await this.updateUserData(firebaseUser.user, 'email');
    }catch(err){
      return err;
    }
  }

  async updateUserData(userTemp: any, provider: any){
    const doc: any = await this.userExists(userTemp.email);
    let data: any;
    const user: any = JSON.parse(JSON.stringify(userTemp));

    if(doc == null || doc ===""){
      //creamos la cuenta del usuario
      data ={
        uid: user.uid,
        rol: 'user',
        email: user.email || null,
        displayName: user.displayName || '',
        photoURL: user.photoURL,
        provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
        createdAt: new Date(Number(user.createdAt)) || new Date()
      };
    }else if( doc.active === false ){
     throw { error_code: 999, error_message: 'Acceso denegado' };
    }else{
      //se actualiza la cuenta
      data ={
        uid: user.uid,
        email: user.email || null,
        provider,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
      };
    }
    console.log("data: ", JSON.stringify(data));
    const userRef = this.afs.collection<any>('users');
    return userRef.doc(`${user.uid}`).set(data, {merge: true});
  }

  get isLoggedIn(){
    const user = JSON.parse(localStorage.getItem('user'));
    /* esta funcion verifica si hay un usuario, retorna true si lo hay y false sino */
    return (user !==null) ? true : false;
  }

}
