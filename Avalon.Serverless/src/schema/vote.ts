import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Vote {
  @attribute()
  player: string;

  @attribute()
  succeed: boolean;

  constructor(player?: string, succeed?: boolean) {
    this.player = player;
    this.succeed = succeed;
  }
}
