import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-router-medicos',
  templateUrl: './router-medicos.component.html',
  styles: [
  ]
})
export class RouterMedicosComponent implements OnInit {

  id!: string;
  
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  guardarMedicos(): void {
    this.router.navigate(['medico', '123']);
  }

}
