import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/interfaces/user-options';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: UserOptions = { name:'', email:'', password:''};
  submitted = false;
  isTextFieldType: boolean;

  constructor(
    public authService: AuthService,
    public router: Router,
    private location: Location,
    public menu: MenuController
    ) {
      this.menu.enable(false, 'custom');
    }

  ngOnInit() {
  }

  async onLogin(form: NgForm){
    this.submitted = true;
    if(form.valid){
      const error = await this.authService.emailPasswordLogin(this.login.email, this.login.password);
      if(error === undefined ){
        this.router.navigateByUrl('/app/tabs/landing');
      }else{
        alert(JSON.stringify(error));
      }
    }
  }

  togglePassword(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  goBack(){
    this.location.back();
  }
}
