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
  loading: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    private location: Location,
    public menu: MenuController,
    public loadingCTRL: LoadingController
    ) {
      this.menu.enable(false, 'custom');
    }

  ngOnInit() {
  }

  async onLogin(form: NgForm){
    this.submitted = true;
    this.loading = await this.loadingCTRL.create({
      message: 'Ingresando'
    });
    if(form.valid){
      await this.loading.present();
      const error = await this.authService.emailPasswordLogin(this.login.email, this.login.password);
      if(error === undefined ){
        this.loading.dismiss();
        this.router.navigateByUrl('/app/tabs/landing');
      }else{
        this.loading.dismiss();
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
