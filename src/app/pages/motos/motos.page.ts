import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotosService } from 'src/app/services/motos/motos.service';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.page.html',
  styleUrls: ['./motos.page.scss'],
})
export class MotosPage implements OnInit {
  motosList: any[] = [];
  userData: any;
  constructor(private motosService: MotosService, private router: Router) { }
  ngOnInit() {
    this.checkUser();
  }

  getMotosList(){
    try{
      this.motosService.getUserMotos(this.userData.uid)
      .subscribe(data=>{
        this.motosList = JSON.parse(JSON.stringify(data));
      });
    }catch(err){
      throw console.error('error retrieving user motoslist: ', err.message);
    }
  }

  checkUser(){
    this.userData = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    console.log('userData: ', this.userData);
    if(this.userData === null){
      alert('Login to access dashboard');
      this.router.navigateByUrl('/login');
      return false;
    }else{
      return true;
    }
  }

}
