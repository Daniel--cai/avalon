import { LobbyRepository } from "../shared/client";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { Game } from "../schema/game";

export class SetupCommand {
  private client: LobbyRepository;
  public lobby: Game;
  constructor() {
    this.client = new LobbyRepository();
  }

  async selectPlayers(code: string, player: string, players: string[]) {
    const lobby = await this.client.getByCode(code);
    //validation
    if (lobby.game.state !== GameState.Setup) {
      throw new InvalidOperation("You cannot perform this action");
    }

    if (players.length !== lobby.game.GetCurrentMission().quantity) {
      throw new InvalidOperation(
        `Not enough players nominated for mission. Requires ${
          lobby.game.GetCurrentMission().quantity
        }`
      );
    }

    const state = new GameStateMachine(lobby.game.state as GameState);

    lobby.game.GetCurrentMission().GetCurrentNomination().nominator = player;
    lobby.game.GetCurrentMission().GetCurrentNomination().nominees = players;
    state.hydrate(lobby.game);
    state.voteNomination();

    await this.client.update(lobby);
  }
}
