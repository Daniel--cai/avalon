import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Event {
  @attribute()
  type: string;

  @attribute()
  payload: any;
}
