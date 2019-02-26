import { attribute } from "@aws/dynamodb-data-mapper-annotations";
// import uuidV4 = require("uuid/v4");

export class Player {
  @attribute()
  connectionId: string;

  @attribute()
  name: string;

  @attribute()
  number: number;
}
