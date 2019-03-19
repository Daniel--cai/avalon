import { Player } from "../model/player";
import { BaseState } from "./base-state";

import { GameState } from "../model/state";

import { Command } from "../command/command";

import { Message } from "../message/message";
import { Mission } from "../schema/mission";
import {
  SetupNominateMessage,
  SetupSelectedMessage
} from "../message/setup-message";
import { Nomination } from "../schema/nomination";
import { GetNextNominator } from "../logic/game-logic";

export class SetupState extends BaseState {
  public type: GameState = GameState.Setup;

  constructor(code: string) {
    super(code);
  }
  async onEnter() {
    console.log("setupState: onEnter");
    const nominator = GetNextNominator(this.aggregate.game);

    const nomination = new Nomination();
    {
      nomination.nominator = nominator;
    }
    this.aggregate.game.GetCurrentMission().nominations.push(nomination);

    await this.getRepository().update(this.aggregate);

    console.log("sending SetupNominateMessage");
    const message = new SetupNominateMessage();
    {
      message.player = nominator;
      message.quantity = this.aggregate.game.GetCurrentMission().quantity;
    }
    console.log(message);
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

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      await this.onTransition();
      console.log(`transitioning from Setup to ${newState.type}`);
      await this.changeState(GameState.Setup, newState.type);
      await newState.hydrateState(this.aggregate);
      await newState.onEnter();
    }
  }

  shouldTransition(): boolean {
    return true;
  }
}
