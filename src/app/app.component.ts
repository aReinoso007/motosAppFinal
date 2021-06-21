import { OnInit } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';

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
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  constructor(
    private menu: MenuController,
    private platform: Platform,
    public authService: AuthService
  ) {}

  async ngOnInit(){
    this.updateLoginStatus(this.loggedIn);
  }

  logout(){
    this.authService.logOut();
    this.updateLoginStatus(this.loggedIn);
    console.log('usuario: ', localStorage.getItem('user'));
  }

  checkLoginStatus(){
    return this.authService.isLoggedIn;
  }

  updateLoginStatus(loggedIn: boolean){
    setTimeout(()=>{
      loggedIn = this.checkLoginStatus();
    }, 100);
  }

  useLanguge(){
    /*Cuando es true -> espanol, false -> ingles */
    this.isSpanish = !this.isSpanish;
    //this.isSpanish ? 
  }

}
