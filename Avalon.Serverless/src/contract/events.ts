export type Event =
  | {
      type: "PlayerConnected";
      player: string;
    }
  | {
      type: "PlayerDisconnected";
      player: string;
    }
  | {
      type: "TeamSelected";
      player: string;
      players: string[];
    }
  | {
      type: "TeamAccepted";
      players: string[];
    }
  | {
      type: "TeamRejected";
      players: string[];
    }
  | {
      type: "MissionSucceeded";
      success: boolean;
      round: number;
    }
  | {
      type: "MissionFailed";
      success: boolean;
      round: number;
    }
  | {
      type: "MerlinFound";
      selected: string;
      merlin: string;
      player: string;
    }
  | {
      type: "MerlinNotFound";
      selected: string;
      merlin: string;
      player: string;
    };
