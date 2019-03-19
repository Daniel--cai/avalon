import { GameState } from "../model/state";
import {
  IsCurrentNominationSuccess,
  SetNextNominator
} from "../logic/game-logic";
import { Lifecycle } from "../state-machine";
import { Game } from "../schema/game";

export function handleTransition() {
  console.log("vote command");
  if (this.data == null) return;
  const nomimation = this.data.GetCurrentMission().GetCurrentNomination();
  console.log(nomimation.votes.length + " <" + this.data.players.length);
  if (nomimation.votes.length < this.data.players.length) {
    return GameState.Voting;
  } else if (IsCurrentNominationSuccess(this.data)) {
    console.log("accepted, time to go on a quest");
    return GameState.Mission;
  } else {
    console.log("rejected, time to pick again");
    this.data = SetNextNominator(this.data);
    return GameState.Setup;
  }
}

function onRejectNomination(lifecycle: Lifecycle) {
  console.log("onRejectNomination");
  const game: Game = this.data;
}

function onLeaveVoting(lifecycle: Lifecycle) {}

export const VotingStateMethods = (() => {
  return {
    onLeaveVoting: onLeaveVoting,
    onRejectNomination: onRejectNomination
  };
})();
