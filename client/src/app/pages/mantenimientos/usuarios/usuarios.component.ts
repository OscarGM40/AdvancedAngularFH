import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
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
    private busquedaService: BusquedasService
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

}
