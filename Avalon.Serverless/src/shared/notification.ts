import { LobbyRepository } from "./client";
import * as AWS from "aws-sdk";
import { Message } from "../message/message";

export class Notification {
  private api: AWS.ApiGatewayManagementApi;
  private lobby: LobbyRepository;

  constructor() {
    this.api = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: process.env.ENDPOINT
    });

    this.lobby = new LobbyRepository();
  }

  broadcast = async (code: string, message: Message) => {
    const connections = await this.lobby.getConnections(code);
    const payload = {
      action: message.type,
      payload: message
    };
    for await (const connectionId of connections) {
      try {
        await this.api
          .postToConnection({ ConnectionId: connectionId, Data: payload })
          .promise();
      } catch (e) {
        if (e.statusCode === 410) {
          this.lobby.disconnect(connectionId);
        } else {
          throw e;
        }
      }
    }
  };

  send = async (connectionId: string, message: Message) => {
    const payload = {
      action: message.type,
      payload: message
    };
    try {
      await this.api
        .postToConnection({ ConnectionId: connectionId, Data: payload })
        .promise();
    } catch (e) {
      if (e.statusCode === 410) {
        this.lobby.disconnect(connectionId);
      } else {
        throw e;
      }
    }
  };
}
