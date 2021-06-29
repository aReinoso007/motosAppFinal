import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  user: any;
  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    const user = this.usuarioService.getCurrentUser();
    console.log('data del usuario: ', user);
    this.user = user;
  }

}
