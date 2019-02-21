import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Game } from "../schema/game";
import { Setup } from "../schema/setup";
import { LobbyState } from "../state/lobby-state";
import { Player } from "../model/player";
import { Message } from "../message/message";
import { LobbyJoinMessage } from "../message/lobby-message";
import { MissionState } from "../state/mission-state";

export class MissionCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async createLobby() {
    const lobby = new Lobby();
    await this.client.create(lobby);
    return lobby.code;
  }

  async receiveMission(code: string, player: string, success: boolean) {
    const missionState = new MissionState(code);
    missionState.hydrateState();
    if (IsCurrentNominationSuccess(missionState.aggregate.game)) {
      missionState.hydrateState();
      voteState.transitionTo(missionState);
    } else {
      voteState.transitionTo(voteState);
    }
  }
}
