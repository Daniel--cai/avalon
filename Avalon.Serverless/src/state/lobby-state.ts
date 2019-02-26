import { BaseState } from "./base-state";

import { GameState } from "../model/state";

import { Message } from "../message/message";
import { Mission } from "../schema/mission";
import { GetNextMissionQuantity } from "../logic/game-logic";

export class LobbyState extends BaseState {
  public type: GameState = GameState.Lobby;

  constructor(code: string) {
    super(code);
  }
  onEnter() {}

  async onTransition() {
    const mission = new Mission();
    this.aggregate.game.missions = [...this.aggregate.game.missions, mission];
    mission.quantity = GetNextMissionQuantity(this.aggregate.game);
    await this.getRepository().update(this.aggregate);
    console.log("lobby onTransition");
    console.log(this.aggregate.game.missions);
  }

  async onReceiveMessage(message: Message) {}

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      console.log(`transition from lobby to ${newState.type}`);
      await this.onTransition();
      await this.changeState(GameState.Lobby, newState.type);
      console.log(this.aggregate);
      await newState.hydrateState(this.aggregate);
      await newState.onEnter();
    }
  }

  shouldTransition(): boolean {
    // if (this.aggregate.game.state === null) return true;
    // return false;
    return true;
  }
}
