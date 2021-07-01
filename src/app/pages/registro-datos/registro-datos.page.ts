import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/model/userInfo.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import ecuador from '../../data/ecuador.json';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.page.html',
  styleUrls: ['./registro-datos.page.scss'],
})
export class RegistroDatosPage implements OnInit {
  user: any;
  userInfo: UserInfo = new UserInfo();
  paises: any;
  estados: any;
  ciudades: any;
  constructor(
    private router: Router,
    private userService: UsuarioService
  ) { }

  ngOnInit() {
    /*this.authService.user.subscribe(data=>{
      this.user = data;
      this.userInfo.uidUsuario = data.uid;
    });*/
    this.paises = Country.getAllCountries();
    this.estados = State.getStatesOfCountry('IN');
    this.ciudades = City.getCitiesOfState('IN', 'DL');
    console.log('estados: ', this.estados[1].name);
  }

  changeProvincia(){

  }

  saveUserInfo(){
    const user = this.userService.getCurrentUser();
    if(this.userInfo !== undefined){
      this.userService.insertUserData(this.userInfo, user.uid);
      this.userInfo = new UserInfo();
      alert('Registro completado exitosamente');
      this.router.navigateByUrl('/app/tabs/landing');
    }else{
      alert('Informacion de usuario incompleta');
    }
  }

  getStatesOfCountry(event){
  }

}
