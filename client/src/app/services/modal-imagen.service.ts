import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

type CheckImg = {
  img: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
 
  /* es un estandar usar _ para marcar una prop privada */
  private _ocultarModal: boolean = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public id!: string;
  public img!: string;

  /* para informar de una nueva imagen usaremos la clase EventEmitter.Realmente puedo emitir lo que quiera.Emitiremos un string con la url de la nueva imagen */
  public nuevaImagen: EventEmitter<CheckImg> = new EventEmitter<CheckImg>();



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
