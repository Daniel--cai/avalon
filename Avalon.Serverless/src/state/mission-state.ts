import { Player } from "../model/player";
import { BaseState } from "./base-state";
import { GameState } from "../model/state";
import { Game } from "../schema/game";

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
    const mission = this.aggregate.game.GetCurrentMission();
    return mission.GetCurrentQuest().length >= mission.quantity;
  }

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      this.onTransition();
      this.changeState(GameState.Mission, newState.type);
      newState.onEnter();
    }
  }
}
