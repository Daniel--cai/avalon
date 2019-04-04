import { attribute } from "@aws/dynamodb-data-mapper-annotations";
import { Event as EventType } from "../../../shared/contract";

export class Event {
  @attribute()
  type: string;

  @attribute()
  payload: string;

  @attribute()
  player: string;

  constructor(event?: EventType, player?: string) {
    if (event != null) {
      this.type = event.type;
      this.payload = JSON.stringify(event);
      this.player = player;
    }
  }
}
