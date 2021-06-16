/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user=>{
        if(user){
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

}
