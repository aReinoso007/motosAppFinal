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
  userData = JSON.parse(JSON.stringify(localStorage.getItem('user')));
  constructor(private motosService: MotosService, private router: Router) { }
  ngOnInit() {
    console.log('uid usuario loggeado: ', this.userData);
    this.checkUser();
    this.getMotosList();
    console.log('motos recuperadas: ', this.motosList);
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
    console.log('verificando...');
    if(this.userData === undefined){
      alert('Login to access dashboard');
      this.router.navigateByUrl('/login');
      return false;
    }else{
      return true;
    }
  }

}
