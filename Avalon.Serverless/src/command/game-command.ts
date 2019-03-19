import { LobbyRepository } from "../shared/client";
import { GetMissionQuantity } from "../logic/game-logic";
import { GameStateMachine } from "../state-machine";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";

export class GameCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async startGame(code: string) {
    const lobby = await this.client.getByCode(code);

    if (lobby.game.state !== GameState.Lobby) {
      throw new InvalidOperation("You cannot perform this action");
    }

    const state = new GameStateMachine(GameState.Lobby);
    state.hydrate(lobby.game);
    lobby.game.players = [...lobby.players];

    const missionQuantity = GetMissionQuantity(lobby.game);
    console.log(missionQuantity);
    for (let index = 0; index < 5; index++) {
      lobby.game.missions[index].quantity = missionQuantity[index];
    }
    state.startGame();
    await this.client.update(lobby);
  }
}
