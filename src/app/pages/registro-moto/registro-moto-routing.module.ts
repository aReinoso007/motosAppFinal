import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroMotoPage } from './registro-moto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroMotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroMotoPageRoutingModule {}
