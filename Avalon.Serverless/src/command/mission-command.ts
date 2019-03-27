import { LobbyRepository } from "../shared/client";
import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { SubmitMissionCommand } from "../contract";

export class MissionCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async submitMission(command: SubmitMissionCommand) {
    const lobby = await this.client.getByCode(command.code);

    if (lobby.game.state !== GameState.Mission) {
      throw new InvalidOperation("You cannot perform this action");
    }

    const state = new GameStateMachine(GameState.Mission);

    state.hydrate(lobby.game);

    const vote = new Vote();
    vote.player = command.player;
    vote.succeed = command.success;

    lobby.game.GetCurrentMission().quest = lobby.game
      .GetCurrentMission()
      .quest.filter(q => q.player != command.player);
    lobby.game.GetCurrentMission().quest.push(vote);

    console.log("time to transition from Mission!");

    state.missionCommand();
    console.log("mission was a " + lobby.game.GetCurrentMission().success);
    await this.client.update(lobby);
  }
}
