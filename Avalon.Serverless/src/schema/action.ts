import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { Action as ActionType } from "../contract";
export class Action {
  @attribute()
  type: string;

  @attribute()
  player: string;

  @attribute()
  payload: string;

  @attribute()
  fulfilled: boolean;

  constructor() {
    this.type = "";
    this.payload = "";
    this.player = "";
    this.fulfilled = false;
  }
}
