import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/model/userInfo.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.page.html',
  styleUrls: ['./registro-datos.page.scss'],
})
export class RegistroDatosPage implements OnInit {
  user: any;
  userInfo: UserInfo = new UserInfo();

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsuarioService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(data=>{
      this.user = data;
      this.userInfo.uidUsuario = data.uid;
    });
    console.log('user retrieved: ', );
  }

  saveUserInfo(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user localStorage: ', user.uid);
    console.log('uid del usuario: ', user.uid);
    if(this.userInfo !== undefined){
      this.userService.insertUserData(this.userInfo, user.uid);
      this.userInfo = new UserInfo();
      alert('Registro completado exitosamente');
      this.router.navigateByUrl('/app/tabs/landing');
    }else{
      alert('Informacion de usuario incompleta');
    }
  }

}