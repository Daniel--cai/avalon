import { Vote } from "./Vote";

export class Nomination {
  votes: Array<Vote>;
  nominees: string[];
  nominator: string;
}
