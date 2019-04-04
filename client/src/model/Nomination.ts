import { Vote } from "./Vote";

export interface Nomination {
  votes: Vote[];
  nominees: string[];
  nominator: string;
}
