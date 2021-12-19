import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

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
      user => new Usuario(user.nombre, user.email, '',user.img, user.google,user.role, user.uid)
    );
  }
  
  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string, desde:number) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}?desde=${desde}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        // tap(console.log),
        debounceTime(500),
        map<any,any>( (resp) => {
          switch (tipo) {
            case 'usuarios':
              const usuarios = this.transformarUsuarios(resp.resultados);
              return { usuarios, total: resp.total };
            default:
              return [];
          }
        })
      );
  }



}





