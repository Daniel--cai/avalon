import { VoteState } from "../state/vote-state";
import { Command } from "./command";
import { QuestEvent } from "../state/quest-state";
type StateType = VoteState;

// export class CommandHandlerFactory {
//   public createEvent(command: Command): StateType {
//     switch (command.type) {
//       case VoteState.Type:
//         return new VoteState(command);
//       default:
//         throw Error("Invalid event type in payload");
//     }
//   }
// }
