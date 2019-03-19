import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Message {
  @attribute()
  type: string;

  @attribute()
  player: string;

  @attribute()
  payload: string;

  constructor() {
    this.player = "";
    this.payload = "{}";
  }
}
