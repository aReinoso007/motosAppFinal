import { UserOptions } from './../../interfaces/user-options';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signup: UserOptions = {email:'', password:'', name: ''};
  submitted = false;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  async onSignup(form: NgForm){
    this.submitted = true;
    if(form.valid){
      const error = await this.authService.signUp(this.signup.name, this.signup.email, this.signup.password);
      if(error === undefined){
        this.router.navigateByUrl('/app/tabs/grupos');
      }
    }
  }

}
