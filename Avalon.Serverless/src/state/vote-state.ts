import { Player } from "../model/player";
import { BaseState } from "./base-state";

import { GameState } from "../model/state";
import { CommandHandler } from "../command/command-handler";

import { Command } from "../command/command";
import { Message } from "../message/message";

export interface VoteRequest {
  player: Player[];
}
export interface VoteCommand extends Command {
  success: boolean;
}

export interface VoteEventMessage extends Message {
  players: Player[];
  counter: number;
}

export class VoteState extends BaseState implements CommandHandler {
  public static Type: GameState = GameState.Voting;

  constructor(command: Command) {
    super(command);
  }
  onEnter() {}

  async onTransition() {
    //broadcast to people
  }

  async onReceiveCommand(command: Command) {
    if (this.shouldTransition()) {
      this.onTransition();
      this.changeState(VoteState.Type, VoteState.Type);
    }
  }

  shouldTransition(): boolean {
    if (this.getAggregate().gameState === null) return true;
  }
}
