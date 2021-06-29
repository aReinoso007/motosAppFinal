import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { UsuarioService } from './services/usuario/usuario.service';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  dark = true;
  loggedIn = false;
  isSpanish = true;

  appPages = [
    {
      title: 'Inicio',
      url: '/app/tabs/landing',
      icon: 'home'
    },
    {
      title: 'Grupos',
      url: '/app/tabs/grupos',
      icon: 'people'
    },
    {
      title: 'Rutas',
      url: '/app/tabs/rutas',
      icon: 'map'
    },
    {
      title: 'Motos',
      url: '/app/tabs/motos',
      icon: 'bicycle'
    }
  ];
  constructor(
    private menu: MenuController,
    private router: Router,
    //private platform: Platform,
    public authService: AuthService,
    private userService: UsuarioService,
    //private statusBar: StatusBar
  ) { //this.initializeApp();
  }

  ngOnInit(){
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  logout(){
    this.authService.logOut();
    this.updateLoginStatus(this.loggedIn);
    console.log('updated loggedin status: ', this.loggedIn);
    this.router.navigateByUrl('/home');
    
  }

  checkLoginStatus(){
    console.log('get isLogged in function: ', this.userService.isUserLoggedIn);
    return this.updateLoginStatus(this.userService.isUserLoggedIn);
  }

  updateLoginStatus(loggedIn: boolean){
    this.loggedIn = loggedIn;
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', ()=>{
      this.updateLoginStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoginStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoginStatus(false);
    });
  }

}
