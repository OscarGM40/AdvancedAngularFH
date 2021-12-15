import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';




import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form-interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!:Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { this.googleInit(); }

  get token(): string { 
    return localStorage.getItem('token') || ''; 
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '139109903112-ingc2d6nd9a88erptsdbglpsaonrrumm.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(this.auth2);

      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    });

  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`,
      {
        headers: {
          'x-token': this.token,
        }
      })
      .pipe(
        tap((resp: any) => {
          // console.log(resp.usuario)
          const { email,google,nombre,role,img="",id:uid } = resp.usuario;

          this.usuario = new Usuario(nombre, email, '',img, google,role,uid);
          
          localStorage.setItem('token', resp.token);
        }),
        map((resp: any) => {
          return resp.ok;
        }),
        catchError(err => {
          return of(false);
        }));

  }

  crearUsuario(formData: RegisterForm): Observable<Object> {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role?: string}): Observable<Object> {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
