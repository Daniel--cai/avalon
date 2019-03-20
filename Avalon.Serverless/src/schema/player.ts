import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Player {
  @attribute()
  connectionId: string;

  @attribute()
  name: string;

  @attribute()
  number: number;
}
