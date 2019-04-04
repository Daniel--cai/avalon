import { LobbyRepository } from "../shared/client";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { Game } from "../schema/game";
import { SubmitTeamCommand } from "../contract";

export class SetupCommand {
  private client: LobbyRepository;
  public lobby: Game;
  constructor() {
    this.client = new LobbyRepository();
  }

  async submitTeam(command: SubmitTeamCommand) {
    const lobby = await this.client.getByCode(command.code);
    //validation
    if (lobby.game.state !== GameState.Setup) {
      throw new InvalidOperation("You cannot perform this action");
    }

    console.log("submitTeam");
    console.log(command.type);

    if (command.players.length !== lobby.game.GetCurrentMission().quantity) {
      throw new InvalidOperation(
        `Not enough players nominated for mission. Requires ${
          lobby.game.GetCurrentMission().quantity
        }`
      );
    }

    const state = new GameStateMachine(lobby.game.state as GameState);

    // lobby.game.GetCurrentMission().GetCurrentNomination().nominator =
    //   command.player;
    lobby.game.GetCurrentMission().GetCurrentNomination().nominees =
      command.players;
    state.hydrate(lobby.game);
    state.voteQuest();

    await this.client.update(lobby);
  }
}
