import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Vote {
  @attribute()
  player: string;

  @attribute()
  succeed: boolean;
}
