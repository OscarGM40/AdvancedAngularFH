import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy{

  public title!: string;
  public titleSub$!: Subscription;

  /* El router de Angular tiene una propiedad 'events' la cual es un Observable<Event>  */
  /* IMPORTANTE: no sobrecargar el constructor */
  constructor(private router: Router) {
    this.titleSub$ = this.getDataThroughRoute()
                     .subscribe(({ title }) => {
                       document.title = `AdminPro - ${title}`;
                       this.title = title;
                    }); 
  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
    // console.log('Cancelada subscripcion a this.router.events')
  }

  getDataThroughRoute() {
    return this.router.events.
      pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }


  ngOnInit(): void {
  }

}
