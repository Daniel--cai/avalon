import { useEffect, useContext, useState } from "react";
import EventStore from "../state/EventStore";
import { useWebsocket } from "./useWebsocket";
import { GameStore } from "../state/GameStore";
import { useGlobal } from "reactn";

export const useWebsocketHandler = () => {
  const [websocketUrl, setWebsocketUrl] = useState("");
  const [sendMessage, lastMessage, state] = useWebsocket(websocketUrl);
  const [store, setStore] = useGlobal<GameStore>();
  useEffect(() => {
    if (lastMessage !== null) {
      setStore({
        ...store,
        events: store.events.concat(lastMessage)
      });
    }
  }, [lastMessage]);

  return [sendMessage, setWebsocketUrl, state];
};
