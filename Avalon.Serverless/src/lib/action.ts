import { Player } from "../schema/player";
import { GameState } from "../model/state";
import { PlayerRole } from "../model/playerrole";

// select -> vote -> mission

export interface Message {
  type: string;
}

export interface SelectMissionAction extends Message {
  player: Player;
  number: 0;
}

export interface SelectMissionRequest extends Message {
  player: Player[];
}

export interface SelectMissionResponse extends Message {
  players: Player[];
  counter: number;
}

export interface VoteMissionAction extends Message {
  player: Player[];
}

export interface VoteMissionRequest extends Message {
  succeed: boolean;
}

export interface VoteMissionResponse extends Message {
  success: boolean;
}

export interface SelectQuestAction extends Message {
  players: Player;
}

export interface SelectQuestRequest extends Message {
  players: Player[];
}

export interface SelectQuestResponse extends Message {
  player: Player;
  success: boolean;
}

export interface SelectMerlinAction extends Message {
  player: Player;
}

export interface SelectMerlinResult extends Message {
  success: boolean;
  players: Player[];
  playerRoles: PlayerRole[];
}
