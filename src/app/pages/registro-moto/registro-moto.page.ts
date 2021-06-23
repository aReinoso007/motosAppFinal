/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Moto } from 'src/app/model/moto.model';
import { MotosService } from 'src/app/services/motos/motos.service';

@Component({
  selector: 'app-registro-moto',
  templateUrl: './registro-moto.page.html',
  styleUrls: ['./registro-moto.page.scss'],
})
export class RegistroMotoPage implements OnInit {
  
  moto: Moto = new Moto();
  selectedFile: any;
  usuario = JSON.parse(JSON.stringify(localStorage.getItem('user')));
  constructor(private motosService: MotosService) { }

  ngOnInit() {
    console.log('nombre: ', this.usuario.name, ' uid: ', this.usuario.uid);
  }

  async addMoto() {
    /*Obtener uid del usuario */
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      const uidUser = user.uid;
      const imageURL = await this.motosService.uploadPhoto(uidUser, this.selectedFile);
      this.motosService.addUserMoto(this.moto, uidUser);
      alert('Moto ingresada exitosamente');
      this.moto = new Moto();
      /*Redirigir a la lista de motos y mandar a refrescar la lista de las motos */
    }else{
      throw console.error('Usuario no loggeado');
    }
  }

  chooseFile(event){
    this.selectedFile = event.target.files;
  }

}
