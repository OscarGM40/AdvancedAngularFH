import { incrementar } from "./numeros";



describe('Pruebas en numeros.ts', () => {
    it('Debe de retornar 100, si el numero ingresado es mayor a 100', () => {
      const numero = 101;
      const resp = incrementar(numero);
      expect(resp).toBe(100);
    });

    it('Debe de retornar el numero ingresado mas 1, si el numero ingresado es menor a 100', () => {
      const numero = 50;
      const resp = incrementar(numero);
      expect(resp).toBe(51);
    });

});