import { Player } from "../model/player";
import { BaseState } from "./base-state";

import { GameState } from "../model/state";

import { Command } from "../command/command";
import { VoteCountedMessage } from "../message/vote-message";
import { Nomination } from "../schema/nomination";
import { GetNextNominator } from "../logic/game-logic";
import { Message } from "../message/message";

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
    const message = new VoteCountedMessage();
    message.success = true;
    message.votes = this.aggregate.game
      .GetCurrentMission()
      .GetCurrentNomination().votes;
    this.broadcast(message);
    if (message.success) {
    } else {
      this.transitionTo(new VoteState(this.aggregate.code));
    }
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
