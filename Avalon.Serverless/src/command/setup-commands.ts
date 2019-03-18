import { LobbyRepository } from "../shared/client";
import { MissionState } from "../state/mission-state";
import { VoteState } from "../state/vote-state";
import { IsCurrentNominationSuccess } from "../logic/game-logic";
import { Vote } from "../schema/vote";

export class SetupCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveVote(code: string, player: string, success: boolean) {
    const voteState = new VoteState(code);
    console.log(code);
    await voteState.hydrateState();
    const lobby = voteState.aggregate;
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
      const missionState = new MissionState(code);
      console.log("vote");
      await missionState.hydrateState();
      await voteState.transitionTo(missionState);
    } else {
      await voteState.transitionTo(voteState);
      console.log("vote");
    }
    console.log("done");
  }
}
