import { LobbyRepository } from "./client";
import { Message } from "../lib/action";
import * as AWS from "aws-sdk";

export class Notification {
  private api: AWS.ApiGatewayManagementApi;
  private lobby: LobbyRepository;

  constructor(event: any) {
    this.api = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint:
        event.requestContext.domainName + "/" + event.requestContext.stage
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
