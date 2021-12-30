import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* Para usar un interceptor tengo que implementar la interface HttpInterceptor y desarrollar su método intercept */
@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  /** el método intercept tiene como primer argumento la request que es de tipo HttpRequest<any>(pues puede ser cualquiera).
   * Como segundo arg lleva el next de tipo HttpHandler.
   * El método retornará un Observable que resuelve cualquier cosa también.
   * Un interceptor es como una válvula abierta,que recibe la request y debe retornarla.Lo mismo que recibe lo retorna.
   * Para ello se usa el método next.handle(req) que es el que recibe la request y retorna un Observable.
   * No puedo retornar una request,debe ser un Observable.
   * 
   *  */
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Petición pasó por el interceptor');

    const headers = new HttpHeaders({
      'token-usuario':'abcdefghijklmnopqrstuvwxyz'
    });
    const params = new HttpParams().append('page',2);
    /* la request en este punto ya ha sido lanzada y una request no puede manipularse una vez ha sido lanzada.Debo clonar la request y despues manipularla,en este orden */
    const reqClone = req.clone({
      headers,
      params
    });
    
    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    );  
  }

 
  handleError(error: HttpErrorResponse) {
    console.log('Error en la petición');
    console.warn('Guardando en el log de errores...');
    return throwError('Error de tipo:'+error);
  }

}
