import { Component, OnInit } from '@angular/core';


declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  public year: number = new Date().getFullYear();

  constructor() { }

   ngOnInit(): void {

    customInitFunctions();
  
  }

}
