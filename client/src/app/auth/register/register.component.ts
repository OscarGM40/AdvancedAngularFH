import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['oscar', [Validators.required, Validators.minLength(2)]],
    email: ['test@test.com', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terminos: [false, Validators.requiredTrue],
  }, {
    /* como segundo argumento puedo pasar validadores mios con la propiedad validators,que cambiarán el estado del formulario,ojo */
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor(private fb: FormBuilder,
       private usuarioService: UsuarioService,private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;

    // console.log(this.registerForm.value);
    // console.log(this.registerForm.valid);
    if (this.registerForm.invalid) {
      return;
    }
    
    /* si es válido puedo llamar al servicio para crear User */
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        }, 
        complete: () => {
          console.log('Usuario creado satisfactoriamente!');
          this.router.navigateByUrl('/');
        }
      })
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  contrasenasNoCoinciden(): boolean {
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;
    return (pass1 != pass2) && this.formSubmitted;
  }

  passwordCorto(): boolean {
    const pass = this.registerForm.get('password')!.value;
    return (pass.length < 6) && this.formSubmitted;
  }

  password2Corto(): boolean {
    const pass = this.registerForm.get('password2')!.value;
    return (pass.length < 6) && this.formSubmitted;
  }
  /* impl de la funcion validadora.Debe ser una funcion que retorne otra funcion,la cual será ejecutada */
  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      /* son los controles enteros */
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control!.value === pass2Control!.value) {
        // puedo retornar el error en cualquier campo del formulario
        pass2Control!.setErrors(null);
      } else {
        pass2Control!.setErrors({ noCoincide: true });
      }
    }
  }

  ngOnInit(): void {
  }

}
