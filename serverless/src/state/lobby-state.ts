import { Game } from "../schema/game";
import { GetNextNominator } from "../logic/game-logic";
import { Nomination } from "../schema/nomination";

function onLeaveLobby() {
  const game: Game = this.data;
  console.log("state lifecycle: onSetup");
  const nomination = new Nomination();
  {
    nomination.nominator = GetNextNominator(this.data);
  }
  game.GetCurrentMission().nominations[
    game.GetCurrentMission().counter
  ] = nomination;
}

export const LobbyStateMethods = (() => {
  return { onLeaveLobby: onLeaveLobby };
})();
