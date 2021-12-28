import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

export type HospitalesResponse = {
  hospitales:Hospital[];
  total:number;
}
export type MedicosResponse = {
  medicos:Medico[];
  total:number;
}

export type UsuariosResponse = {
  usuarios:Usuario[];
  total:number;
}
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(
        user.nombre,
        user.email,
         '',
        user.img,
        user.google,
        user.role,
        user.uid,
        user.id,
        user.isActive)
    );
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string, desde:number) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}?desde=${desde}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        debounceTime(500),
        map<any, any>( (resp) => {
          switch (tipo) {

            case 'usuarios':
              const usuarios = this.transformarUsuarios(resp.resultados);
              return { usuarios, total: resp.total } as UsuariosResponse;
              
            case 'hospitales':
              const hospitales = resp.resultados;
              return { hospitales, total: resp.total } as HospitalesResponse;

            case 'medicos':
              const medicos = resp.resultados;
              return { medicos, total: resp.total } as MedicosResponse;

            default:
              return [];
          }
        })
      );
  }

  busquedaGlobal(termino:string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map<any, any>( (resp) => {
          const usuarios = this.transformarUsuarios(resp.usuarios);
          const hospitales = resp.hospitales;
          const medicos = resp.medicos;
          return { usuarios, hospitales, medicos } as any;
        })
      );
  };

}





