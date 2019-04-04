import { GameState } from "../model/state";
import { Game } from "../schema/game";
import { Lifecycle } from "../state-machine";
import {
  HasMerlin,
  IsGameFinished,
  IsCurrentMissionSuccess,
  SetNextNominator
} from "../logic/game-logic";

export function handleTransition() {
  const mission = this.data.GetCurrentMission();
  if (mission.GetCurrentQuest().length < mission.quantity) {
    console.log("not all players have submited");
    return GameState.Mission;
  } else if (!IsGameFinished(this.data)) {
    console.log("back to setup");
    return GameState.Setup;
  } else if (HasMerlin(this.data)) {
    return GameState.Merlin;
  } else {
    return GameState.GameOver;
  }
}

function onLeaveMission() {
  const game: Game = this.data;
  game.GetCurrentMission().success = IsCurrentMissionSuccess(this.data);
  game.round = game.round + 1;

  console.log("state lifecycle: onLeaveMission");
  this.data = SetNextNominator(this.data);
}

export const MissionStateMethods = (() => {
  return { onLeaveMission: onLeaveMission };
})();
