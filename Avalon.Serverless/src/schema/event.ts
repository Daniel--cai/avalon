import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { Player } from "../model/player";

export class Event {
  @attribute()
  type: string;

  @attribute()
  payload: string;

  @attribute()
  player: string;

  @attribute()
  fulfilled: boolean;

  SetPayload(obj: object) {
    this.payload = JSON.stringify(obj);
  }

  GetPayload() {
    return JSON.parse(this.payload);
  }
}
