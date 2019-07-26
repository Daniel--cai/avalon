import { Game } from "../../client/src/model/Game";

export type GameStarted = {
  type: "GameStarted";
  game: object;
};
export type PlayerConnected = {
  type: "PlayerConnected";
  player: string;
};
export type PlayerDisconnected = {
  type: "PlayerDisconnected";
  player: string;
};
export type TeamSelected = {
  type: "TeamSelected";
  player: string;
  players: string[];
};
export type VoteSubmitted = {
  type: "VoteSubmitted";
  player: string;
  success: boolean;
};
export type TeamComplete = {
  type: "TeamComplete";
  players: string[];
  success: boolean;
};
// export type TeamRejected = {
//   type: "TeamRejected";
//   players: string[];
// };
export type MissionSubmitted = {
  type: "MissionSubmitted";
  player: string;
  success: boolean;
};
// export type MissionSucceeded = {
//   type: "MissionSucceeded";
//   success: boolean;
//   round: number;
// };
// export type MissionFailed = {
//   type: "MissionFailed";
//   success: boolean;
//   round: number;
// };

export type MissionComplete = {
  type: "MissionComplete";
  success: boolean;
  round: number;
};

export type MerlinFound = {
  type: "MerlinFound";
  selected: string;
  merlin: string;
  player: string;
};
export type MerlinNotFound = {
  type: "MerlinNotFound";
  selected: string;
  merlin: string;
  player: string;
};

export type Event =
  | GameStarted
  | PlayerConnected
  | PlayerDisconnected
  | TeamSelected
  | VoteSubmitted
  | TeamComplete
  | MissionComplete
  | MerlinFound
  | MissionSubmitted
  | MerlinNotFound;
