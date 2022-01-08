import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent y schemas NO_ERRORS_SCHEMA', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports:[ RouterTestingModule]

    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Navbar Component debe de tener un <a> o link hacia /medicos', () => {
    /* puede haber varias directivas,buscar con queryAll */
    const debugElements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref));

    const index = debugElements.findIndex(de => de.properties['href'] === '/medicos');

    expect(index).toBeGreaterThanOrEqual(0);
  });

  
});
