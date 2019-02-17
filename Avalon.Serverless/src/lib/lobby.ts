import { Handler } from "aws-lambda";
import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";

const success = {
  statusCode: 200
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
  return success;
};
