import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Game } from 'src/app/interfaces/games.interface';
import { map } from 'rxjs/operators';
import { GraphicData } from '../../interfaces/graphicData.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [ ]
})
export class InicioComponent implements OnInit {

  data:GraphicData[]=[];

  constructor(firestore: Firestore) {
    const coll = collection(firestore,'goty');
    collectionData(coll)
    .pipe(
      map<DocumentData[],Game[]>(juegos => juegos as Game[]),
      map<Game[],GraphicData[]>( (juegos) => juegos.map(juego => ({
        name: juego.name,
        value: juego.votos
      }) ))).subscribe((data) => this.data = data);
    
   }

  ngOnInit(): void {
  }

}
