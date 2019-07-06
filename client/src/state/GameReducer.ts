import { useContext, useEffect, useReducer } from "react";
import EventStore from "../state/EventStore";
import { useGlobalState, GameStore } from "../state/GameStore";
import { GameState } from "../model/GameState";
import { Nomination } from "../model/Nomination";
import { Message } from "../../../shared/contract";
import { Mission } from "../model/Mission";

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

export function actionReducer(state: GameStore, action: Message): GameStore {
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
      console.log("playerconnected");
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

    case "TeamAccepted":
      if (state.state !== GameState.Voting) return state;
      return {
        ...state,
        state: GameState.Mission
      };
    case "TeamRejected":
      if (state.state !== GameState.Voting) return state;
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

    case "MissionSucceeded":
      if (state.state !== GameState.Mission) return state;
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

    case "MissionFailed":
      if (state.state !== GameState.Mission) return state;
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
    // case "MerlinFound":
    //   return {
    //     ...state,
    //     selected: string,
    //     merlin: string,
    //     player: string
    //   };

    // case "MerlinNotFound":
    //   return {
    //     ...state,
    //     selected: string,
    //     merlin: string,
    //     player: string
    //   };
    case "SetPlayer":
      return {
        ...state,
        player: action.player
      };
    default:
      return state;
  }
}
