import { EventEmitter } from "@angular/core";








  export class Jugador2 {
    hp:number;
    hpCambia = new EventEmitter<number>();
    realmenteCambia = new EventEmitter<string>();

    constructor() {
      this.hp = 100;
    }

    recibeDanio(danyo:number) {
      if(danyo >= this.hp) {
        this.hp = 0;
      } else {
      this.hp = this.hp - danyo;
    }
      this.hpCambia.emit(this.hp);
      this.realmenteCambia.emit('Ha cambiado la hp,asinto');
      return this.hp;
    }

  }