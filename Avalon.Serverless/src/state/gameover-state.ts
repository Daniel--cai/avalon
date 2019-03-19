import { Player } from "../model/player";
import { BaseState } from "./base-state";

import { GameState } from "../model/state";

export class GameOverState extends BaseState {
  public type: GameState = GameState.GameOver;

  constructor(code: string) {
    super(code);
  }
}
