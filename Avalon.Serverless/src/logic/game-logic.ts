import { Game } from "../schema/game";

export function GetNextNominator(game: Game): string {
  return "";
}

export function GetNextMissionQuantity(game: Game): number {
  return 1;
}

export function IsDefaultVoteForMission(game: Game): boolean {
  return false;
}

export function IsCurrentNominationSuccess(game: Game): boolean {
  return true;
}

export function IsCurrentMissionSuccess(game: Game): boolean {
  const votes = game.GetCurrentMission().GetCurrentQuest();

  let sucesses = 0;
  votes.forEach(vote => {
    if (vote.succeed) sucesses++;
  });
  return sucesses / votes.length > 0.5;
}
