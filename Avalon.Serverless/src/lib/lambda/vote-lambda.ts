import { Handler } from "aws-lambda";
import { LobbyRepository } from "../../shared/client";
import { Lobby } from "../../schema/lobby";
import { VoteState } from "../../state/vote-state";
import { VoteCommand } from "../../command/vote-commands";
import * as middy from "middy";
import { httpErrorHandler } from "middy/middlewares";

const voteHandlerFunction: Handler = async (event, context) => {
  try {
    const command = new VoteCommand();
    const { code, player, success } = JSON.parse(event.body);
    await command.receiveVote(code, player, success);

    const ok = {
      statusCode: 200,
      body: JSON.stringify(event.body)
    };
    return ok;
  } catch (ex) {
    console.log(ex);
    const error = {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
    return error;
  }
};

export const voteHandler = middy(voteHandlerFunction).use(httpErrorHandler());
