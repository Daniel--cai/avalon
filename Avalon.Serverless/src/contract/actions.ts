export type SelectTeam = {
  type: "SelectTeam";
  players: string[];
  round: number;
};
export type VoteTeam = {
  type: "VoteTeam";
  players: string[];
  round: number;
};
export type CompleteTeam = {
  type: "CompleteTeam";
  round: number;
};
export type SelectMerlin = {
  type: "SelectMerlin";
  player: string;
};

export type Action = SelectTeam | VoteTeam | CompleteTeam | SelectMerlin;
