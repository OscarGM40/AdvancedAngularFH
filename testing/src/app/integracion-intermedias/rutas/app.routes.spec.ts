import { MedicosComponent } from "src/app/pruebas-intermedias/03-espias/medicos.component";
import { RUTAS } from "./app.routes";






describe('Pruebas sobre rutas' ,() => {

  it('Debe de existir la ruta medico:id', () => {
    expect(RUTAS).toContain({ 
      path: 'medico/:id',
      component: MedicosComponent });    
  })

});