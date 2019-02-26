import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Game } from "../schema/game";
import { Setup } from "../schema/setup";
import { LobbyState } from "../state/lobby-state";
import { Player } from "../model/player";
import { Message } from "../message/message";
import { LobbyJoinMessage } from "../message/lobby-message";

export class LobbyCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async createLobby() {
    const lobby = new Lobby();
    await this.client.create(lobby);
    return lobby.code;
  }

  async getPlayers(code: string) {
    const lobby = await this.client.getByCode(code);
    return lobby.players;
  }

  async joinLobby(code: string, player: Player) {
    const setup = new LobbyState(code);
    await setup.hydrateState();
    console.log("hydrated");
    const message = new LobbyJoinMessage();
    message.player = player.name;
    const lobby = setup.aggregate;
    const playerModel = new Player();
    playerModel.name = player.name;
    playerModel.number = 1;
    playerModel.connectionId = "thlkjslf";
    lobby.players.push(playerModel);
    this.client.update(lobby);

    await setup.broadcast(message);
  }
}

// const voteState = new VoteState(code);
// voteState.hydrateState();
// const missionState = new MissionState(code);
// if (
//   voteState.shouldTransition() &&
//   IsCurrentNominationSuccess(voteState.aggregate.game)
// ) {
//   missionState.hydrateState();
//   voteState.transitionTo(missionState);
// } else {
//   voteState.transitionTo(voteState);
// }
