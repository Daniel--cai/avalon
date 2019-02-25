import { Handler } from "aws-lambda";

import { LobbyCommand } from "../command/lobby-command";

export const lobbyHandler: Handler = async (event, context) => {
  const lobby = new LobbyCommand();
  const code = await lobby.createLobby();
  const success = {
    statusCode: 200,
    body: JSON.stringify(code)
  };
  return success;
};
