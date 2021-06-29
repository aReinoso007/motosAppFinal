import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptions } from 'src/app/interfaces/user-options';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: UserOptions = { name:'', email:'', password:''};
  submitted = false;

  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(
    public authService: AuthService,
    public router: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

  async onLogin(form: NgForm){
    this.submitted = true;
    if(form.valid){
      const error = await this.authService.emailPasswordLogin(this.login.email, this.login.password);
      if(error === undefined ){
        console.log('login exitoso, redirigiendo a dashboard de usuario');
        this.router.navigateByUrl('/app/tabs/landing');
      }else{
        console.log('usuario o contrasena incorrectos');
        alert(JSON.stringify(error));
      }
    }
  }

  togglePassword(){
    this.showPassword =!this.showPassword;
    if(this.passwordToggleIcon === 'eye' ){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  goBack(){
    this.location.back();
  }
}
