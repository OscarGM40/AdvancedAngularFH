import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicosComponent } from './integracion-basicas/medicos/medicos.component';
import { HospitalComponent } from './integracion-basicas/hospital/hospital.component';
import { IncrementadorComponent } from './integracion-basicas/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RUTAS } from './integracion-intermedias/rutas/app.routes';
import { NavbarComponent } from './integracion-intermedias/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(RUTAS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
