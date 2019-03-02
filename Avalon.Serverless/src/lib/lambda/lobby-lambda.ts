import { Handler } from "aws-lambda";

import { LobbyCommand } from "../../command/lobby-command";
import { LobbyQuery } from "../../query/lobby-query";

export const lobbyCreateHandler: Handler = async (event, context) => {
  const lobby = new LobbyCommand();
  const code = await lobby.createLobby();
  const success = {
    statusCode: 200,
    body: JSON.stringify(code)
  };
  return success;
};

export const lobbyJoinHandler: Handler = async (event, context) => {
  const lobby = new LobbyCommand();
  const { code, player } = JSON.parse(event.body);

  await lobby.joinLobby(code, player);
  const success = {
    statusCode: 200,
    body: JSON.stringify(code)
  };
  return success;
};

export const getPlayers: Handler = async (event, context) => {
  const lobby = new LobbyQuery();
  const code = event.pathParameters.code;
  const players = await lobby.getPlayers(code);
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
