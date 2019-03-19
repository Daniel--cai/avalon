import { LobbyRepository } from "../shared/client";
import { IsCurrentNominationSuccess } from "../logic/game-logic";
import { Vote } from "../schema/vote";
import { VoteState, MissionState, SetupState } from "../state";
import { Nomination } from "../schema/nomination";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";

export class SetupCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async selectPlayers(code: string, player: string, players: string[]) {
    const setupState = new SetupState(code);
    const voteState = new VoteState(code);
    console.log(code);
    await setupState.hydrateState();
    const lobby = setupState.aggregate;
    if (lobby.game.state !== GameState.Setup) {
      throw new InvalidOperation("You cannot perform this action");
    }

    if (
      players.length !== setupState.aggregate.game.GetCurrentMission().quantity
    ) {
      throw new InvalidOperation(
        `Not enough players nominated for mission. Requires ${
          setupState.aggregate.game.GetCurrentMission().quantity
        }`
      );
    }

    console.log("selectPlayers: lobby");
    console.log(lobby.game.GetCurrentMission().GetCurrentNomination());
    lobby.game.GetCurrentMission().GetCurrentNomination().nominator = player;
    lobby.game.GetCurrentMission().GetCurrentNomination().nominees = players;
    console.log(lobby.game.GetCurrentMission().GetCurrentNomination());
    console.log("selectPlayers: nominations");
    await this.client.update(lobby);
    console.log("updated");
    console.log(voteState);
    await setupState.transitionTo(voteState);
    console.log("done");
  }
}
