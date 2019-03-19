import { LobbyRepository } from "../shared/client";
import { SetupState } from "../state/setup-state";
import { LobbyState } from "../state/lobby-state";
import { GetMissionQuantity } from "../logic/game-logic";

export class GameCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async startGame(code: string) {
    const lobbyState = new LobbyState(code);
    const setupState = new SetupState(code);
    await lobbyState.hydrateState();
    const lobby = lobbyState.aggregate;

    lobby.game.players = [...lobby.players];

    const missionQuantity = GetMissionQuantity(lobby.game);
    console.log(missionQuantity);
    for (let index = 0; index < 5; index++) {
      lobby.game.missions[index].quantity = missionQuantity[index];
    }

    await this.client.update(lobby);
    console.log("startGame: updated client");
    await lobbyState.transitionTo(setupState);
    console.log("startGame: finish");
  }
}
