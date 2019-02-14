import * as AWS from "aws-sdk";
import { DataMapper, ItemNotFoundException } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { Lobby } from "../schema/lobby";
import { equals } from "@aws/dynamodb-expressions";

export class LobbyRepository {
  private mapper: DataMapper;

  constructor() {
    this.mapper = new DataMapper({
      client: new DynamoDB({
        region: "us-west-2",
        endpoint: process.env.DYNAMODB_ENDPOINT
      })
    });
  }

  async create(lobby: Lobby) {
    return this.mapper.put(lobby);
  }

  async getByCode(code: string) {
    const mapper = new DataMapper({
      client: new DynamoDB({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
      })
    });
    let result: Lobby = null;
    const lobbies = this.mapper.scan(Lobby, {
      filter: {
        ...equals(code),
        subject: "code"
      }
    });
    for await (const lobby of lobbies) {
      result = lobby;
    }
    if (result === null) throw new Error(`Cannot find lobby ${code}`);
    return result;
  }

  async getConnections(code: string) {
    let lobby = await this.getByCode(code);
    return lobby.connectionId;
  }

  async disconnect(connectionId: string) {}

  async connect(code: string, connectionId: string) {
    let result: Lobby = null;
    result = await this.getByCode(code);

    if (result !== null) {
      result.connectionId = [...result.connectionId, connectionId];
      this.mapper.update(result);
    }
    return result;
  }
}
