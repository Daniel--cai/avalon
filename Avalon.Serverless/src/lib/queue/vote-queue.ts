import { Handler } from "aws-lambda";

import { GameCommand } from "../../command/game-command";

export const voteQueue: Handler = async (event, context) => {
  const command = new VoteCommand();
  const { code, player, success } = event.body;
  command.receiveVote(code, player, success);
  const handler = new VoteState(event.body);

  handler.onEnter();

  if (handler.shouldTransition()) {
    handler.onTransition();
  }
  const ok = {
    statusCode: 200,
    body: JSON.stringify(event.body)
  };
  return ok;
};
