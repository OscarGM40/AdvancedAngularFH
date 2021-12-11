import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false,],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }


  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: (res) => {

          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value);
            localStorage.setItem('remember', this.loginForm.get('remember')!.value);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }
          // console.log(res);
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
        complete: () => {
          this.router.navigate(['/']);
          // window.open( '/dashboard', '_self' );
        }
      });
  }

  onSuccess(googleUser: any) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getId());
  }

  onFailure(error: any) {
    console.log(error);
  }
  /* cuando llame algo en el onInit de un componente me aseguro que ese componente ha cargado y renderizado todo su HTML y creado el DOM.El script de la Google SignIn  API que llama al render no me asegura que este componente se cargó,pero si llamarlo al método en este ciclo de vida */
  ngOnInit(): void {
    this.renderButton();
  }

  /* renderiza el botón,ojo que hay que esperar al DOM */
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });

    this.startApp();
  }

  /* fija la auth al elemento que yo quiera */
  async startApp() {
      this.auth2 = await this.usuarioService.googleInit();
      this.attachSignin(document.getElementById('my-signin2'));
    }

  /* ato en el onClick al elemento que yo quise la auth de Google Sign In */
  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log('Logged in as: ' + googleUser.getBasicProfile().getId());
        
        // Aqui ya tengo el token de google
        this.usuarioService.loginGoogle(id_token)
          .subscribe(() => {
            this.ngZone.run(() => {
            this.router.navigate(['/']);
            this.auth2.disconnect();
            });
          }
          );

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
/* 105328336732809726207 */
/* 105328336732809726207 */