import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public medico!: Medico;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  
  /* GET */
  cargarMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
      map<any, Medico[]>((resp: { ok: boolean, medicos: Medico[]}) => resp.medicos));
  }
  
  /* POST */
  crearMedico(medico:Medico ) {
    return this.http.post(`${base_url}/medicos`,  medico , this.headers);
  }
  
  /* PUT */
  actualizarMedico(medico: Medico) {
    return this.http.put(`${base_url}/medicos/${medico.id}`,medico, this.headers);
  }
  
  /* DELETE */
  borrarMedico(id: string) {
    return this.http.delete(`${base_url}/medicos/${id}`, this.headers);
  }
}
