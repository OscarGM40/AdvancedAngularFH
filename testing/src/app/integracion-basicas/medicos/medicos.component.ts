import { Component, OnInit } from '@angular/core';
import { MedicosService } from 'src/app/pruebas-intermedias/03-espias/medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos!:any[];

  constructor(public _medicosService:MedicosService) { }

  ngOnInit(): void {
  }

  saludarMedico(nombre: string) {
    return `Hola ${nombre}`;
  }
  
  obtenerMedicos() {
    this._medicosService.getMedicos()
      .subscribe( (medicos:any[]) => this.medicos = medicos);
  }
}
