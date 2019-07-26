import { Lobby } from "../schema/lobby";
import { Player } from "../model/player";
import { GameState } from "../model/state";
import { InvalidOperation } from "../lib/error/invalid-operation";
import { GameStateMachine } from "../state-machine";
import { GetMissionQuantity } from "../logic/game-logic";
import { StartGameCommand } from "../../../shared/contract";
import { Command } from "./base-command";

export class LobbyCommand extends Command {
  constructor() {
    super();
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

  async joinLobby(code: string, player: string, connectionId: string) {
    const lobby = await this.client.getByCode(code);

    const exist = lobby.players.find(p => p.name === player);
    if (exist == null) {
      console.log("new player", player);
      const playerModel = new Player();
      playerModel.name = player;
      playerModel.number = lobby.getNumberOfPlayers();
      playerModel.connectionId = connectionId;

      const p2 = new Player();
      const p3 = new Player();
      const p4 = new Player();
      const p5 = new Player();

      p2.name = "2";
      p2.number = 2;
      p2.connectionId = connectionId;
      p3.name = "3";
      p3.number = 3;
      p3.connectionId = connectionId;
      p4.name = "4";
      p4.number = 4;
      p4.connectionId = connectionId;
      p5.name = "5";
      p5.number = 5;
      p5.connectionId = connectionId;
      lobby.players.push(playerModel);
      lobby.players.push(p2);
      lobby.players.push(p3);
      lobby.players.push(p4);
      lobby.players.push(p5);
    } else {
      console.log("existing player", player);
      exist.connectionId = connectionId;
    }

    let connectionIds = lobby.players.map(player => player.connectionId);

    // const message: LobbyJoinMessage = {
    //   type: "LobbyJoinMessage",
    //   player: player,
    //   payload: playerModel
    // };

    // lobby.events.push(message);
    await this.client.update(lobby);
    console.log("listing connectionIds");
    console.log(connectionIds);
    console.log("publihsing first message");
    console.log("checking: lobby.game.state2");

    //notify other players

    if (lobby.game.state === GameState.Lobby) {
      await this.notifier.publish({
        data: { type: "PlayerConnected", player },
        connectionId: connectionIds
      });
    } else {
      await this.notifier.publish({
        data: { type: "GameStarted", game: lobby.game },
        connectionId: [connectionId]
      });
    }
  }
}
