import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnInit, OnDestroy{
  interval:NodeJS.Timeout ;

  results: any[]=[
      {
        "name": "Germany",
        "value": 40632,
      },
      {
        "name": "United States",
        "value": 50000,
      },
      {
        "name": "France",
        "value": 36745,
      },
      {
        "name": "United Kingdom",
        "value": 36240,
      },
  ]; // results es la data

  //dimensions of the chart.Impiden que sea responsive
  // view: [number, number] = [700, 400]; 

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false; //show the gradient
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  /* puedo pasar custom colors o un scheme como string que sea válido(ver su documentación para estos themes de colores) */
  /* colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }; */
  colorScheme = 'nightLights';

  onSelect(event:Event) {
    console.log(event);
  }

  constructor() { 
    
    
    this.interval = setInterval ( () => {
      const newResults = [...this.results];
    //  console.log(Math.ceil(Math.random()*5).toFixed(0));
      newResults.forEach( (element,i) => {
        newResults[i].value = Math.ceil(Math.random()*(500)).toFixed(0);
      });
      // this.results = newResults;
      this.results = [...newResults];
    }, 1500);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
