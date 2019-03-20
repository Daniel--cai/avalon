export interface SelectTeam {
  type: "SelectTeam";
  player: string;
  quantity: number;
  round: number;
}

export interface VoteTeam {
  type: "VoteTeam";
  players: string[];
  round: number;
}

export interface CompleteTeam {
  type: "CompleteTeam";
  round: number;
}

export interface SelectMerlin {
  type: "SelectMerlin";
  player: string;
}

export type Action = SelectTeam | VoteTeam | CompleteTeam | SelectMerlin;
