import { LobbyRepository } from "../shared/client";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { SubmitVoteCommand } from "../../../shared/contract";

export class VoteCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async submitVote(command: SubmitVoteCommand) {
    const lobby = await this.client.getByCode(command.code);
    if (lobby.game.state !== GameState.Voting) {
      throw new InvalidOperation("You cannot perform this action");
    }
    const vote = new Vote(command.player, command.success);

    lobby.game
      .GetCurrentMission()
      .GetCurrentNomination()
      .votes.push(vote);

    const state = new GameStateMachine(GameState.Voting);
    state.hydrate(lobby.game);
    state.voteCommand();

    await this.client.update(lobby);
  }
}
