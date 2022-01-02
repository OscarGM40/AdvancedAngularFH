import { mensaje } from "./string";

describe('Pruebas en el string.ts', () => {


  it('Debe de regresar un string', () => {
    const resp = mensaje('Juan');
    expect(typeof resp).toBe('string');
  })

  it('Debe de regresar un string con el nombre enviado', () => {
    const nombre = 'Juan';
    const resp = mensaje(nombre);
    expect(resp).toContain('Juan');
  });

  
})
