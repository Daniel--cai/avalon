import React, { useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import Api from "../../framework/api";
import { useAsyncEffect } from "../../framework";
import { Game } from "../../model/Game";
import { GameBoard } from "../../components/game-board";

import GameStore from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { NominatePlayer, VoteTeam } from "../../components/actions";
import { PlayerSwitcher } from "../../components/test-helpers";

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
    console.log("isLoaded");
    console.log(store.loaded);
    console.log(store.players);
    if (!store.loaded) return <div>Loading...</div>;
    return (
      <div>
        <p>State: {store.state}</p>
        <GameBoard
          game={{
            missions: store.missions,
            state: store.state,
            players: store.players,
            round: store.round
          }}
        />
        <NominatePlayer />
        <VoteTeam />
        <PlayerSwitcher players={store.players.map(player => player.name)} />
      </div>
    );
  }
);
