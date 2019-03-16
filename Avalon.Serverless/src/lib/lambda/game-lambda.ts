import { Handler } from "aws-lambda";

import { GameCommand } from "../../command/game-command";
import { GameQuery } from "../../query/game-query";

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
    console.log(gameState);
    const success = {
      statusCode: 200,
      body: JSON.stringify(gameState)
    };
    return success;
  } catch (ex) {
    console.log(ex);
  }
};
