import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'interceptorsApp';

  constructor(private usuariosService: UsuariosService) {

    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        console.log(data);
      });
  }



}
