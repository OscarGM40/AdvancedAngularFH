import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (this.usuarioService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el admin guard');
      this.router.navigateByUrl('/dashboard');
      return false;
    }

  }
}
