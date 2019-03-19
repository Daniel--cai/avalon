import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Player } from "../model/player";

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

  async joinLobby(code: string, player: string) {
    const lobby = await this.client.getByCode(code);
    const playerModel = new Player();

    playerModel.name = player;
    playerModel.number = lobby.getNumberOfPlayers();
    playerModel.connectionId = "thlkjslf";
    lobby.players.push(playerModel);

    // const message: LobbyJoinMessage = {
    //   type: "LobbyJoinMessage",
    //   player: player,
    //   payload: playerModel
    // };

    // lobby.events.push(message);
    await this.client.update(lobby);
  }
}
