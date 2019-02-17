import { GameState } from "../model/state";

export interface StateMachine {
  onEnter: () => void;
  onTransition: () => void;
  shouldTransition: () => boolean;
  getRepository();
  changeState(stateFrom: GameState, stateTo: GameState);
}
