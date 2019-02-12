import * as AWS from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { Lobby } from "../schema/lobby";
import { equals } from "@aws/dynamodb-expressions";

export class LobbyRepository {
  private client: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient();
  }

  async create(lobby: Lobby) {
    const mapper = new DataMapper({
      client: new DynamoDB({
        region: "us-west-2",
        endpoint: process.env.DYNAMODB_ENDPOINT
      })
    });

    return mapper.put(lobby);
  }

  async getByCode(code: string) {
    const mapper = new DataMapper({
      client: new DynamoDB({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
      })
    });
    const result: Lobby[] = [];
    for await (const lobby of mapper.scan(Lobby, {
      filter: {
        ...equals(code),
        subject: "code"
      }
    })) {
      result.push(lobby);
    }
    return result;
  }

  async joinConnection(code: string, connectionId: string) {
    const mapper = new DataMapper({
      client: new DynamoDB({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
      })
    });
    let result: Lobby = null;
    for await (const lobby of mapper.scan(Lobby, {
      filter: {
        ...equals(code),
        subject: "code"
      }
    })) {
      result = lobby;
      break;
    }
    if (result !== null) {
      result.connectionId = [...result.connectionId, connectionId];
      mapper.update(result);
    }
    return result;
  }
}
