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

  async joinLobby(code: string, player: Player) {
    const setup = new LobbyState(code);
    const message = new LobbyJoinMessage();
    message.player = player.name;

    await setup.onReceiveMessage(message);
  }
}
