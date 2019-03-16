import { Mission } from "./Mission";

export interface Game {
  missions: Mission[];
  state: string;
}
