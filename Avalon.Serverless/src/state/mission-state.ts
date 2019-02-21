import { Player } from "../model/player";
import { BaseState } from "./base-state";
import { GameState } from "../model/state";

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
    const nomimation = this.aggregate.game
      .GetCurrentMission()
      .GetCurrentNomination();

    if (nomimation.votes.length === this.aggregate.getNumberOfPlayers()) {
      return true;
    }
    return false;
  }

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      this.onTransition();
      this.changeState(GameState.Mission, newState.type);
      newState.onEnter();
    }
  }
}
