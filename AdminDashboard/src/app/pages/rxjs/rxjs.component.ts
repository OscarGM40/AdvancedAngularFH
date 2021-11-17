import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() { 
/* Un Observable se crea igual que una Promise,con una callback como argumento y donde el primer argumento es el Observer,el cual puede acumular valores para despues emitirlos en la subscripción */
  /*   let i = -1;

    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor 2');
        } 

      }, 1000);
    }); */

    // mientras el observable esté vivo,se ejecutará el subscribe(next,error,complete).Un Observable no hará nada mientras nadie se subscriba a él.
    // puedo redireccionar la entrada al principio con pipe y ejecutar lógica antes de pasar el valor al Subscriber,en este caso,se ejecutará el retry() 5 veces. 
    // obs$.pipe(
    this.retornaObservable().pipe(
      retry(5),
    ).subscribe(
      valor => console.log('Subs: '+valor),
      error => console.warn('Error: '+error),
      () => console.info('Observer terminó su trabajo'));
  }

  ngOnInit(): void {
  }

  // normalmente,se crean métodos que retornan el Observable
  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor 2');
        } 

      }, 1000);
    });
    return obs$;
  }
}
