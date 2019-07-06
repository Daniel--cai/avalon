import { LobbyRepository } from "./client";
import * as AWS from "aws-sdk";
import { ApiGatewayManagementApi } from "serverless-offline";

export class Notification {
  private api: AWS.ApiGatewayManagementApi;
  private lobby: LobbyRepository;

  constructor() {
    this.api = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: process.env.ENDPOINT
    });

    this.lobby = new LobbyRepository();
  }

  broadcast = async (code: string, message: any) => {
    const lobby = await this.lobby.getByCode(code);

    const connections = lobby.getConnections() || [];
    const { type, ...body } = message;

    const payload = {
      action: message.type.toString(),
      payload: { ...body, type: type.toString() }
    };
    console.log("ready for payload");
    console.log(connections);
    connections.push("sgsdg");
    const sent = connections.map(async connectionId => {
      try {
        await this.api
          .postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify(payload)
          })
          .promise();
      } catch (e) {
        if (e.statusCode === 410) {
          //this.lobby.disconnect(connectionId);
        } else {
          throw e;
        }
      }
    });
    await Promise.all(sent);
  };

  send = async (connectionId: string, message: any) => {
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
        // this.lobby.disconnect(connectionId);
      } else {
        throw e;
      }
    }
  };
}
