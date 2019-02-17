import { attribute } from "@aws/dynamodb-data-mapper-annotations";

import { Vote } from "./vote";

export class Nomination {
  @attribute()
  votes: Array<Vote>;

  @attribute()
  nominees: string[];

  nominator: string;

  constructor() {
    this.votes = [];
    this.nominees = [];
    this.nominator = "";
  }
}
