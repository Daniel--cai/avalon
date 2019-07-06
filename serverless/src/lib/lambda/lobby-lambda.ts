import { Handler } from "aws-lambda";

import { LobbyCommand } from "../../command";
import { LobbyQuery } from "../../query/lobby-query";
import { NotFoundError } from "../error/not-found-error";

export const lobbyCreateHandler: Handler = async (event, context) => {
  console.log("create");
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

export const lobbyConnectHandler: Handler = async (event, context) => {
  console.log("connect");
  const success = {
    statusCode: 200
  };
  return success;
};

export const lobbyJoinHandler: Handler = async (event, context) => {
  try {
    console.log("joined!");
    console.log("querystring");
    console.log(event.queryStringParameters.code);
    console.log(event.queryStringParameters.player);
    const lobby = new LobbyCommand();
    console.log(event.apiGatewayUrl);
    console.log("join");
    const { code, player } = event.queryStringParameters;
    const { code2, player2 } = event.queryStringParameters;
    await lobby.joinLobby(code, player, event.requestContext.connectionId);

    console.log("finish");
    const success = {
      statusCode: 200
    };
    return success;
  } catch (ex) {
    if (ex instanceof NotFoundError) {
      console.log(404);
      return {
        statusCode: 404,
        body: JSON.stringify(`Cannot find lobby`)
      };
    } else {
      console.log(ex);
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
    const lobby = new LobbyCommand();
    // lobby.connectLobby(event.requestContext.connectionId);
  } else if (event.requestContext.eventType === "DISCONNECT") {
    console.log("conection disconnected!");
  } else {
    console.log(event.requestContext);
  }
  console.log(event.requestContext.connectionId);
  const response = {
    statusCode: 200
  };

  return response;
};
