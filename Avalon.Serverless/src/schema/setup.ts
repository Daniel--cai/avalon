import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Setup {
  @attribute()
  morgana: boolean;

  @attribute()
  merlin: boolean;

  @attribute()
  mordred: boolean;

  @attribute()
  oberon: boolean;

  @attribute()
  percival: boolean;

  constructor() {
    this.morgana = false;
    this.merlin = false;
    this.mordred = false;
    this.oberon = false;
    this.percival = false;
  }
}
