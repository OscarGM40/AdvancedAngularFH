import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Pruebas de integración en el Incrementador Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IncrementadorComponent],
            imports: [FormsModule]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Debe de mostrar la leyenda', () => {
        component.leyenda = 'Progreso de carga';
        /* en testing tengo que disparar yo la detección de cambios */
        fixture.detectChanges();
        /* tengo que usar by.css(selector) */
        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(elem.innerHTML).toContain('Progreso de carga');
        expect(elem.outerHTML).toContain('Progreso de carga');

    });

    it('Debe de mostrar en el input el valor del progreso',waitForAsync( () => {
        component.cambiarValor(5);
        /* IMPORTANTE :llamar a la detección de cambios demora un poco,y es asíncrona,puedo usar fixture.whenStable().then(callback) para asegurarme que termina */
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const elem: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            console.log(elem);
            expect(elem.value).toBe('55');
        });
    }));

    it('debe de llamar al evento click correctamente en el primer boton', () => {
        /* referencio al Node[] de botones */
        const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));
        /* en el primero le disparo el click con triggerEventHandler(event,extraInfo) */
        botones[0].triggerEventHandler('click', null);
        expect(component.progreso).toBe(45);
    })
    
    it('debe de llamar al evento click correctamente en el segundo boton', () => {
        /* referencio al Node[] de botones */
        const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));
        /* en el primero le disparo el click con triggerEventHandler(event,extraInfo) */
        botones[1].triggerEventHandler('click', null);
        expect(component.progreso).toBe(55);
    });

    it('el h3 debe tener el valor correcto del progreso tras disparar un cambio',() => {
        const botones = fixture.debugElement.queryAll(By.css('button'));
        botones[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(elem.innerHTML).toContain('45');
    });


});
