import { LobbyRepository } from "../shared/client";
import { Lobby } from "../schema/lobby";
import * as moment from "moment";
import { Player } from "../model/player";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { GetMissionQuantity } from "../logic/game-logic";
import { StartGameCommand } from "../contract";

export class LobbyCommand {
  private client: LobbyRepository;

  constructor() {
    this.client = new LobbyRepository();
  }

  async createLobby() {
    const lobby = new Lobby();
    await this.client.create(lobby);
    return lobby.code;
  }

  async startGame(command: StartGameCommand) {
    console.log("stating game " + command.code);
    const lobby = await this.client.getByCode(command.code);

    if (lobby.game.state !== GameState.Lobby) {
      throw new InvalidOperation("You cannot perform this action");
    }

    const state = new GameStateMachine(GameState.Lobby);
    state.hydrate(lobby.game);
    lobby.game.players = [...lobby.players];

    const missionQuantity = GetMissionQuantity(lobby.game);
    console.log(missionQuantity);
    for (let index = 0; index < 5; index++) {
      lobby.game.missions[index].quantity = missionQuantity[index];
    }
    state.startGame();
    await this.client.update(lobby);
    return lobby.game;
  }

  async joinLobby(code: string, player: string) {
    const lobby = await this.client.getByCode(code);
    const playerModel = new Player();

    playerModel.name = player;
    playerModel.number = lobby.getNumberOfPlayers();
    playerModel.connectionId = "thlkjslf";
    lobby.players.push(playerModel);

    // const message: LobbyJoinMessage = {
    //   type: "LobbyJoinMessage",
    //   player: player,
    //   payload: playerModel
    // };

    // lobby.events.push(message);
    await this.client.update(lobby);
  }
}
