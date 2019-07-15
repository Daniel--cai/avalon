import React, { useEffect, useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../../framework/api";
import { Game } from "../../model/Game";

import { useGlobalState, Provider } from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { VoteTeam, Setup, CompleteMission } from "../../components/actions";
import { PlayerSwitcher } from "../../components/test-helpers";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { Progress } from "../../components/progress";

import { useWebsocket } from "../../hooks/useWebsocket";
import { useActionHandler } from "../../hooks/useActionHandler";
import { EventHelper } from "../event-helper";
import { PlayerList } from "../../components/player-list";
import { GameState } from "../../model/GameState";
import { GameBoard } from "../../components/game-board";
const ActionInformation = observer((props: {}) => {
  const store = useGlobalState();
  useActionHandler();
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
});

interface GameScreenProps {
  code: string;
  name: string;
}

export const GameScreen = observer((props: GameScreenProps) => {
  const store = useGlobalState();
  useEffect(() => {
    async function fetchData() {
      try {
        store.code = "";
        const response = await Api.get(`/game/${props.code}`);
        console.log(response);
        const game: Game = response.data;
        store.missions = game.missions;
        store.state = game.state;
        store.code = props.code;
        store.loaded = true;
        store.round = game.round;
        store.players = game.players;
      } catch (ex) {
        store.loaded = false;
      }
    }
    fetchData();
  }, []);
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
});
