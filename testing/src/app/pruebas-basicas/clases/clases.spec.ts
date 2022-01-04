import { Jugador } from "./clases";









describe('Pruebas en clases', () => {
  let jugador: Jugador;

  beforeEach(() => {
    jugador = new Jugador();
  })


  it('Debe de retornar 80 de hp,si recibe 20 de daño', () => {
    jugador.recibirDanio(20);
    expect(jugador.hp).toBe(80);
  });

  it('Debe de retornar 0 de hp,si recibe 100 de daño', () => {
    jugador.recibirDanio(100);
    expect(jugador.hp).toBe(0);
  });

  it('Debe de retornar 50 de hp,si recibe 50 de daño', () => {
    jugador.recibirDanio(50);
    expect(jugador.hp).toBe(50);
  });

  it('Debe de retornar 0 de hp,si recibe mas de 100 de daño', () => {
    jugador.recibirDanio(150);
    expect(jugador.hp).toBe(0);
  });

})
