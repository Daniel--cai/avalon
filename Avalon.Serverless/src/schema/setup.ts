import {
  attribute,
  autoGeneratedHashKey,
  rangeKey,
  hashKey,
  table,
  versionAttribute
} from "@aws/dynamodb-data-mapper-annotations";

export class Setup {
  @attribute()
  morgana: boolean;

  @attribute()
  merlin: boolean;

  @attribute()
  mordred: boolean;

  @attribute()
  oberon: boolean;
}
