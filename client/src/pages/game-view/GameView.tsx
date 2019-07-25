import { useWebsocketHandler } from "../../hooks/useWebsocketHandler";
import { Lobby } from "../../lobby";
import { GameScreen } from "../game-screen";
import { RouteComponentProps } from "react-router";
import React, { useState, useCallback } from "react";
import { usePersistentStorage } from "../../hooks/usePersistentStorage";

export const GameView = (props: RouteComponentProps<{}>) => {
  const [sendMessage, setWebsocketUrl, websocketState] = useWebsocketHandler();
  const [{ name, code }, setCookie] = usePersistentStorage();
  const [inProgress, setInProgress] = useState(false);
  const startGame = useCallback(() => {
    setInProgress(true);
  }, []);
  const connect = useCallback(() => {
    console.log(name);
    if (name == "" || code == "") {
      console.log("setting COokie");
      props.history.push("/");
    }
    const url = `ws://localhost:3001?code=${code}&player=${name}`;
    setWebsocketUrl(url);
  }, []);
  if (inProgress) return <GameScreen code={code} name={name} />;
  else
    return (
      <Lobby
        startGame={startGame}
        connect={connect}
        code={code}
        name={name}
        socketState={websocketState}
      />
    );
};
