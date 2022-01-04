import { of, throwError } from "rxjs";
import { MedicosComponent } from "./medicos.component";
import { MedicosService } from "./medicos.service";


describe('Pruebas con espias y servicios', () => {

    let componente: MedicosComponent;
    let servicio: MedicosService;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient',
            { post: of({}), get: of({}) });
        servicio = new MedicosService(spy);
        componente = new MedicosComponent(servicio);
    });


    it('Init debe de cargar los médicos', () => {

        /* spyOn suplanta un método dado con lo que yo quiera retornar.Lógicamente si el método original retornaba un Observable como es el caso,debo retornar un Observable. */
        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return of(['medico1', 'medico2']);
        });
        /* fijate como debo llamar a un ciclo de vida manualmente*/
        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
        
    });
    
    it('Debe de llamar al método del  servicio  para agregar un médico', () => {
        /* spyOn es un método que devuelve lo que devuelva la función mockeada,pero siempre es un método,pues estoy fakeando un método(será lo que fakee pues) */
        const espia = spyOn(servicio,'agregarMedico').and.callFake( (medico) => {
            /* me da igual devolver algo correcto */
            return of([]);
        })
        componente.agregarMedico();
        expect(espia).toHaveBeenCalled();
    });
    
    it('Debe de agregar un medico al arreglo de medicos', () => {
        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return of(['medico1', 'medico2']);
        });
        componente.ngOnInit();
        const medico='medico3';
        /* puedo usar la función returnValue(value) */
        spyOn(servicio, 'agregarMedico').and.returnValue(of(medico));
        componente.agregarMedico();
        expect(componente.medicos.length).toBe(3);
        /* es aún mejor comprobar que en arreglo esté incluido el médico nuevo,en vez de sólo comprobar la longitud */
        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
        console.log(componente.medicos);
        
    });
    
    it('Si falla la adición la propiedad mensajeError debe ser igual al error del servicio', () =>{ 
        const miError = 'No se pudo agregar el médico';
        spyOn(servicio,'agregarMedico').and.returnValue(
            throwError(miError)
            )
        componente.agregarMedico();
        expect(componente.mensajeError).toBe(miError);
        expect(componente.mensajeError).toBeTruthy();
        expect(componente.mensajeError).toContain(miError);
    })

    it('Debe de llamar al método del  servicio  para borrar un médico', () => {
        /* debo simular el true del confirm.El objetivo de las pruebas automáticas es que se ejecuten sin necesidad de mi interacción */
        spyOn(window,'confirm').and.returnValue(true);
        
        const id = ""+1;
        const espia = spyOn(servicio, 'borrarMedico').and.
        callFake((id) => {
            return of([]);
        })
        componente.borrarMedico(id);
        expect(espia).toHaveBeenCalledWith(id);
    });
    
    it(' No Debe de llamar al método del  servicio  para borrar un médico', () => {
        spyOn(window,'confirm').and.returnValue(false);

        const id = ""+1;
        const espia = spyOn(servicio, 'borrarMedico').and.
        callFake((id) => {
            return of([]);
        })
        componente.borrarMedico(id);
        expect(espia).not.toHaveBeenCalled();
    });
    
    
});
