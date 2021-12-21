import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public hospital!:Hospital;
  
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
  cargarHospitales(desde: number = 0) 
  {
    return this.http.get(`${base_url}/hospitales?desde=${desde}`, this.headers).pipe(
      map<any,Hospital[]>( (resp:{ok:boolean,hospitales:Hospital[],total:number}) => resp.hospitales));
  }
  /* POST */
  crearHospital(nombre: string) 
  {
    return this.http.post(`${base_url}/hospitales`,{ nombre }, this.headers);
  }
  /* PUT */
  actualizarHospital(_id:string, nombre: string) 
  {
    return this.http.put(`${base_url}/hospitales/${_id}`,{nombre}, this.headers);
  }
  /* DELETE */
  borrarHospital(_id:string) 
  {
    return this.http.delete(`${base_url}/hospitales/${_id}`, this.headers);
  }
  
}
