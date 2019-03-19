import { LobbyRepository } from "../shared/client";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";
import { GameStateMachine } from "../state-machine";

export class VoteCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveVote(code: string, player: string, success: boolean) {
    const lobby = await this.client.getByCode(code);
    if (lobby.game.state !== GameState.Voting) {
      throw new InvalidOperation("You cannot perform this action");
    }
    const vote = new Vote();
    {
      vote.player = player;
      vote.succeed = success;
    }
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
