import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public req_api='https://reqres123.in/api/user';
  
  constructor(private http: HttpClient) { }

  getUsuarios() {
   
    /* cuando quiera agregar QueryParams opcionales debo usar la clase HttpParams().append(name,value) */
    let params = new HttpParams()
      .append('page', '2');

    /*otra clase muy usada es HttpHeaders,para crear headers  */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token', 
      'x-token': 'moko token'
    });

    /* sin embargo voy a usar un interceptor e incluso manejar los errores con el mismo interceptor,además de mandarle los headers */
   
    /* FORMA SIN INTERCEPTORES */
/*     return this.http.get(`${this.req_api}`,
     { headers,params }).pipe(
      map( (resp:any) => resp['data']),
      catchError( err => {
        console.warn('Error en la peticion');
        // return of([]);
        return throwError('Error de tipo:',err);
      }),
     );  */

    /* FORMA CON INTERCEPTORES */
     return this.http.get(`${this.req_api}`).pipe(
        map( (resp:any) => resp['data']));
  }


}
