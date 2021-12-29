import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/* Child Components */
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

/* Mantenimientos */
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {
    path: '', component: DashboardComponent, data: { title: 'Dashboard', }
  },
  {
    path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema', }
  },
  {
    path: 'busqueda/:termino', component: BusquedaComponent, data: { title: 'Busqueda', }
  },
  {
    path: 'grafica-dona', component: Grafica1Component, data: { title: 'Gráfica Dona | Donought', }
  },
  {
    path: 'perfil', component: PerfilComponent, data: { title: 'Perfil Usuario', }
  },
  {
    path: 'promesas', component: PromesasComponent, data: { title: 'Promesas Custom', }
  },
  {
    path: 'progress', component: ProgressComponent, data: { title: 'Gráfica ProgressBar', }
  },
  {
    path: 'rxjs', component: RxjsComponent, data: { title: 'Operadores RxJs Y Observables Custom', },
  },
  /* mantenimientos === CRUD por colección data es para las breadcrumbs   */
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimiento de Medicos' } },
  /* rutas Admin | User */
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { title: 'Mantenimiento de Usuarios' }
  },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule {
  constructor(){ console.log('ChildRoutesModule');}
 }
