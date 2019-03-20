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

  constructor(action?: ActionType, player?: string) {
    if (action != null) {
      this.type = action.type;
      this.payload = JSON.stringify(action);
      this.player = player;
      this.fulfilled = false;
    }
  }
}
