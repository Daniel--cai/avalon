import { Lobby } from "../schema/lobby";
import { LobbyRepository } from "../shared/client";

export class Aggregate {
  private lobby: Lobby;
  private repository: LobbyRepository;

  constructor() {
    this.repository = new LobbyRepository();
  }

  public async Resolve(code: string) {
    const lobby = await this.repository.getByCode(code);
    const gameState = lobby.
    }
}
