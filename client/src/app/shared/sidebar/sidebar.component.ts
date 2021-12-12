import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public imgUrl = "";
  public name = "";
  public menuItems: any[] ;

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService,
    ) { 
    this.menuItems = sidebarService.menu;
  }


  ngOnInit(): void {
    this.imgUrl = this.usuarioService.usuario.getImagenUrl;
    this.name = this.usuarioService.usuario.nombre;
  }

}
