import { Handler } from "aws-lambda";

import { GameCommand } from "../../command/game-command";
import { GameQuery } from "../../query/game-query";
import { NotFoundError } from "../../error/not-found-error";

export const gameHandler: Handler = async (event, context) => {
  const game = new GameCommand();

  const body = JSON.parse(event.body);

  await game.startGame(body.code);
  const gameState = await new GameQuery().getGame(body.code);
  const success = {
    statusCode: 200,
    body: JSON.stringify(gameState)
  };
  return success;
};

export const gameGetHandler: Handler = async (event, context) => {
  const gameQuery = new GameQuery();
  const code = event.pathParameters.code;

  try {
    const gameState = await gameQuery.getGame(code);

    const success = {
      statusCode: 200,
      body: JSON.stringify(gameState)
    };
    return success;
  } catch (ex) {
    if (ex instanceof NotFoundError) {
      console.log(404);
      return {
        statusCode: 404,
        body: JSON.stringify(`Cannot find game ${code}`)
      };
    } else {
      console.log(500);
      return {
        statusCode: 500,
        body: JSON.stringify(ex.message)
      };
    }
  }
};
