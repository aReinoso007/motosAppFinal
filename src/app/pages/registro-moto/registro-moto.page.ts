/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Moto } from 'src/app/model/moto.model';

@Component({
  selector: 'app-registro-moto',
  templateUrl: './registro-moto.page.html',
  styleUrls: ['./registro-moto.page.scss'],
})
export class RegistroMotoPage implements OnInit {
  moto: Moto = new Moto();
  constructor() { }

  ngOnInit() {
  }

  addMoto(moto: Moto) {
    
  }

}
