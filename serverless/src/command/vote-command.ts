import { Vote } from "../schema/vote";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { SubmitVoteCommand } from "../../../shared/contract";
import { Command } from "./base-command";

export class VoteCommand extends Command {
  constructor() {
    super();
  }

  async submitVote(command: SubmitVoteCommand) {
    const lobby = await this.client.getByCode(command.code);
    if (lobby.game.state !== GameState.Voting) {
      throw new InvalidOperation("You cannot perform this action");
    }
    const vote = new Vote(command.player, command.success);

    lobby.game
      .GetCurrentMission()
      .GetCurrentNomination()
      .votes.push(vote);

    const state = new GameStateMachine(GameState.Voting);
    state.hydrate(lobby.game);
    state.voteCommand();

    await this.client.update(lobby);

    let connectionIds = lobby.players.map(player => player.connectionId);
    if (lobby.game.state === GameState.Mission.toString()) {
      await this.notifier.publish({
        data: {
          type: "TeamComplete",
          players: lobby.game.GetCurrentMission().GetCurrentNomination()
            .nominees,
          success: true
        },
        connectionId: connectionIds
      });
    } else if (lobby.game.state === GameState.Setup.toString()) {
      await this.notifier.publish({
        data: {
          type: "TeamComplete",
          players: lobby.game.GetCurrentMission().GetCurrentNomination()
            .nominees,
          success: false
        },
        connectionId: connectionIds
      });
    }
  }
}
