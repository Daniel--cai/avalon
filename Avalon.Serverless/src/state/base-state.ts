import { Lobby } from "../schema/lobby";
import { LobbyRepository } from "../shared/client";
import { GameState } from "../model/state";
import { Notification } from "../shared/notification";
import { Command } from "../command/command";
import { Message } from "../command/message";
import { StateMachine } from "./state-machine";

export class BaseState implements StateMachine {
  private command: Command;
  private aggregate: Lobby;
  private client: LobbyRepository;
  private notification: Notification;

  constructor(command: Command) {
    this.client = new LobbyRepository();
    this.notification = new Notification();
    this.command = command;
  }

  //stub implementation
  public onEnter() {
    throw Error("onEnter not implemented");
  }
  public onTransition() {
    throw Error("onTransition not implemented");
  }
  public shouldTransition(): boolean {
    throw Error("shouldTransition not implemented");
  }

  public async hydrateState() {
    this.aggregate = await this.client.getByCode(this.command.code);
  }

  public getAggregate() {
    return this.aggregate;
  }

  public getRepository() {
    return this.client;
  }

  public async changeState(stateFrom: GameState, stateTo: GameState) {
    if (this.aggregate.gameState !== stateFrom) {
      throw Error(
        `Invalid transition from ${stateFrom} to ${stateTo} for Game ${
          this.aggregate.code
        } when currently ${this.aggregate.gameState}`
      );
    }
    await this.client.changeState(this.aggregate.code, stateTo);
  }

  public async broadcast(message: Message) {
    this.notification.broadcast(this.aggregate.code, message);
  }
}
