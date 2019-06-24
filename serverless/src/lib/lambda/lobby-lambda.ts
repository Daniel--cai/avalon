import { Handler } from "aws-lambda";

import { LobbyCommand } from "../../command";
import { LobbyQuery } from "../../query/lobby-query";
import { NotFoundError } from "../error/not-found-error";

export const lobbyCreateHandler: Handler = async (event, context) => {
  try {
    const lobby = new LobbyCommand();
    const code = await lobby.createLobby();
    const success = {
      statusCode: 200,
      body: JSON.stringify(code)
    };
    return success;
  } catch (ex) {
    console.log(ex);
    return {
      statusCode: 400,
      body: JSON.stringify(ex)
    };
  }
};

export const lobbyJoinHandler: Handler = async (event, context) => {
  const lobby = new LobbyCommand();
  const { code, player } = JSON.parse(event.body);

  try {
    await lobby.joinLobby(code, player);
    await lobby.joinLobby(code, "player1");
    await lobby.joinLobby(code, "player2");
    await lobby.joinLobby(code, "player3");
    await lobby.joinLobby(code, "player4");
    const success = {
      statusCode: 200,
      body: JSON.stringify(code)
    };
    return success;
  } catch (ex) {
    if (ex instanceof NotFoundError) {
      console.log(404);
      return {
        statusCode: 404,
        body: JSON.stringify(`Cannot find lobby ${code}`)
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

export const getPlayers: Handler = async (event, context) => {
  const code = event.pathParameters.code;
  const players = await new LobbyQuery().getPlayers(code);
  const success = {
    statusCode: 200,
    body: JSON.stringify(players)
  };
  return success;
};

export const createLobby: Handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
      context: context
    })
  };

  return response;
};

export const GetLobby: Handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
      context: context
    })
  };

  return response;
};

export const connectionLobby: Handler = async (event, context) => {
  console.log("connected");
  if (event.requestContext.eventType === "CONNECT") {
    console.log("conection connected!");
  } else if (event.requestContext.eventType === "DISCONNECT") {
    console.log("conection disconnected!");
  }
  console.log(event.requestContext.connectionId);
  const response = {
    statusCode: 200
  };

  return response;
};
