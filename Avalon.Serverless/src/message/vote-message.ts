import { Message } from "./message";
import { Player } from "../model/player";
import { GameState } from "../model/state";

export interface VoteMissionMessage extends Message {
  player: Player[];
  type: GameState.Voting;
}
