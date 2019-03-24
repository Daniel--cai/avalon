import React, { useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import Api from "../../framework/api";
import { useAsyncEffect } from "../../framework";
import { Game } from "../../model/Game";

import GameStore from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { VoteTeam } from "../../components/actions";
import { PlayerSwitcher } from "../../components/test-helpers";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import { PlayerList } from "../../components/player-list";
import { Progress } from "../../components/progress";

const ActionInfomration = observer((props: { state: string }) => {
  const store = useContext(GameStore);
  return (
    <div className="subtitle">
      PICK {store.missions[store.round - 1].quantity} PLAYERS
    </div>
  );
});

export const GameScreen = observer(
  (props: RouteComponentProps<{ code: string }>) => {
    const store = useContext(GameStore);

    useAsyncEffect(async () => {
      try {
        console.log("useAsyncEffect");
        store.code = "";
        const response = await Api.get(`/game/${props.match.params.code}`);
        // const response = await Api.get(`/lobby/${props.match.params.code}`);
        console.log(response);
        const game: Game = response.data;
        store.missions = game.missions;
        store.state = game.state;
        store.code = props.match.params.code;
        store.loaded = true;
        store.round = game.round;
        console.log(game.players);
        store.players = game.players;
        console.log("store");
        console.log(store);
      } catch (ex) {
        console.log("error");
        store.loaded = false;
        console.log(ex);
      }
    }, []);
    if (!store.loaded) return <div>Loading...</div>;
    return (
      <div>
        <p>State: {store.state}</p>
        {/* <GameBoard
          game={{
            missions: store.missions,
            state: store.state,
            players: store.players,
            round: store.round
          }}
        /> */}

        <Progress />
        <PlayerList />
        <VoteTeam />
        <PlayerSwitcher players={store.players.map(player => player.name)} />
        <Loading />
      </div>
    );
  }
);
