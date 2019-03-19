import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";

import { MissionState } from "../state/mission-state";
import {
  IsGameFinished,
  HasMerlin,
  IsCurrentMissionSuccess
} from "../logic/game-logic";
import { SetupState } from "../state/setup-state";
import { MerlinState } from "../state/merlin-state";
import { GameOverState } from "../state/gameover-state";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";

export class MissionCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveMission(code: string, player: string, success: boolean) {
    const missionState = new MissionState(code);
    await missionState.hydrateState();

    const lobby = missionState.aggregate;

    if (lobby.game.state !== GameState.Mission) {
      throw new InvalidOperation("You cannot perform this action");
    }

    const vote = new Vote();
    vote.player = player;
    vote.succeed = success;

    lobby.game.GetCurrentMission().quest.push(vote);
    await missionState.getRepository().update(lobby);
    console.log("voted");
    if (!missionState.shouldTransition()) return;

    lobby.game.GetCurrentMission().success = IsCurrentMissionSuccess(
      lobby.game
    );

    console.log("time to transition from Mission!");

    console.log("mission was a " + lobby.game.GetCurrentMission().success);
    await missionState.getRepository().update(lobby);
    if (!IsGameFinished(missionState.aggregate.game)) {
      console.log("back to setup");
      const setupState = new SetupState(code);
      await missionState.transitionTo(setupState);
    } else if (HasMerlin(missionState.aggregate.game)) {
      console.log("merlin!");
      const merlinState = new MerlinState(code);
      await missionState.transitionTo(merlinState);
    } else {
      console.log("gameover!");
      const gameOver = new GameOverState(code);
      await missionState.transitionTo(gameOver);
    }
  }
}
