import { Player } from "../model/Player";
import { Mission } from "../model/Mission";

export class GameStore {
  missions: Mission[] = [];
  state: string = "";
  code: string = "";
  players: Player[] = [];
  player: string = "";
  round: number = 1;
  loaded: boolean = false;
  message: string = "";
  events: any[] = [];
}
