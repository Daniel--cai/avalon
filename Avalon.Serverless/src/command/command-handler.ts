import { Command } from "./command";
import { Message } from "../message/message";
import { Player } from "../model/player";

export interface CommandHandler {
  onReceiveCommand: (command: Command) => void;
  broadcast: (message: Message) => void;
}
