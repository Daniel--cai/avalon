import { Vote } from "./Vote";
import { Nomination } from "./Nomination";

export interface Mission {
  success: boolean;
  nominations: Nomination[];
  quest: Vote[];
  round: number;
  quantity: number;
}
