import { BaseState } from "./base-state";

import { GameState } from "../model/state";

import { Message } from "../message/message";
import { Mission } from "../schema/mission";

export class LobbyState extends BaseState {
  public type: GameState = GameState.Lobby;

  constructor(code: string) {
    super(code);
  }
  onEnter() {}

  async onReceiveMessage(message: Message) {}

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      console.log(`transitionTo: transitioning from lobby to ${newState.type}`);
      await this.onTransition();
      await this.changeState(GameState.Lobby, newState.type);
      console.log(
        "lobby-state: newState.hydrateState with" + this.aggregate.game.state
      );
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
