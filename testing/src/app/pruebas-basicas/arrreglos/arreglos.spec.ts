import { obtenerRobots } from "./arreglos";








describe('Pruebas en arreglos', () => {

  it('Debe de retornar al menos 4 robots', () => {
    const robots = obtenerRobots();
    expect(robots.length).toBeGreaterThanOrEqual(4);
  });

  it('Debe de contener a Megaman y a Jarvis', () => {
    const robots = obtenerRobots();
    expect(robots).toContain('Megaman');
    expect(robots).toContain('Jarvis');
  });
  
});