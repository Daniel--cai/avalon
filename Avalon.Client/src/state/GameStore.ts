import { observable, decorate } from "mobx";

import { Game } from "../model/Game";
import { Player } from "../model/Player";
import { createContext } from "react";
import { Mission } from "../model/Mission";

export class GameStore {
  missions: Mission[] = [];
  state: string = "";
  code: string = "";
  players: Player[] = [];
  player: string = "";
  round: number = 1;
  loaded: boolean = false;
}

decorate(GameStore, {
  missions: observable,
  state: observable,
  code: observable,
  players: observable,
  player: observable,
  round: observable,
  loaded: observable
});

export default createContext(new GameStore());
