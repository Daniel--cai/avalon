import * as StateMachine from "javascript-state-machine";
import { GameState } from "../model/state";
import { Game } from "../schema/game";
import { AggregateStateEvent } from "../state";
import { handleTransition as HandleMissionTransition } from "../state/mission-state";

import { handleTransition as HandleVoteTransition } from "../state/vote-state";
export interface FiniteStateMachine {
  startGame: () => void;
  voteNomination: () => void;
  rejectNomination: () => void;
  acceptNomination: () => void;
  finishMission: () => void;
  finishGame: () => void;
  chooseMerlin: () => void;
  voteCommand: (command: any) => void;
  missionCommand: (command: any) => void;
  getGameData: () => Game;
}

export interface Lifecycle {
  transition: "string";
  from: GameState;
  to: GameState;
}

export class GameStateMachine implements FiniteStateMachine {
  statemachine: any;

  constructor(current: GameState = GameState.Lobby) {
    console.log("constrcutor");
    console.log(current);
    try {
      this.statemachine = new StateMachine({
        init: current,
        transitions: [
          { name: "startGame", from: GameState.Lobby, to: GameState.Setup },
          {
            name: "voteNomination",
            from: GameState.Setup,
            to: GameState.Voting
          },
          {
            name: "rejectNomination",
            from: GameState.Voting,
            to: GameState.Setup
          },
          {
            name: "acceptNomination",
            from: GameState.Voting,
            to: GameState.Mission
          },
          {
            name: "finishMission",
            from: GameState.Mission,
            to: GameState.Setup
          },
          {
            name: "finishGame",
            from: GameState.Mission,
            to: GameState.GameOver
          },
          {
            name: "chooseMerlin",
            from: GameState.Mission,
            to: GameState.Merlin
          },
          {
            name: "finishGame",
            from: GameState.Merlin,
            to: GameState.GameOver
          },
          {
            name: "missionCommand",
            from: GameState.Mission,
            to: HandleMissionTransition
          },
          {
            name: "voteCommand",
            from: GameState.Voting,
            to: HandleVoteTransition
          }
        ],
        methods: {
          ...AggregateStateEvent,
          onTransition: function(lifecycle: Lifecycle) {
            console.log(
              `from ${lifecycle.from} to ${lifecycle.to} through ${
                lifecycle.transition
              }`
            );
            if (this.data === null || this.state === "none") {
              console.log("data not hydrated");
            } else {
              console.log(
                `setting state to from ${this.data.state} to ${lifecycle.to}`
              );
              this.data.state = lifecycle.to;
            }
          }
        }
      });

      console.log(`constructing with init state ${this.statemachine.state}`);

      this.statemachine.observe({
        onStartGame: () => {
          console.log("state method: onStartGame!");
        },
        onCommand: () => {
          console.log("state method: onCommand!");
        },

        onMission: () => {
          console.log("state lifecycle: onMission");
        }
      });
    } catch (ex) {
      console.log("exception in constructor");
      console.log(ex);
    }
  }

  hydrate(game: Game) {
    console.log(`currently ${this.statemachine.state}, hydrating now`);
    this.statemachine.data = game;
  }
  startGame() {
    this.statemachine.startGame();
  }

  voteNomination() {
    this.statemachine.voteNomination();
  }
  rejectNomination() {
    this.statemachine.rejectNomination();
  }
  acceptNomination() {
    this.statemachine.acceptNomination();
  }
  finishMission() {
    this.statemachine.finishMission();
  }
  finishGame() {
    this.statemachine.finishGame();
  }
  chooseMerlin() {
    this.statemachine.chooseMerlin();
  }

  missionCommand(command: any = null) {
    this.statemachine.missionCommand(command);
  }
  voteCommand(command: any = null) {
    this.statemachine.voteCommand(command);
  }

  setData(data) {
    this.statemachine.data = data;
  }
  getGameData(): Game {
    return this.statemachine.data;
  }

  getState() {
    return this.statemachine.state;
  }
}

function commandHandlerFactory(command: any) {
  console.log("commandHandlerFactory");
  console.log(command);
  console.log(this.state);
  return GameState.Mission;
}
