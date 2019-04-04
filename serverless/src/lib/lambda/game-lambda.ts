import { Handler } from "aws-lambda";

import { GameQuery } from "../../query/game-query";
import { NotFoundError } from "../../lib/error/not-found-error";
import { LobbyCommand } from "../../command";

export const gameHandler: Handler = async (event, context) => {
  try {
    const lobby = new LobbyCommand();

    const body = JSON.parse(event.body);

    const gameState = await lobby.startGame({
      type: "StartGameCommand",
      code: body.code
    });
    const success = {
      statusCode: 200,
      body: JSON.stringify(gameState)
    };
    return success;
  } catch (ex) {
    console.log("erro!");
    console.log(ex);
    return {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
  }
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
      console.log(ex);
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
