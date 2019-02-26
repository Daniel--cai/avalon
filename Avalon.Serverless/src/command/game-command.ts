import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Game } from "../schema/game";
import { Setup } from "../schema/setup";
import { SetupState } from "../state/setup-state";
import { LobbyState } from "../state/lobby-state";
import { GameState } from "../model/state";

export class GameCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async startGame(code: string) {
    const lobbyState = new LobbyState(code);
    const setupState = new SetupState(code);
    await lobbyState.hydrateState();
    await lobbyState.transitionTo(setupState);
  }
}
