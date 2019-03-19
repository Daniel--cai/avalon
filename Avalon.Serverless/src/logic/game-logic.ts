import { Game } from "../schema/game";
import { Nomination } from "../schema/nomination";

export function GetNextNominator(game: Game): string {
  return "";
}

export function SetNextNominator(game: Game): Game {
  const nomination = new Nomination();
  {
    nomination.nominator = GetNextNominator(game);
  }
  game.GetCurrentMission().nominations.push(nomination);
  return game;
}

export function GetMissionQuantity(game: Game): number[] {
  switch (game.players.length) {
    case 5:
      return [2, 3, 2, 3, 3];
    case 6:
      return [2, 3, 4, 3, 3];
    case 7:
      return [2, 3, 3, 4, 4];
    case 8:
    case 9:
    case 10:
      return [3, 4, 4, 5, 5];
    default:
      return [3, 4, 4, 5, 5];
  }
}

export function IsDefaultVoteForMission(game: Game): boolean {
  return false;
}

export function IsCurrentNominationSuccess(game: Game): boolean {
  const votes = game.GetCurrentMission().GetCurrentNomination().votes;

  let sucesses = 0;
  votes.forEach(vote => {
    if (vote.succeed) sucesses++;
  });
  return sucesses / votes.length > 0.5;
}

export function IsCurrentMissionSuccess(game: Game): boolean {
  const votes = game.GetCurrentMission().GetCurrentQuest();

  return votes.filter(vote => vote.succeed === false).length === 0;
}

export function IsGameFinished(game: Game): boolean {
  return game.round >= 5;
}

export function HasMerlin(game: Game): boolean {
  return false;
}
