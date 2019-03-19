import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";
import { Mission } from "./mission";
import { GameState } from "../model/state";
import { Message } from "./message";
import { Player } from "./player";

export class Game {
  @attribute({ memberType: embed(Mission) })
  missions: Array<Mission>;

  @attribute()
  state: string;

  @attribute({ memberType: embed(Message) })
  requests: Array<Request>;

  @attribute({ memberType: embed(Player) })
  players: Array<Player>;

  @attribute()
  round: number;

  constructor() {
    this.missions = [
      new Mission(),
      new Mission(),
      new Mission(),
      new Mission(),
      new Mission()
    ];
    this.state = GameState.Lobby;
    this.players = [];
    this.round = 1;
  }

  GetCurrentMission() {
    return this.missions[this.round - 1];
  }
}
