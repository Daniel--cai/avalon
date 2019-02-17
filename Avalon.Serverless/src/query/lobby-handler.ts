import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Game } from "../schema/game";
import { Setup } from "../schema/setup";
export class LobbyQuery {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async getLobby(code: string) {
    return await this.client.getByCode(code);
  }
}
