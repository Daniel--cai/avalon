import { LobbyRepository } from "../shared/client";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../error/invalid-operation";
import { GameStateMachine } from "../state-machine";

export class MissionCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async receiveMission(code: string, player: string, success: boolean) {
    const lobby = await this.client.getByCode(code);

    if (lobby.game.state !== GameState.Mission) {
      throw new InvalidOperation("You cannot perform this action");
    }

    const state = new GameStateMachine(GameState.Mission);

    state.hydrate(lobby.game);

    const vote = new Vote();
    vote.player = player;
    vote.succeed = success;

    lobby.game.GetCurrentMission().quest.push(vote);

    console.log("time to transition from Mission!");

    state.missionCommand();
    console.log("mission was a " + lobby.game.GetCurrentMission().success);
    await this.client.update(lobby);
  }
}
