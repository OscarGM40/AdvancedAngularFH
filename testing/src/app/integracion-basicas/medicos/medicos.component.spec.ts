import { MedicosComponent } from "./medicos.component";
import { TestBed,ComponentFixture } from '@angular/core/testing';
import { MedicosService } from "src/app/pruebas-intermedias/03-espias/medicos.service";
import { HttpClientModule } from "@angular/common/http";



describe('Pruebas de integración básicas en MedicosComponent', () => {
  
  let component:MedicosComponent;
  let fixture: ComponentFixture<MedicosComponent>;  

  beforeEach( () => {
    /* En las pruebas de integración no se inicia una nueva instancia.Además hay que decir a Angular que puede usar sus ciclos de vida,sus pipes,etc en esta prueba */
    // component = new MedicosComponent(); NO
    TestBed.configureTestingModule({
      declarations: [MedicosComponent],
      providers: [MedicosService], //aqui irian los servicios que necesita el componente
      imports: [HttpClientModule] //aqui irian los modulos que necesita el componente
  });
    /* ahora hay que crear ese componente,en vez de con el new con el createComponent.
    Este createComponent regresa una instancia de ComponentFixture<T>,con el que podré acceder al html o css,es decir navegar por el DOM que se creó.
    Es como un wrapper en React  */
    fixture = TestBed.createComponent(MedicosComponent);
    component = fixture.componentInstance;
  });

  it('Debe de crearse el componente', () => {
    expect(component).toBeTruthy();
    expect(component.saludarMedico('Juan')).toBe('Hola Juan');
  });

})
