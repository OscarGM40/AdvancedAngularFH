import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubida!: File;
  public imagenTemporal!: string | ArrayBuffer | null;

  constructor(public modalImagenService: ModalImagenService) { }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imagenTemporal = null;
    (<HTMLInputElement>document.getElementById('imagen')).value = '';
  }
  
  cambiarAvatar(archivo: File) {
    
    this.imagenSubida = archivo;

    if (!archivo) {
      return;
    }

    if (!archivo.type.includes('image')) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result!.toString();
    };
  }


}
