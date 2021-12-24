import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService, MedicosResponse } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{
  
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public totalBusqueda: number = 0;
  private imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService,
    ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((data) => {
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    if (this.imgSubs) {
      this.imgSubs.unsubscribe();
    }
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
        this.cargando = false;
      });
  } 

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.id!, medico.img);
  }

  buscar(termino: string) {

    if (termino.length < 0) {
      this.medicos = this.medicosTemp;
      return;
    }

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino, 0)
      .subscribe((resp: MedicosResponse) => {
        this.totalBusqueda = resp.total;
        this.medicos = resp.medicos;
      });
  }
  
  eliminarMedico(medico: Medico) {

    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta seguro que desea borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico.id!)
          .subscribe(() => {
            Swal.fire(
              'Medico borrado',
              `${medico.nombre} ha sido eliminado correctamente`,
              'success');
            this.cargarMedicos();
          });
      };
    })
    
  }

  
}
