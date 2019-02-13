import { Player } from "../schema/player";
import { GameState } from "../model/state";
import { PlayerRole } from "../model/playerrole";

// select -> vote -> mission

interface SelectMissionAction {
  player: Player;
  number: 0;
}

interface SelectMissionRequest {
  player: Player[];
}

interface SelectMissionResponse {
  players: Player[];
  counter: number;
}

interface VoteMissionAction {
  player: Player[];
}

interface VoteMissionRequest {
  succeed: boolean;
}

interface VoteMissionResponse {
  success: boolean;
}

interface SelectQuestAction {
  players: Player;
}

interface SelectQuestRequest {
  players: Player[];
}

interface SelectQuestResponse {
  player: Player;
  success: boolean;
}

interface SelectMerlinAction {
  player: Player;
}

interface SelectMerlinResult {
  success: boolean;
  players: Player[];
  playerRoles: PlayerRole[];
}
