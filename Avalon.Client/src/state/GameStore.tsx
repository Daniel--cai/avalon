import { observable, decorate } from "mobx";
import { Player } from "../model/Player";
import React, { createContext, useReducer, useContext } from "react";
import { Mission } from "../model/Mission";
import { actionReducer } from "./GameReducer";

export class GameStore {
  missions: Mission[] = [];
  state: string = "";
  code: string = "";
  players: Player[] = [];
  player: string = "";
  round: number = 1;
  loaded: boolean = false;
  message: string = "";
}

decorate(GameStore, {
  missions: observable,
  state: observable,
  code: observable,
  players: observable,
  player: observable,
  round: observable,
  loaded: observable,
  message: observable
});

const initialState = new GameStore();

const dispatchAction: React.Dispatch<Partial<{ type: string }>> = () => {};
const dispatchContext = createContext(dispatchAction);
const stateContext = createContext(initialState);

export const Provider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(actionReducer, initialState);
  return (
    <dispatchContext.Provider value={dispatch}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </dispatchContext.Provider>
  );
};

export const useDispatch = () => {
  return useContext(dispatchContext);
};

export const useGlobalState = () => {
  return useContext(stateContext);
};
