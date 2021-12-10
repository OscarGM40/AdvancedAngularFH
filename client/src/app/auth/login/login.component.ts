import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false,],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
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
          // this.router.navigate(['/']);
          // window.open( '/dashboard', '_self' );
        }
      });
    }
    
    onSuccess(googleUser:any) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      const id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);
    }
    
  onFailure(error:any) {
    console.log(error);
  }
  /* cuando llame algo en el onInit de un componente me aseguro que ese componente ha cargado y renderizado todo su HTML y creado el DOM.El script de la Google SignIn  API que llama al render no me asegura que este componente se cargó,pero si este ciclo de vida */
  ngOnInit(): void {
    this.renderButton();
  }
  
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
  }
  
}
