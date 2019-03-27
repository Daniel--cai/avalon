import React, { useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
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
const ActionInformation = observer((props: {}) => {
  const store = useGlobalState();
  useActionHandler();
  useWebsocket();
  let message = "";
  switch (store.state) {
    case "setup":
      message = `PICK ${store.missions[store.round - 1].quantity} PLAYERS`;
      break;
    case "voting":
      message = `ACCEPT OR REJECT THE PLAYERS`;
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

export const GameScreen = observer(
  (props: RouteComponentProps<{ code: string }>) => {
    const store = useGlobalState();
    useEffect(() => {
      async function fetchData() {
        try {
          store.code = "";
          const response = await Api.get(`/game/${props.match.params.code}`);
          console.log(response);
          const game: Game = response.data;
          store.missions = game.missions;
          store.state = game.state;
          store.code = props.match.params.code;
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
        {/* <GameBoard
          game={{
            missions: store.missions,
            state: store.state,
            players: store.players,
            round: store.round
          }}
        /> */}
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
  }
);
