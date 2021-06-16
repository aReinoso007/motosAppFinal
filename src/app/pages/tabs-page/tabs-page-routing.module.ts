import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPagePage,
    children: [
      /*{
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },*/
      {
        path: 'rutas',
        children: [
          {
            path: '',
            loadChildren: () => import('../rutas/rutas.module').then(m => m.RutasPageModule)
          }
        ]
      },
      {
      path: 'grupos',
        children: [
          {
            path: '',
            loadChildren: () => import('../grupos/grupos.module').then(m => m.GruposPageModule)
          }
        ]
      },
      {
        path: 'landing',
          children: [
            {
              path: '',
              loadChildren: () => import('../landing/landing.module').then(m => m.LandingPageModule)
            }
          ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
