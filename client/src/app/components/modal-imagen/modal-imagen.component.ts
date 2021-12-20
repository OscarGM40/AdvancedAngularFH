import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubida!: File;
  public imagenTemporal!: string | ArrayBuffer | null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService,
  ) {
  }

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

  guardarAvatar() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubida, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Avatar actualizado', 'success');
        /* aqui sé que se subió la imagen */
        this.modalImagenService.nuevaImagen.emit({img,id});
        this.cerrarModal();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error');
      });
  }

}
