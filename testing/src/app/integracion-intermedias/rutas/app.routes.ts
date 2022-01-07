import { Routes } from "@angular/router";
import { HospitalComponent } from "src/app/integracion-basicas/hospital/hospital.component";
import { IncrementadorComponent } from "src/app/integracion-basicas/incrementador/incrementador.component";
import { MedicosComponent } from "src/app/pruebas-intermedias/03-espias/medicos.component";




export const RUTAS: Routes = [
  { path: "hospital", component: HospitalComponent },
  { path: "medico/:id", component: MedicosComponent},
  { path: "**", component:IncrementadorComponent }

]