import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  @ViewChild('txtTermino') inputBusqueda!: ElementRef;

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public desdeB: number = 0;
  public cargando: boolean = true;
  public totalBusqueda: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    /* desde 0 muestra todos */
    this.cargarUsuarios();
  }

  /* metodo para cargar los usuarios y no repetir código */
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    /* si mando 5 desde será 5,despues 10,despues 15,etc... */
    this.desde += valor;
    /* controlo que nunca sea menor que 0 */
    if (this.desde < 0) {
      this.desde = 0;
    }
    /* y que nunca sea mayor que lo que me traiga */
    if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  cambiarPaginaBusqueda(valor: number) {
    this.desdeB += valor;
    if (this.desdeB < 0) {
      this.desdeB = 0;
    }
    if (this.desdeB >= this.totalBusqueda) {
      this.desdeB -= valor;
    }
    this.buscar(this.inputBusqueda.nativeElement.value);
  }

  buscar(termino: string) {

    if (termino.length <= 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar('usuarios', termino, this.desdeB)
      .subscribe((resp) => {
        this.totalBusqueda = resp.total;
        this.usuarios = resp.usuarios;
      });
  }

  eliminarUsuario(usuario: Usuario) {
 
    if (usuario.uid === this.usuarioService.usuario.uid) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    
    Swal.fire({
      title: 'Borrar usuario',
      text: `Esta seguro que desea borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(() => {
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} ha sido eliminado correctamente`,
              'success');
              this.totalUsuarios--;
              if(this.desde === this.totalUsuarios){
                this.desde -= 5;
              }
            this.cargarUsuarios();
          });
      };
    })
  };

 cambiarRole(usuario:Usuario){
   this.usuarioService.guardarUsuario(usuario)
    .subscribe((r)=>{
      console.log(r);
    })
 }

 abrirModal(usuario: Usuario) {
   this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
 
}
