import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export class LobbyCreatedMessage implements Message {
  type: Symbol = Symbol("LobbyCreatedMessage");
  code: string;
}

export class LobbyJoinMessage implements Message {
  type: Symbol = Symbol("LobbyJoinMessage");
  player: string;
}

export class LobbyLeaveMessage implements Message {
  type: Symbol = Symbol("LobbyLeaveMessage");
  player: string;
}
