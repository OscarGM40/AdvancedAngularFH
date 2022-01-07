import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicosComponent } from './integracion-basicas/medicos/medicos.component';
import { HospitalComponent } from './integracion-basicas/hospital/hospital.component';
import { IncrementadorComponent } from './integracion-basicas/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    HospitalComponent,
    IncrementadorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
