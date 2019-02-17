import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export class VoteMissionMessage implements Message {
  players: Player[];
  type: Symbol = Symbol("VoteMissionMessage");
}

export class VoteSelectMessage implements Message {
  player: string;
  quantity: number;
  type: Symbol = Symbol("VoteSelectMessage");
}
