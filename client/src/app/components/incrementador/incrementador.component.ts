import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // puedo renombrar con @Input('nuevoNombre') la propname a pasar desde el padre por el selector
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida:EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      // this.progreso = 100;
      this.valorSalida.emit(100);
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      // this.progreso = 0;
      this.valorSalida.emit(0);
      return;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(valor: number) {
    if(valor >= 100) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }
  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass} h-100`;
  }

}
