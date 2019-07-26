import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";
import { Mission } from "./mission";
import { GameState } from "../model/state";
import { Action, Event } from ".";
import { Player } from "./player";

export class Game {
  @attribute({ memberType: embed(Mission) })
  missions: Array<Mission>;

  @attribute()
  state: string;

  @attribute()
  round: number;

  @attribute({ memberType: embed(Event) })
  events: Array<Event>;

  @attribute({ memberType: embed(Action) })
  actions: Array<Action>;

  @attribute({ memberType: embed(Player) })
  players: Array<Player>;

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
    this.round = 0;
    this.events = [];
  }
  GetPreviousMission() {
    return this.missions[Math.max(this.GetRound() - 1, 0)];
  }
  GetCurrentMission() {
    return this.missions[this.GetRound()];
  }
  GetRound() {
    return this.round;
  }
}
