import { LobbyRepository } from "../shared/client";

export class GameQuery {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async getGame(code: string) {
    const lobby = await this.client.getByCode(code);
    return lobby.game;
  }

  async getGameState(code: string) {
    const lobby = await this.client.getByCode(code);
    return lobby.game.state;
  }
}
