import { Player } from "../model/player";
import { BaseState } from "./base-state";

export interface SelectMissionRequest {
  player: Player[];
}

export interface SelectMissionResponse {
  players: Player[];
  counter: number;
}

export class MissionState extends BaseState {
  private state: any;

  constructor(code: string) {
    super(code);
  }
  onEnter() {}

  shouldTransition(): boolean {
    return true;
  }
}
