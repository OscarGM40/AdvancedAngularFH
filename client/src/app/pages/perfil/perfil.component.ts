import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;

  public imagenSubida: File;
  public imagenTemporal: string | ArrayBuffer = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ref: ChangeDetectorRef,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
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
      .subscribe((resp) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        this.ref.detectChanges();
      });
  }

  cambiarAvatar(archivo: File) {
    this.imagenSubida = archivo;

    if (!archivo) {
      return this.imagenTemporal = null;
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
      this.imagenTemporal = reader.result.toString();
      this.ref.detectChanges();
    };
  }

  guardarAvatar() {

    this.fileUploadService
      .actualizarFoto(this.imagenSubida, 'usuarios', this.usuario.uid)
      .then(img => { this.usuario.img = img; })
      .catch(console.log);
  }

}
