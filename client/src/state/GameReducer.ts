import { useContext, useEffect, useReducer } from "react";
import EventStore from "../state/EventStore";
import { GameStore } from "../state/GameStore";
import { GameState } from "../model/GameState";
import { Nomination } from "../model/Nomination";
import { Message } from "../../../shared/contract";
import { Mission } from "../model/Mission";
import { Event } from "../../../shared/contract/events";
import { Action } from "../../../shared/contract/actions";
export const actionReducer = (
  state: GameStore,
  dispatch: any,
  action: Event | Action
) => {
  console.log(action.type);
  console.log("actionReducer");
  switch (action.type) {
    case "SelectTeam":
      debugger;
      if (state.state !== GameState.Setup) return state;
      const missions = state.missions.map((mission, index) => {
        if (index !== state.round - 1) return mission;
        debugger;
        const nominations = [...mission.nominations];
        nominations[mission.counter].nominator = action.player;
        return {
          ...mission,
          nominations
        };
      });

      return {
        ...state,
        missions
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

    case "PlayerConnected":
      return {
        ...state,
        players: [...state.players, action.player]
      };

    case "PlayerDisconnected":
      return {
        ...state,
        players: state.players.filter(player => player.name === action.player)
      };

    case "TeamSelected":
      if (state.state !== GameState.Setup) return state;
      return {
        ...state,
        state: GameState.Voting,
        missions: state.missions.map((mission, index) => {
          if (index !== state.round - 1) return mission;
          debugger;
          const nominations = [...mission.nominations];
          nominations[mission.counter].nominees = action.players;
          nominations[mission.counter].nominator = action.player;
          return {
            ...mission,
            nominations
          };
        })
      };

    case "VoteSubmitted":
      if (state.state !== GameState.Voting) return state;
      return {
        ...state,
        missions: state.missions.map((mission, index) => {
          if (index !== state.round - 1) return mission;
          const nomination = mission.nominations[mission.counter].votes.push({
            player: action.player,
            succeed: false
          });

          return {
            ...mission,
            nomination
          };
        })
      };
    case "TeamComplete":
      if (state.state !== GameState.Voting) return state;
      if (action.success)
        return {
          ...state,
          state: GameState.Mission
        };
      else
        return {
          ...state,
          state: GameState.Setup,
          missions: state.missions.map((mission, index) => {
            if (index !== state.round - 1) return mission;
            debugger;
            return {
              ...mission,
              counter: mission.counter + 1
            };
          })
        };

    case "MissionComplete":
      if (state.state !== GameState.Mission) return state;
      if (action.success)
        return {
          ...state,
          state: GameState.Setup,
          round: state.round + 1,
          missions: state.missions.map((mission, index) => {
            if (index !== state.round - 1) return mission;
            return {
              ...mission,
              success: true
            };
          })
        };
      else
        return {
          ...state,
          state: GameState.Setup,
          round: state.round + 1,
          missions: state.missions.map((mission, index) => {
            if (index !== state.round - 1) return mission;
            return {
              ...mission,
              success: false
            };
          })
        };
    case "MissionSubmitted":
      if (state.state !== GameState.Mission) {
        alert("MissionSubmitted rejected. state:Mission !=  " + state.state);
        return state;
      }
      return {
        ...state,
        missions: state.missions.map((mission, index) => {
          if (index !== state.round - 1) return mission;
          return {
            ...mission,
            quest: [
              ...mission.quest.filter(q => q.player !== action.player),
              { player: action.player, succeed: false }
            ]
          };
        })
      };

    default:
      return state;
  }
};
