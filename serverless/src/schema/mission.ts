import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { Nomination, Vote } from "./";

export class Mission {
  @attribute()
  success: boolean | null;

  @attribute()
  nominations: Array<Nomination>;

  @attribute()
  quest: Array<Vote>;

  @attribute()
  quantity: number;

  @attribute()
  twoFails: boolean;

  @attribute()
  counter: number;

  constructor() {
    this.success = null;
    this.nominations = [
      new Nomination(),
      new Nomination(),
      new Nomination(),
      new Nomination(),
      new Nomination()
    ];
    this.quest = [];
    this.quantity = 0;
    this.twoFails = false;
    this.counter = 0;
  }

  GetCurrentNomination() {
    return this.nominations[this.counter];
  }

  GetCurrentQuest() {
    return this.quest;
  }
}
