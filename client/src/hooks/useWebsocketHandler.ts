import { useEffect, useContext, useState } from "react";
import EventStore from "../state/EventStore";
import { useWebsocket } from "./useWebsocket";

export const useWebsocketHandler = () => {
  const [websocketUrl, setWebsocketUrl] = useState("");
  const [sendMessage, lastMessage, state] = useWebsocket(websocketUrl);
  const store = useContext(EventStore);

  useEffect(() => {
    if (lastMessage !== null) {
      store.events.push(lastMessage);
    }
  }, [lastMessage]);

  return [sendMessage, setWebsocketUrl];
};
