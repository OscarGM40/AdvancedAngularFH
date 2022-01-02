import { usuarioLogeado } from "./booleans";







describe('Pruebas de booleanos', () => {
  it('Debe de retornar true', () => {
    const resp = usuarioLogeado();
    expect(resp).toBe(true);
    expect(resp).toBeTruthy();
    expect(resp).not.toBeFalsy();
  })
})
