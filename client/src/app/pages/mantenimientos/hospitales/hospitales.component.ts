import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { Hospital } from 'src/app/models/hospital.model';

import { BusquedasService, HospitalesResponse } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales:Hospital[] = [];
  public hospitalesTemp:Hospital[] = [];
  public cargando:boolean = true;
  public totalBusqueda: number = 0;
  private imgSubs!: Subscription;

  constructor(
    private hospitalService:HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
    ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( (data) => {
      this.cargarHospitales();
    });
  }
  
  ngOnDestroy(): void {
    if (this.imgSubs) {
      this.imgSubs.unsubscribe();
    }
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
        this.cargando = false;
        });
  } 

  guardarCambios(hospital:Hospital){
     this.hospitalService.actualizarHospital(
      hospital.id!, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Hospital actualizado', hospital.nombre, 'success');
      }); 
  }

  eliminarHospital(hospital:Hospital){
    Swal.fire({
      title: 'Borrar hospital?',
      text: `Esta seguro que desea borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital.id!)
          .subscribe(() => {
            Swal.fire(
              'Hospital borrado',
              `${hospital.nombre} ha sido eliminado correctamente`,
              'success');
            this.cargarHospitales();
          });
      };
    })
  }

  async nuevoHospital() {
  
   const { value="" } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital( value!)
        .subscribe( (resp:any) => {
          this.hospitales.push(resp.hospital);
        });
    }
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital.id!, hospital.img);
  }

  buscar(termino: string) {

    if (termino.length < 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }

    if(termino.length === 0) {
     return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino, 0)
      .subscribe((resp:HospitalesResponse) => {
        this.totalBusqueda = resp.total;
        this.hospitales = resp.hospitales;
      });
  }

}
