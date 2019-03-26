import { useContext, useEffect, useReducer } from "react";
import EventStore from "../state/EventStore";
import { useGlobalState, GameStore } from "../state/GameStore";
import { GameState } from "../model/GameState";

const ActionReducer = (current: any, store: GameStore) => {
  console.log(current.type, current.type === "SelectTeam");
  if (current.type === "SelectTeam") {
    store.state = GameState.Setup;
  } else if (current.type === "VoteTeam") {
    store.state = GameState.Voting;
  } else if (current.type === "CompleteTeam") {
    store.state = GameState.Mission;
  } else if (current.type === "SelectMerlin") {
    store.state = GameState.Merlin;
  }
};

function actionReducer(state: GameStore, action: any) {
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
    default:
      return state;
  }
}

export const useEventHandler = () => {
  const eventStore = useContext(EventStore);
  let gameStore = useGlobalState();

  useEffect(() => {
    if (eventStore.events.length === 0) return;
    gameStore = actionReducer(
      gameStore,
      eventStore.events[eventStore.events.length - 1]
    );
    console.log("useEffect!");
  }, [eventStore.events.length]);
};

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
