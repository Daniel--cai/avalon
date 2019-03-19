import { Player } from "../model/player";
import { BaseState } from "./base-state";
import { GameState } from "../model/state";
import { Game } from "../schema/game";
import { Mission } from "../schema/mission";

export interface SelectMissionRequest {
  player: Player[];
}

export interface SelectMissionResponse {
  players: Player[];
  counter: number;
}

export class MissionState extends BaseState {
  private state: any;
  public type: GameState = GameState.Mission;

  constructor(code: string) {
    super(code);
  }

  onTransition() {
    const lobby = this.aggregate;
    lobby.game.round = lobby.game.round + 1;
    this.getRepository().update(lobby);
  }

  shouldTransition(): boolean {
    const mission = this.aggregate.game.GetCurrentMission();
    return mission.GetCurrentQuest().length >= mission.quantity;
  }
  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      this.onTransition();
      this.changeState(GameState.Mission, newState.type);
      await newState.hydrateState(this.aggregate);
      newState.onEnter();
    }
  }
}
