import { Player } from "../model/player";

export interface SelectMissionRequest {
  player: Player[];
}

export interface SelectMissionResponse {
  players: Player[];
  counter: number;
}

export class MissionEvent {
  private state: any;

  onEnter() {}

  shouldTransition(): boolean {
    return true;
  }
}
