import { Lobby } from "../schema/lobby";
import { LobbyRepository } from "../shared/client";
import { GameState } from "../model/state";
import { Notification } from "../shared/notification";
import { Command } from "../command/command";
import { Message } from "../message/message";
import { StateMachine } from "./state-machine";
import { Event } from "../schema/event";

export class BaseState implements StateMachine {
  private code: string;
  public aggregate: Lobby;
  private client: LobbyRepository;
  private notification: Notification;
  private hydrated: boolean = false;
  public type: GameState = null;

  constructor(code: string) {
    this.client = new LobbyRepository();
    this.notification = new Notification();
    this.code = code;
  }

  //stub implementation
  public onEnter() {}
  public onTransition() {}
  public shouldTransition(): boolean {
    return true;
  }

  public getRepository() {
    return this.client;
  }

  public async hydrateState(aggregate: Lobby = null) {
    if (this.hydrated === true) return;
    if (aggregate === null) {
      this.aggregate = await this.client.getByCode(this.code);
    } else {
      this.aggregate = aggregate;
    }
    this.hydrated = true;
  }

  public async changeState(stateFrom: GameState, stateTo: GameState) {
    console.log("changeState: begin to " + stateTo);
    if (this.aggregate.game.state !== stateFrom) {
      throw Error(
        `Invalid transition from ${stateFrom} to ${stateTo} for Game ${
          this.aggregate.code
        } when currently ${this.aggregate.game.state}`
      );
    }
    this.aggregate.game.state = stateTo;
    await this.client.update(this.aggregate);
    // await this.client.changeState(this.aggregate.code, stateTo);
    console.log("changeState: finish to" + stateTo);
  }

  public async broadcast(message: Message) {
    //this.notification.broadcast(this.aggregate.code, message);
    const event: Event = new Event();
    event.SetPayload(message);

    this.aggregate.events = [...this.aggregate.events, event];
    await this.client.update(this.aggregate);
  }
}
