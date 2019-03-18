import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";

import { MissionState } from "../state/mission-state";
import { IsGameFinished, IsMerlin } from "../logic/game-logic";
import { SetupState } from "../state/setup-state";
import { MerlinState } from "../state/merlin-state";
import { GameOverState } from "../state/gameover-state";

export class MissionCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveMission(code: string, player: string, success: boolean) {
    const missionState = new MissionState(code);

    missionState.hydrateState();
    if (!missionState.shouldTransition()) return;

    if (!IsGameFinished(missionState.aggregate.game)) {
      const setupState = new SetupState(code);
      setupState.hydrateState();
      missionState.transitionTo(setupState);
    } else if (IsMerlin(missionState.aggregate.game)) {
      const merlinState = new MerlinState(code);
      merlinState.hydrateState();
      missionState.transitionTo(merlinState);
    } else {
      const gameOver = new GameOverState(code);
      gameOver.hydrateState();
      missionState.transitionTo(gameOver);
    }
  }
}
