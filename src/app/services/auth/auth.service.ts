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

}
