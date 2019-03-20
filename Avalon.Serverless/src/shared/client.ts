import * as AWS from "aws-sdk";
import { DataMapper, ItemNotFoundException } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { Lobby } from "../schema/lobby";
import { equals } from "@aws/dynamodb-expressions";
import { GameState } from "../model/state";
import { NotFoundError } from "../lib/error/not-found-error";

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
    return await this.mapper.put(lobby);
  }

  async put(lobby: Lobby) {
    return await this.mapper.update(lobby);
  }

  async update(lobby: Lobby) {
    await this.mapper.update(lobby);
  }

  async getByCode(code: string) {
    let result: Lobby = null;
    const lobbies = await this.mapper.scan(Lobby, {
      filter: {
        ...equals(code),
        subject: "code"
      }
    });
    for await (const lobby of lobbies) {
      result = lobby;
    }

    if (result === null) throw new NotFoundError(`Cannot find lobby ${code}`);
    return result;
  }
}
