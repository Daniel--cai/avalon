import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useCallback
} from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../framework/api";
import { Game } from "../model/Game";
import queryString from "query-string";
import { useWebsocket, SocketState } from "../hooks/useWebsocket";
import EventStore from "../state/EventStore";
import { observer } from "mobx-react-lite";
import { Message } from "../../../shared/contract";
import { any } from "prop-types";
interface Player {
  connectionId: string;
  name: string;
  number: number;
}

interface LobbyProps {
  startGame: any;
  connect: any;
  code: string;
  name: string;
}

export const Lobby = observer((props: LobbyProps) => {
  const [players, setPlayers] = useState([] as Player[]);
  const store = useContext(EventStore);

  useEffect(() => {
    props.connect();
  }, []);

  useEffect(() => {
    async function getPlayers() {
      const players = await Api.get(`/lobby/${props.code}/players`);
      setPlayers(players.data);
    }
    getPlayers();
  }, [store.events.length]);

  const startGame = useCallback(async () => {
    try {
      console.log("onClick");
      const data = {
        code: props.code
      };
      const response = await Api.Post("/game", data);
      const game: Game = response.data;
      props.startGame();
      console.log(response.data);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  const handleClick = async () => {
    startGame();
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
