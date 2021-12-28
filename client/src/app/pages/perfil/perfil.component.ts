import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;

  public imagenSubida!: File;
  public imagenTemporal!: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ref: ChangeDetectorRef,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required,]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe( () => 
      {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios guardados', 'success');
        this.ref.detectChanges();
      },
      (error) => 
      {
        console.log(error);
        Swal.fire('Error', error.error.mensaje, 'error');
      });
  }

  cambiarAvatar(archivo: File) {
    
    this.imagenSubida = archivo;

    if (!archivo) {
      return ;
    }
    
    if (!archivo.type.includes('image')) {
      return;
    }
    /* puedo construir una imagen temporal leyendo un blob,encriptandolo y aplicando al atributo src el resultado */
    const reader = new FileReader();
    /* el método FileReaderInstance.readerAsDataUrl(blob) empieza a leer un Blob y lo pasa a base64-Encoding */
    reader.readAsDataURL(archivo);
    
    /* con el onloadend sé que ha terminado de cargar */
    reader.onloadend = () => {
      this.imagenTemporal = reader.result!.toString();
      this.ref.detectChanges();
    };
  }
  
  guardarAvatar() {
    
    this.fileUploadService
    .actualizarFoto(this.imagenSubida, 'usuarios', this.usuario.uid)
    .then(img => { 
      this.usuario.img = img;
      Swal.fire('Guardado', 'Avatar actualizado', 'success');
    })
    .catch((error) => {
      console.log(error.error);
      Swal.fire('Error', error.error.mensaje, 'error');
      });
  }

}
