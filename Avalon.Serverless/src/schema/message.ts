import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Message {
  @attribute()
  type: string;

  @attribute()
  player: string;

  @attribute()
  fulfilled: boolean;

  @attribute()
  payload: string;

  constructor() {
    this.player = "";
    this.fulfilled = false;
  }

  SetPayload(obj: object) {
    this.payload = JSON.stringify(obj);
  }

  GetPayload() {
    return JSON.parse(this.payload);
  }
}
