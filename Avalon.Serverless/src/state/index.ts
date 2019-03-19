export * from "./lobby-state";
export * from "./merlin-state";
export * from "./mission-state";
export * from "./quest-state";

import { SetupStateMethods } from "./setup-state";
import { VotingStateMethods } from "./vote-state";
import { MissionStateMethods } from "./mission-state";
import { LobbyStateMethods } from "./lobby-state";

export const AggregateStateEvent = {
  ...SetupStateMethods,
  ...VotingStateMethods,
  ...MissionStateMethods,
  ...LobbyStateMethods
};
