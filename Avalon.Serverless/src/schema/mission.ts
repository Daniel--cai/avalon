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

  constructor() {
    this.success = null;
    this.nominations = [];
    this.quest = [];
    this.quantity = 3;
    this.twoFails = false;
  }

  GetCurrentNomination() {
    return this.nominations[this.nominations.length - 1];
  }

  GetCurrentQuest() {
    return this.quest;
  }
}
