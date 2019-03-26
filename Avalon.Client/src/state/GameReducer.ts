import { GameStore } from "./GameStore";
import { GameState } from "../model/GameState";

export function actionReducer(state: GameStore, action: any) {
  console.log("actionReducER!");
  switch (action.type) {
    case "SelectTeam":
      return {
        ...state,
        state: GameState.Setup
      };
    case "VoteTeam":
      return {
        ...state,
        state: GameState.Voting
      };
    case "CompleteTeam":
      return {
        ...state,
        state: GameState.Mission
      };
    case "SelectMerlin":
      return {
        ...state,
        state: GameState.Merlin
      };
    default: {
      console.log("default");
      return state;
    }
  }
}

export function eventReducer(state: GameStore, action: any) {
  console.log("actionReducER!");
  switch (action.type) {
    case "SelectTeam":
      return {
        ...state,
        state: GameState.Setup
      };
    case "VoteTeam":
      return {
        ...state,
        state: GameState.Voting
      };
    case "CompleteTeam":
      return {
        ...state,
        state: GameState.Mission
      };
    case "SelectMerlin":
      return {
        ...state,
        state: GameState.Merlin
      };
    default: {
      console.log("default");
      return state;
    }
  }
}
