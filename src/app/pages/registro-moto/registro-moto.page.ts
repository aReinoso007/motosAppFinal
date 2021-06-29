/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moto } from 'src/app/model/moto.model';
import { MotosService } from 'src/app/services/motos/motos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-moto',
  templateUrl: './registro-moto.page.html',
  styleUrls: ['./registro-moto.page.scss'],
})
export class RegistroMotoPage implements OnInit {
  
  moto: Moto = new Moto();
  selectedFile: any;
  usuario = JSON.parse(JSON.stringify(localStorage.getItem('user')));
  constructor(
    private motosService: MotosService, 
    private userService: UsuarioService,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

  async addMoto() {
    const user = await this.userService.getCurrentUser();
    if(user){
      const uidUser = user.uid;
      const imageURL = await this.motosService.uploadPhoto(this.selectedFile);
      this.moto.photoURL = imageURL;
      this.motosService.addUserMoto(this.moto, uidUser);
      alert('Moto ingresada exitosamente');
      this.moto = new Moto();
      this.router.navigateByUrl('/app/tabs/motos');
      
    }else{
      throw console.error('Usuario no loggeado');
    }
  }

  chooseFile(event){
    this.selectedFile = event.target.files;
  }

  goBack(){
    this.location.back();
  }

}
