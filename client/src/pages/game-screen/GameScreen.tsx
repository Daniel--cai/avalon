import React, { useEffect } from "react";
import Api from "../../framework/api";
import { Game } from "../../model/Game";

import { VoteTeam, Setup, CompleteMission } from "../../components/actions";
import { PlayerSwitcher } from "../../components/test-helpers";
import { Progress } from "../../components/progress";

import { PlayerList } from "../../components/player-list";
import { GameState } from "../../model/GameState";
import { GameBoard } from "../../components/game-board";
import { useGlobal, setGlobal } from "reactn";
import { GameStore } from "../../state/GameStore";

interface GameScreenProps {
  code: string;
  name: string;
}

export const GameScreen = (props: GameScreenProps) => {
  const [store, setStore] = useGlobal<GameStore>();
  console.log("GameScreen rerenedered");
  console.log(props.code);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get(`/game/${props.code}`);
        console.log(response.data);
        const game: Game = response.data;
        setGlobal(s => ({
          ...game,
          code: props.code,
          player: props.name,
          loaded: true
        }));
        // setLoaded(true);
        console.log(store.player);
      } catch (ex) {
        console.log(ex);
        //store.loaded = false;
      }
    }
    fetchData();
  }, []);
  if (!store.loaded) return <div>Loading...</div>;
  return (
    <div>
      <p>player: {store.player}</p>
      <GameBoard
        game={{
          missions: store.missions,
          state: store.state,
          players: store.players,
          round: store.round
        }}
      />

      <PlayerSwitcher players={store.players.map(player => player.name)} />
      <p>State: {store.state}</p>
      {store.state == GameState.Voting && <Progress />}
      <ActionInformation />
      <br />
      {store.state == GameState.Voting && <VoteTeam />}
      {store.state == GameState.Setup && <PlayerList />}
      {store.state == GameState.Mission && <CompleteMission />}
    </div>
  );
};

const ActionInformation = (props: {}) => {
  const [store, setStore] = useGlobal<GameStore>();
  // useWebsocket(store.code, store.player);
  let message = "";
  const currentMission = store.missions[store.round];
  const currentRound = currentMission.nominations[currentMission.counter];
  switch (store.state) {
    case "setup":
      message = `PICK ${currentMission.quantity} PLAYERS`;
      break;
    case "voting":
      message = `ACCEPT OR REJECT THE PLAYERS: ${currentRound.nominees.join(
        ","
      )}`;
      break;
    case "mission":
      message = `SUCCEED OR FAIL THE QUEST`;
      break;
    default:
      message = "";
      break;
  }
  return <div className="subtitle">{message}</div>;
};
