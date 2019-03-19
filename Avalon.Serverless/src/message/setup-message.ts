import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export class SetupSelectedMessage implements Message {
  players: string[];
  type: "SetupSelectedMessage";
}

export class SetupNominateMessage implements Message {
  player: string;
  quantity: number;
  type: string;
  constructor() {
    this.type = "SetupNominateMessage";
  }
}
