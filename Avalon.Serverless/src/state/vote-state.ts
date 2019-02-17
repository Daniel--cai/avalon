import { Player } from "../model/player";
import { BaseState } from "./base-state";

import { GameState } from "../model/state";

import { Command } from "../command/command";
import { Message } from "../message/message";
import { Lobby } from "../schema/lobby";
import { Mission } from "../schema/mission";
import { Nomination } from "../schema/nomination";
import { GetNextNominator } from "../logic/game-logic";

export interface VoteRequest {
  player: Player[];
}
export interface VoteCommand extends Command {
  success: boolean;
}

export interface VoteEventMessage extends Message {
  players: string[];
  counter: number;
}

export class VoteState extends BaseState {
  public Type: GameState = GameState.Voting;

  constructor(code: string) {
    super(code);
  }
  async onEnter() {
    const nomination = new Nomination();
    nomination.nominator = GetNextNominator(this.aggregate.game);
    this.aggregate.game.GetCurrentMission().nominations = [
      ...this.aggregate.game.GetCurrentMission().nominations,
      nomination
    ];
    this.getRepository().update(this.aggregate);
  }

  async onTransition() {
    const code = this.aggregate.code;
  }

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      this.onTransition();
      this.changeState(GameState.Voting, newState.type);
      newState.onEnter();
    }
  }

  shouldTransition(): boolean {
    const nomimation = this.aggregate.game
      .GetCurrentMission()
      .GetCurrentNomination();

    if (nomimation.votes.length === this.aggregate.getNumberOfPlayers()) {
      return true;
    }
    return false;
  }
}
