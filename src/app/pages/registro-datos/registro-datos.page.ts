import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.page.html',
  styleUrls: ['./registro-datos.page.scss'],
})
export class RegistroDatosPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
