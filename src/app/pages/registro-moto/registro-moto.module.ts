import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroMotoPageRoutingModule } from './registro-moto-routing.module';

import { RegistroMotoPage } from './registro-moto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroMotoPageRoutingModule
  ],
  declarations: [RegistroMotoPage]
})
export class RegistroMotoPageModule {}
