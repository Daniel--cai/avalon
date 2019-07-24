import { useContext, useEffect, useReducer } from "react";
import EventStore from "../state/EventStore";
import { GameStore } from "../state/GameStore";
import { GameState } from "../model/GameState";
import { useGlobal } from "reactn";

export function reducer(state: GameStore, action: any): GameStore {
  console.log("reducer");
  switch (action.type) {
    // case "SelectTeam":
    //   return {
    //     ...state,
    //     state: GameState.Setup
    //   };
    // case "VoteTeam":
    //   return {
    //     ...state,
    //     state: GameState.Voting
    //   };
    // case "CompleteTeam":
    //   return {
    //     ...state,
    //     state: GameState.Mission
    //   };
    // case "SelectMerlin":
    //   return {
    //     ...state,
    //     state: GameState.Merlin
    //   };

    // case "PlayerConnected":
    //   return {
    //     ...state,
    //     players: [...state.players, action.player]
    //   };

    // case "PlayerDisconnected":
    //   return {
    //     ...state,
    //     players: state.players.filter(player => player.name === action.player)
    //   };

    // case "TeamSelected":
    //   return {
    //     ...state,
    //     state: GameState.Voting,
    //     missions: state.missions.map((mission, index) => {
    //       if (index !== state.round - 1) return mission;
    //       debugger;
    //       const nominations = [...mission.nominations];
    //       nominations[nominations.length - 1].nominees = action.players;
    //       nominations[nominations.length - 1].nominator = action.player;
    //       return {
    //         ...mission,
    //         nominations
    //       };
    //     })
    //   };

    // case "VoteSubmitted":
    //   return {
    //     ...state,
    //     missions: state.missions.map((mission, index) => {
    //       if (index !== state.round - 1) return mission;
    //       const nomination = mission.nominations[
    //         mission.nominations.length - 1
    //       ].votes.push({ player: action.player, succeed: false });

    //       return {
    //         ...mission,
    //         nomination
    //       };
    //     })
    //   };

    // case "TeamAccepted":
    //   return {
    //     ...state,
    //     state: GameState.Mission
    //   };

    // case "TeamRejected":
    //   return {
    //     ...state,
    //     state: GameState.Setup
    //   };

    // case "MissionSubmitted":
    //   return {
    //     ...state,
    //     missions: state.missions.map((mission, index) => {
    //       if (index !== state.round - 1) return mission;

    //       return {
    //         ...mission,
    //         quest: [
    //           ...mission.quest.filter(q => q.player !== action.player),
    //           { player: action.player, succeed: false }
    //         ]
    //       };
    //     })
    //   };

    // case "MissionSucceeded":
    //   return {
    //     ...state,
    //     state: GameState.Setup,
    //     round: state.round + 1,
    //     missions: state.missions.map((mission, index) => {
    //       if (index !== state.round - 1) return mission;
    //       return {
    //         ...mission,
    //         success: true
    //       };
    //     })
    //   };

    // case "MissionFailed":
    //   return {
    //     ...state,
    //     state: GameState.Setup,
    //     round: state.round + 1,
    //     missions: state.missions.map((mission, index) => {
    //       if (index !== action.round) return mission;
    //       return {
    //         ...mission,
    //         success: false
    //       };
    //     })
    //   };

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
    default:
      return state;
  }
}

// export const useEventHandler = () => {
//   let [store, setStore] = useGlobal<GameStore>();

//   useEffect(() => {
//     if (store.events.length === 0) return;
//     gameStore = reducer(
//       gameStore,
//       eventStore.events[eventStore.events.length - 1]
//     );
//     console.log("useEffect!");
//   }, [store.events.length]);
// };

//       type: "PlayerConnected",
//       player: string
//     }
//   | {
//       type: "PlayerDisconnected",
//       player: string
//     }
//   | {
//       type: "TeamSelected",
//       player: string,
//       players: string[]
//     }
//   | {
//       type: "TeamAccepted",
//       players: string[]
//     }
//   | {
//       type: "TeamRejected",
//       players: string[]
//     }
//   | {
//       type: "MissionSucceeded",
//       success: boolean,
//       round: number
//     }
//   | {
//       type: "MissionFailed",
//       success: boolean,
//       round: number
//     }
//   | {
//       type: "MerlinFound",
//       selected: string,
//       merlin: string,
//       player: string
//     }
//   | {
//       type: "MerlinNotFound",
//       selected: string,
//       merlin: string,
//       player: string
//     };
