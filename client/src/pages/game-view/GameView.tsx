import { useWebsocketHandler } from "../../hooks/useWebsocketHandler";
import { Lobby } from "../../lobby";
import { GameScreen } from "../game-screen";
import { RouteComponentProps } from "react-router";
import React, { useState, useCallback } from "react";

export const GameView = (
  props: RouteComponentProps<{ code: string; name: string }>
) => {
  const [sendMessage, setWebsocketUrl] = useWebsocketHandler();
  const [inProgress, setInProgess] = useState(false);
  const startGame = useCallback(() => {
    setInProgess(true);
  }, []);
  const connect = useCallback(() => {
    const url = `ws://localhost:3001?code=${props.match.params.code}&player=${
      props.match.params.name
    }`;
    setWebsocketUrl(url);
  }, []);
  if (inProgress)
    return (
      <GameScreen
        code={props.match.params.code}
        name={props.match.params.name}
      />
    );
  else
    return (
      <Lobby
        startGame={startGame}
        connect={connect}
        code={props.match.params.code}
        name={props.match.params.name}
      />
    );
};
