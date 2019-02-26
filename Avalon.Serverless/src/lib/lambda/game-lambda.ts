import { Handler } from "aws-lambda";

import { GameCommand } from "../../command/game-command";

export const gameHandler: Handler = async (event, context) => {
  const game = new GameCommand();

  const body = JSON.parse(event.body);

  await game.startGame(body.code);
  const success = {
    statusCode: 200,
    body: JSON.stringify(body.code)
  };
  return success;
};
