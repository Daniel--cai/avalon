import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";
import { Mission } from "./mission";
import { GameState } from "../model/state";
export class Game {
  @attribute({ memberType: embed(Mission) })
  missions: Array<Mission>;

  @attribute()
  state: string;

  constructor() {
    this.missions = [];
    this.state = GameState.Lobby;
  }

  GetCurrentMission() {
    console.log(this.missions);
    return this.missions[this.missions.length - 1];
  }
}
