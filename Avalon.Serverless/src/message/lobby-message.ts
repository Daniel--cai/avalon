import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export class LobbyCreatedMessage implements Message {
  type: string = "LobbyCreatedMessage";
  code: string;
}

export interface LobbyJoinMessage extends Event {
  player: string;
  payload: any;
}

// export class LobbyJoinMessage implements Message {
//   type: Symbol = Symbol("LobbyJoinMessage");
//   player: string;
//   constructor(player) {
//     this.player = player;
//   }
// }

export class LobbyLeaveMessage implements Message {
  type = "LobbyLeaveMessage";
  player: string;
}
