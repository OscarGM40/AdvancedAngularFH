import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/games.interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles: [
  ]
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
      this.gameService.getNominados().subscribe(gotys => {
        this.juegos = gotys;
        console.log(gotys);
      });
  }

}
