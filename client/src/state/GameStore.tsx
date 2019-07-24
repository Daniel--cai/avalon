import { observable, decorate } from "mobx";
import { Player } from "../model/Player";
import React, { createContext, useReducer, useContext } from "react";
import { Mission } from "../model/Mission";
import { actionReducer } from "./GameReducer";
import { Message } from "../../../shared/contract";
import { setGlobal } from "reactn";

export class GameStore {
  missions: Mission[] = [];
  state: string = "";
  code: string = "";
  players: Player[] = [];
  player: string = "";
  round: number = 1;
  loaded: boolean = false;
  message: string = "";
  events: any[] = [];
}

// export const useGlobalState = () => {
//   const [store, setStore] = setGlobal<GameStore>(initialState);
// };
