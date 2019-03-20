export interface StartGameCommand {
  type: "StartGameCommand";
  code: string;
}

export interface SubmitTeamCommand {
  type: "SubmitTeamCommand";
  code: string;
  player: string;
  players: string[];
}

export interface SubmitVoteCommand {
  type: "SubmitVoteCommand";
  code: string;
  player: string;
  success: boolean;
}

export interface SubmitMissionCommand {
  type: "SubmitMissionCommand";
  code: string;
  player: string;
  success: boolean;
}

export interface SubmitMerlinCommand {
  type: "SubmitMerlinCommand";
  code: string;
  player: string;
  success: boolean;
}

export type Command =
  | StartGameCommand
  | SubmitTeamCommand
  | SubmitVoteCommand
  | SubmitMissionCommand
  | SubmitMerlinCommand;
