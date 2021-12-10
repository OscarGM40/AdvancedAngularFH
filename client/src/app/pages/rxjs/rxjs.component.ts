import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubscription?: Subscription;

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
      valor => console.log('Subs: ' + valor),
      error => console.warn('Error: ' + error),
      () => console.info('Observer terminó su trabajo'));

    this.intervalSubscription = this.retornaInterval().subscribe(
      console.log,
      console.warn,
      () => console.info('interval$ ha terminado')
    );
  }
  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
    console.log('Subscription cancelada por ciclo ngOnDestroy');
  }

  /* interval es un operador que devuelve un Observable,emite desde el 0 hasta infinito cada X milisegundos.
  Por otro lado take(number) es otro operador que permite especificar cuantas veces emitirá un valor el Observable y cancelará la Subscription tras ese número */
  /* Map permite transformar la información del Observable antes de entregarla y filter permite filtrarla,entregando sólo determinada data */
  retornaInterval(): Observable<number | string> {
    return interval(500)
      .pipe(
        map(v => 'Valor: ' + ++v),
        filter(v => (+v.split(':')[1] % 2 === 0) ? true : false),
        take(10),
      );
    // return interval$; <- mejor no crear una instancia por performance
  }


  ngOnInit(): void {
  }

  // normalmente,se crean métodos que retornan el Observable
  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
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
