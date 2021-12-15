
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';

import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



const routes: Routes = [
   {
      path: 'dashboard',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
         {
            path: '', component: DashboardComponent, data: {
               title: 'Dashboard',
            }
         },
         {
            path: 'progress', component: ProgressComponent, data: {
               title: 'Gráfica ProgressBar',
            }
         },
         {
            path: 'grafica-dona', component: Grafica1Component, data: {
               title: 'Gráfica Dona | Donought',
            }
         },
         {
            path: 'account-settings', component: AccountSettingsComponent, data: {
               title: 'Ajustes de Tema',
            }
         },
         {
            path: 'promesas', component: PromesasComponent, data: {
               title: 'Promesas Custom',
            }
         },
         {
            path: 'rxjs', component: RxjsComponent, data: {
               title: 'Operadores RxJs Y Observables Custom',
            },
         },
         {
            path: 'perfil', component: PerfilComponent, data: {
               title: 'Perfil Usuario',
            }
         },
         /* mantenimientos === CRUD por colección */
         { path:'usuarios', component: UsuariosComponent, data: { title: 'Usuarios de aplicaciòn' } },
      ]
   }];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PagesRoutingModule { }







