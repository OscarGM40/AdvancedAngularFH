import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresoUno: number = 25;
  progresoDos: number = 35;

  get getProgresoUno() {
    return `${this.progresoUno}%`;
  }

  get getProgresoDos() {  
    return `${this.progresoDos}%`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
