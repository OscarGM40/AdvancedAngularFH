import { Jugador2 } from "./jugador2";




describe('Pruebas con EventEmitter y patron emisor/receptor', () => {
  
  let jugador: Jugador2;

  beforeEach(() => {
    jugador = new Jugador2();
  });

  it('Debe de emitir un evento cuando recibe daño y sobrevivir si es menos de 100', () => {
    let NuevoHp = 0;
    /* esto es solo ponerse a la escucha,ojo */
    jugador.hpCambia.subscribe(hp => NuevoHp = hp);
    jugador.recibeDanio(50);
    expect(jugador.hp).toBe(50);
    
  });

  it('Debe de emitir un evento cuando recibe daño y morir si es mas de 100', () => {
    let NuevoHp = 0;
    /* esto es solo ponerse a la escucha,ojo */
    jugador.hpCambia.subscribe(hp => NuevoHp = hp);
    jugador.recibeDanio(150);
    expect(jugador.hp).toBe(0);
    
  });

  it('Debe de sobrevivir con 70 de vida', () => {
    jugador.hpCambia.subscribe(hp => expect(hp).toBe(70));
    jugador.recibeDanio(30);
  });
  
});
