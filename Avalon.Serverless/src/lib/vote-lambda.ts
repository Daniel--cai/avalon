import { Handler } from "aws-lambda";
import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import { VoteState, VoteCommand } from "../state/vote-state";

export const voteHandler: Handler = async (event, context) => {
  const command: VoteCommand = null;
  const handler = new VoteState(event.body);

  handler.onEnter();

  if (handler.shouldTransition()) {
    handler.onTransition();
  }
  const success = {
    statusCode: 200,
    body: JSON.stringify(event.body)
  };
  return success;
};
