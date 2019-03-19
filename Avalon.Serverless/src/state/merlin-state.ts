import { BaseState } from "./base-state";
import { GameState } from "../model/state";
import { Message } from "../message/message";
import {
  SetupNominateMessage,
  SetupSelectedMessage
} from "../message/setup-message";
import { Nomination } from "../schema/nomination";
import { GetNextNominator } from "../logic/game-logic";

export class MerlinState extends BaseState {
  public type: GameState = GameState.Merlin;

  constructor(code: string) {
    super(code);
  }
  async onEnter() {
    const nominator = GetNextNominator(this.aggregate.game);

    const nomination = new Nomination();
    {
      nomination.nominator = nominator;
    }

    this.aggregate.game.GetCurrentMission().nominations = [
      ...this.aggregate.game.GetCurrentMission().nominations,
      nomination
    ];
    await this.getRepository().update(this.aggregate);

    const message = new SetupNominateMessage();
    {
      message.player = nominator;
      message.quantity = this.aggregate.game.GetCurrentMission().quantity;
    }

    await this.broadcast(message);
  }

  async onTransition() {
    const currentMission = this.aggregate.game.GetCurrentMission();
    const message = new SetupSelectedMessage();
    {
      message.players = currentMission.GetCurrentNomination().nominees;
    }
    await this.broadcast(message);
  }

  async onReceiveMessage(message: Message) {
    this.broadcast(message);
  }

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      await this.onTransition();
      await this.changeState(GameState.Setup, newState.type);
      await newState.hydrateState();
      await newState.onEnter();
    }
  }

  shouldTransition(): boolean {
    if (this.aggregate.game.state === null) return true;
    return false;
  }
}
