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
  public type: GameState = GameState.GameOver;

  constructor(code: string) {
    this.client = new LobbyRepository();
    this.notification = new Notification();
    this.code = code;
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

  public getRepository() {
    return this.client;
  }

  public async hydrateState() {
    console.log(`to hydrate state ${!this.hydrated}`);
    if (!this.hydrated) {
      this.aggregate = await this.client.getByCode(this.code);

      this.hydrated = true;
      console.log(`hydrated state code ${this.code}`);
    }
  }

  public async changeState(stateFrom: GameState, stateTo: GameState) {
    if (this.aggregate.game.state !== stateFrom) {
      throw Error(
        `Invalid transition from ${stateFrom} to ${stateTo} for Game ${
          this.aggregate.code
        } when currently ${this.aggregate.game.state}`
      );
    }
    await this.client.changeState(this.aggregate.code, stateTo);
  }

  public async broadcast(message: Message) {
    this.notification.broadcast(this.aggregate.code, message);
    const event: Event = {
      type: message.type.toString(),
      payload: message
    };
    this.aggregate.events = [...this.aggregate.events, event];
    this.client.update(this.aggregate);
  }
}
