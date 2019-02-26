import { Handler } from "aws-lambda";
import { LobbyRepository } from "../../shared/client";
import { Lobby } from "../../schema/lobby";
import { VoteState } from "../../state/vote-state";
import { VoteCommand } from "../../command/vote-commands";

export const voteHandler: Handler = async (event, context) => {
  const command = new VoteCommand();
  const { code, player, success } = event.body;
  command.receiveVote(code, player, success);
  const handler = new VoteState(event.body);

  await handler.onEnter();

  if (handler.shouldTransition()) {
    await handler.onTransition();
  }
  const ok = {
    statusCode: 200,
    body: JSON.stringify(event.body)
  };
  return ok;
};
