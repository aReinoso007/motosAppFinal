import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { TabsPagePage } from './tabs-page.page';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/app/tabs/landing']);
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPagePage,
    children: [
      {
        path: 'rutas',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
        children: [
          {
            path: '',
            loadChildren: () => import('../rutas/rutas.module').then(m => m.RutasPageModule)
          }
        ]
      },
      {
      path: 'grupos',
      canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
        children: [
          {
            path: '',
            loadChildren: () => import('../grupos/grupos.module').then(m => m.GruposPageModule)
          }
        ]
      },
      {
        path: 'landing',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
          children: [
            {
              path: '',
              loadChildren: () => import('../landing/landing.module').then(m => m.LandingPageModule)
            }
          ]
      },
      {
        path: 'motos',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
          children: [
            {
              path: '',
              loadChildren: () => import('../motos/motos.module').then(m => m.MotosPageModule)
            }
          ]
      },
      {
        path: 'registromoto',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
          children: [
            {
              path: '',
              loadChildren: () => import('../registro-moto/registro-moto.module').then(m => m.RegistroMotoPageModule)
            }
          ]
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
