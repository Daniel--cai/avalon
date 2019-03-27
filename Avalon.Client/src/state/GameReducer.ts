import { GameStore } from "./GameStore";
import { GameState } from "../model/GameState";
import { Nomination } from "../model/Nomination";

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

export function actionReducer(state: GameStore, action: any): GameStore {
  console.log("reducer");
  console.log(action.type);
  switch (action.type) {
    case "SelectTeam":
      const missions = [...state.missions];
      const nomination: Nomination = {
        nominator: action.player,
        nominees: [],
        votes: []
      };
      missions[state.round - 1].nominations.push(nomination);

      return {
        ...state,
        state: GameState.Setup,
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
      return {
        ...state,
        state: GameState.Voting,
        missions: state.missions.map((mission, index) => {
          if (index !== state.round - 1) return mission;
          debugger;
          const nominations = [...mission.nominations];
          nominations[nominations.length - 1].nominees = action.players;
          nominations[nominations.length - 1].nominator = action.player;
          return {
            ...mission,
            nominations
          };
        })
      };

    case "VoteSubmitted":
      return {
        ...state,
        missions: state.missions.map((mission, index) => {
          if (index !== state.round - 1) return mission;
          const nomination = mission.nominations[
            mission.nominations.length - 1
          ].votes.push({ player: action.player, succeed: false });

          return {
            ...mission,
            nomination
          };
        })
      };

    case "TeamAccepted":
      return {
        ...state,
        state: GameState.Mission
      };

    case "TeamRejected":
      return {
        ...state,
        state: GameState.Setup
      };

    case "MissionSubmitted":
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
      return {
        ...state,
        state: GameState.Setup,
        round: state.round + 1,
        missions: state.missions.map((mission, index) => {
          if (index !== action.round) return mission;
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
    default:
      return state;
  }
}
