import { attribute } from "@aws/dynamodb-data-mapper-annotations";

import { Vote } from "./vote";

import { Nomination } from "./nomination";

export class Mission {
  @attribute()
  success: boolean | null;

  @attribute()
  nominations: Array<Nomination>;

  @attribute()
  quest: Array<Vote>;

  @attribute()
  round: number;

  @attribute()
  quantity: number;

  constructor() {
    this.success = null;

    this.nominations = [];
    this.quest = [];
    this.round = 0;
    this.quantity = 0;
  }

  GetCurrentNomination() {
    return this.nominations[this.nominations.length - 1];
  }

  GetCurrentQuest() {
    return this.quest;
  }
}
