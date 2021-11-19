import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input('titulo') title: string | undefined = "Sin título";

  @Input('labels') doughnutChartLabels: Label[]  = ['Label1', 'Label2', 'Label3'];

  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  @Input('colors') colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];


  constructor() { }

  ngOnInit(): void {
/*     this.doughnutChartData = [
      [350, 450, 100],
    ];
    this.doughnutChartLabels = ['Label1', 'Label2', 'Label3'];
    */
  } 

}
