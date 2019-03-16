import { Vote } from "./Vote";
import { Nomination } from "./Nomination";

export class Mission {
  success: boolean;
  nominations: Nomination[];
  quest: Vote[];
  round: number;
  quantity: number;
}
