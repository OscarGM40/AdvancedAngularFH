import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { RUTAS } from "./integracion-intermedias/rutas/app.routes";
import { NO_ERRORS_SCHEMA } from "@angular/core";


describe('Pruebas de integración intermedias', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [ NO_ERRORS_SCHEMA],
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crear el componente app', () => {
    expect(component).toBeTruthy();
  });

  it('debe de tener un router-outlet', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(RouterOutlet));

    expect(debugElement).not.toBeNull();    
  })

  xit('debe de tener un <a> o link hacia /medicos', () => {
    /* fijate que puede haber varios <anchor> */
    const debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref));

    // console.log(debugElements);
  
    const index = debugElements.findIndex(de => de.properties['href'] === '/medicos');

    expect(index).toBeGreaterThanOrEqual(0);
  });
  
})
