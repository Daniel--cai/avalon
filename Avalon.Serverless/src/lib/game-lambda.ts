import { Handler } from "aws-lambda";

import { GameCommand } from "../command/game-command";

export const gameHandler: Handler = async (event, context) => {
  const game = new GameCommand();
  console.log();
  const code = event.body.code;
  await game.startGame(code);
  const success = {
    statusCode: 200,
    body: JSON.stringify(code)
  };
  return success;
};
