export type StartGameCommand = {
  type: "StartGameCommand";
  code: string;
};
export type SelectTeamCommand = {
  type: "SubmitTeamCommand";
  code: string;
  player: string;
  players: string[];
};
export type SubmitVoteCommand = {
  type: "SubmitVoteCommand";
  code: string;
  player: string;
  success: boolean;
};
export type SubmitMissionCommand = {
  type: "SubmitMissionCommand";
  code: string;
  player: string;
  success: boolean;
};
export type SubmitMerlinCommand = {
  type: "SubmitMerlinCommand";
  code: string;
  player: string;
  success: boolean;
};

export type Command =
  | StartGameCommand
  | SelectTeamCommand
  | SubmitVoteCommand
  | SubmitMissionCommand
  | SubmitMerlinCommand;
