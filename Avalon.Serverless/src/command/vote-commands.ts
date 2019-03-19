import { LobbyRepository } from "../shared/client";
import { VoteState, SetupState, MissionState } from "../state";
import { IsCurrentNominationSuccess } from "../logic/game-logic";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";

export class VoteCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveVote(code: string, player: string, success: boolean) {
    const voteState = new VoteState(code);
    console.log(code);
    await voteState.hydrateState();
    const lobby = voteState.aggregate;
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
    console.log("updated");
    await this.client.update(lobby);

    console.log("shouldTransition?");

    if (!voteState.shouldTransition()) return;
    if (IsCurrentNominationSuccess(voteState.aggregate.game)) {
      console.log("accepted, time to go on a quest");
      await voteState.transitionTo(new MissionState(code));
    } else {
      await voteState.transitionTo(new SetupState(code));
      console.log("rejected, time to pick again");
    }
    console.log("done");
  }
}
