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

export function IsCurrentMissionSuccess(game: Game): boolean {
  return true;
}
