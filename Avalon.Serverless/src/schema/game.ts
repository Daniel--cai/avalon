import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";
import { Mission } from "./mission";
import { GameState } from "../model/state";
import { Message } from "./message";

export class Game {
  @attribute({ memberType: embed(Mission) })
  missions: Array<Mission>;

  @attribute()
  state: string;

  @attribute({ memberType: embed(Message) })
  requests: Array<Request>;

  constructor() {
    this.missions = [];
    this.state = GameState.Lobby;
  }

  GetCurrentMission() {
    return this.missions[this.missions.length - 1];
  }
}
