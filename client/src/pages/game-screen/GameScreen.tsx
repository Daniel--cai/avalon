import React, { useEffect, useContext } from "react";
import Api from "../../framework/api";
import { Game } from "../../model/Game";

import { VoteTeam, Setup, CompleteMission } from "../../components/actions";
import { PlayerSwitcher } from "../../components/test-helpers";
import { Progress } from "../../components/progress";

import { PlayerList } from "../../components/player-list";
import { GameState } from "../../model/GameState";
import { GameBoard } from "../../components/game-board";
import { useGlobal } from "reactn";
import { GameStore } from "../../state/GameStore";

interface GameScreenProps {
  code: string;
  name: string;
}

export const GameScreen = (props: GameScreenProps) => {
  const [store, setStore] = useGlobal<GameStore>();
  console.log(store);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.get(`/game/${props.code}`);
        console.log(response.data);
        const game: Game = response.data;
        setStore({
          ...game,
          code: props.code,
          player: props.name,
          loaded: true
        });
        // setLoaded(true);
        // console.log(store.loaded);
      } catch (ex) {
        console.log(ex);
        //store.loaded = false;
      }
    }
    fetchData();
  }, []);
  console.log(store.loaded);
  if (!store.loaded) return <div>Loading...</div>;
  return (
    <div>
      <GameBoard
        game={{
          missions: store.missions,
          state: store.state,
          players: store.players,
          round: store.round
        }}
      />
      {store.players.length}
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
  const currentMission = store.missions[store.round - 1];
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
