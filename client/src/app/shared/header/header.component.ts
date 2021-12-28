import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
    ) { 
  }
  

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
    this.router.navigate(['/dashboard','busqueda', termino]);
    
    /* otra opcion es con navigateByUrl y template literals(también podria usar "/dashboard/busqueda"+termino con strings normales) */
    // this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }

  logout() {
    this.usuarioService.logout();
  }
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

}
