import { IncrementadorComponent } from "./incrementador.component";



describe('Pruebas unitarias en el componente Incrementador', () => {
  
  let component: IncrementadorComponent;

  beforeEach(() => {
    component = new IncrementadorComponent();
  });

  it('No debe de pasar de 100 el progreso', () => {
    component.progreso = 50;
    component.cambiarValor(15);

    expect(component.progreso).toBe(65);
  })
})
