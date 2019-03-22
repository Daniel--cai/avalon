import * as StateMachine from "javascript-state-machine";
import { GameState } from "../model/state";
import { Game } from "../schema/game";
import { AggregateStateEvent } from "../state";
import { handleTransition as HandleMissionTransition } from "../state/mission-state";

import { handleTransition as HandleVoteTransition } from "../state/vote-state";
export interface FiniteStateMachine {
  startGame: () => void;
  voteQuest: () => void;
  finishGame: () => void;
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
    try {
      this.statemachine = new StateMachine({
        init: current,
        transitions: [
          { name: "startGame", from: GameState.Lobby, to: GameState.Setup },
          {
            name: "voteQuest",
            from: GameState.Setup,
            to: GameState.Voting
          },
          {
            name: "finishGame",
            from: GameState.Mission,
            to: GameState.GameOver
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

  voteQuest() {
    this.statemachine.voteQuest();
  }

  finishGame() {
    this.statemachine.voteQuest();
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
