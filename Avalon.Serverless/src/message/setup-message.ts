import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export class SetupSelectedMessage implements Message {
  players: string[];
  type: Symbol = Symbol("SetupSelectedMessage");
}

export class SetupNominateMessage implements Message {
  player: string;
  quantity: number;
  type: Symbol = Symbol("SetupNominateMessage");
}
