// import { Player } from "../model/player";

// export class Game extends Aggregate<GameEvent> implements GameResource {
//   mission: PlayerVote[][];
//   round: number;
//   votes: PlayerVote[][];
//   id: string;

//   constructor(code: string) {
//     super(code);
//   }

//   onMissionVoted(event: MissionVoteEvent) {}
// }

// interface PlayerVote {
//   player: Player;
//   vote: boolean;
// }

// interface GameResource extends Resource {
//   mission: Array<Array<PlayerVote>>;
//   round: number;
//   votes: Array<Array<PlayerVote>>;
// }
