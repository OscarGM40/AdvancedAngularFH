import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
 
  /* es un estandar usar _ para marcar una prop privada */
  private _ocultarModal: boolean = true;
  public tipo!: string;
  public id!: string;
  public img!: string;

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(
    tipo:'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string ='no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img.includes('https')){
      this.img = img;
    }else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  
  constructor() { }
}
