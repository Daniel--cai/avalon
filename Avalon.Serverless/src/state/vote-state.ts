import { BaseState } from "./base-state";
import { GameState } from "../model/state";
import { VoteCountedMessage } from "../message/vote-message";
import { Nomination } from "../schema/nomination";
import {
  GetNextNominator,
  IsCurrentNominationSuccess
} from "../logic/game-logic";
import { MissionState, SetupState } from ".";

export class VoteState extends BaseState {
  public type: GameState = GameState.Voting;

  constructor(code: string) {
    super(code);
  }
  async onEnter() {
    // const nomination = new Nomination();
    // console.log("vote onEnter");
    // nomination.nominator = GetNextNominator(this.aggregate.game);
    // console.log("current state " + this.aggregate.game.state);
    // console.log(this.aggregate.game.GetCurrentMission());
    // this.aggregate.game.GetCurrentMission().nominations.push(nomination);
    // this.getRepository().update(this.aggregate);
  }

  async onTransition() {
    const code = this.aggregate.code;
    const message = new VoteCountedMessage();
    message.success = IsCurrentNominationSuccess(this.aggregate.game);
    message.votes = this.aggregate.game
      .GetCurrentMission()
      .GetCurrentNomination().votes;
    // this.broadcast(message);
    if (message.success) {
      this.transitionTo(new MissionState(this.aggregate.code));
    } else {
      this.transitionTo(new SetupState(this.aggregate.code));
    }
  }

  async transitionTo(newState: BaseState) {
    if (this.shouldTransition()) {
      //this.onTransition();
      this.changeState(GameState.Voting, newState.type);
      await newState.hydrateState(this.aggregate);
      newState.onEnter();
    }
  }

  shouldTransition(): boolean {
    const nomimation = this.aggregate.game
      .GetCurrentMission()
      .GetCurrentNomination();

    if (nomimation.votes.length >= this.aggregate.getNumberOfPlayers()) {
      return true;
    }
    return false;
  }
}
