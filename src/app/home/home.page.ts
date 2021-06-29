import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router,
    public menu: MenuController
    ) { this.menu.enable(false, 'custom');}

  onLogin(){
    this.router.navigateByUrl('/login');
  }

  onSignup(){
    this.router.navigateByUrl('/signup');
  }
}
