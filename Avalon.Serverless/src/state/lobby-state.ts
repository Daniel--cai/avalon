import { Game } from "../schema/game";
import { GetNextNominator } from "../logic/game-logic";
import { Nomination } from "../schema/nomination";

function onLeaveLobby() {
  const game: Game = this.data;
  console.log("state lifecycle: onSetup");
  const nominator = GetNextNominator(this.data);
  const nomination = new Nomination();
  {
    nomination.nominator = nominator;
  }
  game.GetCurrentMission().nominations.push(nomination);
}

export const LobbyStateMethods = (() => {
  return { onLeaveLobby: onLeaveLobby };
})();
