import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, filter, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';




import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

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

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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

    return this.http.get(`${base_url}/login/renew`, this.headers)
      .pipe(
        tap((resp: any) => {
          // console.log(resp.usuario)
          const { email, google, nombre, role, img = "", id: uid } = resp.usuario;

          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

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

  actualizarPerfil(data: { email: string, nombre: string, role?: string }): Observable<Object> {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
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

  cargarUsuarios(desde: number = 0) {
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        delay(50),
       /*  map((resp: CargarUsuario) => {
          const usuarios = resp.usuarios.filter(usuario => usuario.isActive === true);
          console.log(usuarios);
          return {
            total: resp.total,
            usuarios
          }
        }), */
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(
            user.nombre,
            user.email,
            '',
            user.img,
            user.google,
            user.role,
            user.id,
            user.id));
          // console.log(usuarios);
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }
  
  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
