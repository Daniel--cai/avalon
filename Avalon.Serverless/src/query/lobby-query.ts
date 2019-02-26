import { LobbyRepository } from "../shared/client";

export class LobbyQuery {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async getPlayers(code: string) {
    const lobby = await this.client.getByCode(code);
    return lobby.players;
  }
}
