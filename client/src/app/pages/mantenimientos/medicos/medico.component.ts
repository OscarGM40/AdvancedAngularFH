import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  /* recuerda que una propiedad no inicializada a un valor estará como undefined */
  public hospitalSeleccionado!: Hospital | undefined;
  public medicoSeleccionado!: Medico | undefined;
  imgSubs!: Subscription;
  actualId: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnInit(): void {
    /* para suscribirme a los cambios en la ruta actual tengo que usar la clase ActivatedRoute.Varias de sus propiedades son Observables a los que suscribirse */
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id;
      this.actualId = id;
      this.cargarMedico(id);
    });

    this.medicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hospital: ['', [Validators.required]],
    });

    this.cargarHospitales();

    /* usamos find porque es más eficiente que el filter ya que cuando encuentre uno para mientras que filter barrerá todo el arreglo */
    fromEvent(document.getElementById('hospital')!, 'change')
      .pipe(
        map((event) => (event.target as HTMLSelectElement).value)
      ).subscribe(id => this.hospitalSeleccionado = this.hospitales.find(hospital => hospital.id === id));
    /* OTRA FORMA */
    /*    this.medicoForm.get('hospital')!.valueChanges
    .subscribe( (id:string) => this.hospitalSeleccionado = this.hospitales.find(hospital => hospital.id === id)); */

    this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((data) => {
        if (this.actualId === data.id) {
          this.cargarMedico(this.actualId);
        }
      });
  }


  ngOnDestroy(): void {
    if (this.imgSubs) {
      this.imgSubs.unsubscribe();
    }
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        // console.log(hospitales);
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.id!, medico.img);
  }

  guardarMedico() {
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        id: this.medicoSeleccionado.id
      };
      this.medicoService.actualizarMedico(data)
        .subscribe((resp: any) => {
          Swal.fire("Médico Actualizado!", `Médico ${resp.medico.nombre} actualizado con éxito`, "success");
          this.router.navigate(['/dashboard', 'medico', resp.medico.id]);
        });
    } else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .pipe()
        .subscribe((resp: any) => {
          Swal.fire("Médico Creado!", `Médico ${resp.medico.nombre} creado con éxito`, "success");
          this.router.navigate(['/dashboard', 'medico', resp.medico.id]);
        });
    }
  }

  cargarMedico(id: string) {
    if (id === "nuevo") {
      return;
    }
    this.medicoService.cargarMedico(id)
      .subscribe((medico: Medico) => {
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({
          nombre: medico.nombre,
          hospital: medico.hospital!.id
        });
        this.hospitalSeleccionado = medico.hospital;
      }, err => this.router.navigateByUrl('/dashboard/medicos'));
  }
}
