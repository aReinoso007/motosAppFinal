/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotosService } from 'src/app/services/motos/motos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.page.html',
  styleUrls: ['./motos.page.scss'],
})
export class MotosPage implements OnInit {
  motosList: any[] = [];
  constructor(
    private motosService: MotosService, 
    private router: Router, 
    private userService: UsuarioService, 
    private decimalPipe: DecimalPipe) { }
  ngOnInit() {
    this.getMotosList();
    console.log('motoslist: ', this.motosList.length);
  }

  getMotosList(){
    const user = this.userService.getCurrentUser();
    console.log('uid del usuario recuperado: ', user.uid);
    try{
      this.motosService.getUserMotos(user.uid)
      .subscribe(data=>{
        this.motosList = JSON.parse(JSON.stringify(data));
      });
    }catch(err){
      throw console.error('error retrieving user motoslist: ', err.message);
    }
  }

  registerMotos(){
    this.router.navigateByUrl('/app/tabs/registromoto');
  }

  verMoto(uid: string){

  }

}
