import { Mission } from "./Mission";
import { Player } from "./Player";

export interface Game {
  missions: Mission[];
  state: string;
  players: Player[];
  round: number;
}
