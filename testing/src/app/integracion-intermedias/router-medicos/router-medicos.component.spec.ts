import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subject } from 'rxjs';

import { RouterMedicosComponent } from './router-medicos.component';

class FakeRouter {
  navigate(params:any){

  }
}

class FakeActivatedRoute {
  // params: Observable<any> = new Observable();
  params: Observable<any> = from([{id: '123'}]);
  
  /* para insertar valores vamos a usar un Subject */
  //  private subject:Subject<any>= new Subject();

  /* creamos un método para insertarle un valor */
/*    push(valor:any){
    this.subject.next(valor);
  }  */

  /* hacemos un getter que retorne el subject como Observable */
/*    get params():any {
    return this.subject.asObservable();
  }  */
}

describe('Clases fake y espias sobre ellas', () => {
  let component: RouterMedicosComponent;
  let fixture: ComponentFixture<RouterMedicosComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ RouterMedicosComponent ],
      providers:[
        {provide: Router, useClass: FakeRouter},
        // {provide: ActivatedRoute, useClass: FakeActivatedRoute}
        {provide: ActivatedRoute, useValue: {
          params: from([{id: '123'}])
        }}
      ]
    })
    fixture = TestBed.createComponent(RouterMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('al guardar un medico debe de redireccionar a /medicos', () => {
    // const router = TestBed.get(Router); deprecado
    const router = TestBed.inject(Router); // ahora es inject
    const spy = spyOn(router, 'navigate');

    component.guardarMedicos();

    expect(spy).toHaveBeenCalledWith(['medico', '123']);

  })

  it('debe de colocar el id del medico en el parametro de la ruta', () => {
    /* creamos la instancia de FakeActivatedRoute */
    TestBed.inject(ActivatedRoute);
    expect(component.id).toBe('123');
  });

});
