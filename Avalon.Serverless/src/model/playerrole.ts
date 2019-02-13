import { Player } from "../schema/player";
import { Role } from "./role";

export interface PlayerRole {
  player: Player;
  role: Role;
}
