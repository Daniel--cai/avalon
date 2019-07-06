import React, { Component, useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import Api from "../framework/api";
import { Game } from "../model/Game";
import queryString from "query-string";
import { useWebsocket } from "../hooks/useWebsocket";
import EventStore from "../state/EventStore";
import { observer } from "mobx-react-lite";
interface Player {
  connectionId: string;
  name: string;
  number: number;
}

type TParams = { code: string; name: string };

export const Lobby = observer((props: RouteComponentProps<TParams>) => {
  const [players, setPlayers] = useState([] as Player[]);
  const values = queryString.parse(props.location.search) as any;
  const [connect, sendMessage] = useWebsocket();
  const store = useContext(EventStore);

  useEffect(() => {
    connect(
      props.match.params.code,
      values.name
    );
    console.log(store.events.length);
  }, []);
  useEffect(() => {
    console.log("update:", store.events.length);
    async function getPlayers() {
      const players = await Api.get(
        `/lobby/${props.match.params.code}/players`
      );
      console.log(players.data);
      setPlayers(players.data);
    }
    getPlayers();
  }, [store.events.length]);

  const handleClick = async () => {
    console.log("onClick");
    const data = {
      code: props.match.params.code
    };
    try {
      const response = await Api.Post("/game", data);
      const game: Game = response.data;
      props.history.push(`/game/${props.match.params.code}`);
      console.log(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <div className="player-list">
        {players.map((player, index) => {
          return (
            <div key={index} className="player-list__item">
              {player.name}
            </div>
          );
        })}
      </div>
      <button className="u-full-width button-primary" onClick={handleClick}>
        Start
      </button>
    </div>
  );
});
