import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";
import { Vote } from "../schema/vote";

export class VoteCountedMessage {
  votes: Vote[];
  success: boolean;
  type: Symbol = Symbol("VoteCountedMessage");
}
