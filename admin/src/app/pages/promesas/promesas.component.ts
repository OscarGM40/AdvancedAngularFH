import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  /* Sin embargo,no se usan las promesas asi,normalmente hay una función que devuelve una promesa y luego se llama.Fijate que solo hago el resolve de body.data tras usar json() sobre el ReadableStream */
  getUsuarios(): Promise<Boolean> {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    })
  }

  constructor() {
    console.log('En el constructor')

  }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    }).catch(error => {
      console.log(error);
    });
    /*Una promesa es una instancia de la clase Promise,que lleva en su constructor una función callback.Esta función puede llevar 0,1 o 2 argumentos.Es una convención que se les llame resolve y reject */
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Promesa Terminada');
      } else {
        reject('Promesa Fallida');
      }
    })
    // En cuanto se use 1 o 2 argumentos en la instancia de Promise hay que llamar a esa instancia con .then/.catch o async/await para resolverla.
    promesa.then((mensaje) => {
      console.log(mensaje);
    }).catch((error) => {
      console.log('Fallo en la recepcion ' + error);
    })

    console.log('Fin NgOnInit')
  }

}
