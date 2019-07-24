import { useContext, useEffect, useReducer } from "react";
import EventStore from "../state/EventStore";
import { GameStore as GameStoreModel } from "../state/GameStore";
import { GameState } from "../model/GameState";

// export const useActionHandler = () => {
//   const eventStore = useContext(EventStore);
//   // const gameStore = useGlobalState();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (eventStore.events.length === 0) return;
//     dispatch(eventStore.events[eventStore.events.length - 1]);
//   }, [eventStore.events.length]);
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
