import * as AWS from "aws-sdk";
import { DataMapper, ItemNotFoundException } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { Lobby } from "../schema/lobby";
import { equals } from "@aws/dynamodb-expressions";
import { GameState } from "../model/state";
import { Mission } from "../schema/mission";
import { NotFoundError } from "../error/not-found-error";

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

  async put(lobby: Lobby) {
    return this.mapper.update(lobby);
  }

  async update(lobby: Lobby) {
    await this.mapper.update(lobby);
  }

  async getByCode(code: string) {
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

    if (result === null) throw new NotFoundError(`Cannot find lobby ${code}`);
    return result;
  }

  async getConnections(code: string) {
    let lobby = await this.getByCode(code);
    return lobby.connectionId;
  }

  async createMission(code: string, mission: Mission) {
    let lobby = await this.getByCode(code);
    lobby.game.missions = [...lobby.game.missions, mission];
    this.mapper.update(lobby);
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

  async changeState(code: string, newState: GameState) {
    const lobby = await this.getByCode(code);
    if (lobby !== null) {
      lobby.game.state = newState;
      this.mapper.update(lobby);
    }
  }
}
