/* eslint-disable curly */
import { UserOptions } from './../../interfaces/user-options';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signup: UserOptions = {email:'', password:'', name: ''};
  submitted = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    private location: Location,
    public menu: MenuController
    ) { this.menu.enable(false, 'custom'); }

  ngOnInit() {
  }

  async onSignup(form: NgForm){
    this.submitted = true;
    if(form.valid){
      const error = await this.authService.signUp(this.signup.name, this.signup.email, this.signup.password);
      if(error === undefined){
        this.authService.emailPasswordLogin(this.signup.email, this.signup.password).then(res=>{
          this.router.navigateByUrl('registro-datos');
          alert('Registro exitoso');
        });
      }else {
        const e = JSON.stringify(error);
        if (e.includes('The email address is badly formatted'))
          alert('Debe ingresar un correo válido');
        if (e.includes('Password should be at least 6 characters'))
          alert('La contraseña debe tener por lo menos 6 caracteres');
      }
    }
  }

  goBack(){
    this.location.back();
  }

}
