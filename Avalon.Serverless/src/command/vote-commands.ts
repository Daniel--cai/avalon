import { LobbyRepository } from "../shared/client";
import { MissionState } from "../state/mission-state";
import { VoteState } from "../state/vote-state";
import { IsCurrentNominationSuccess } from "../logic/game-logic";
import { LobbyState } from "../state/lobby-state";

export class GameCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveVote(code: string, player: string, success: boolean) {
    const voteState = new VoteState(code);
    voteState.hydrateState();
    const missionState = new MissionState(code);
    if (IsCurrentNominationSuccess(voteState.aggregate.game)) {
      missionState.hydrateState();
      voteState.transitionTo(missionState);
    } else {
      voteState.transitionTo(voteState);
    }
  }
}
