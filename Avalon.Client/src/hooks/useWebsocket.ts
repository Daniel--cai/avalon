import { useRef, useEffect, useContext } from "react";
import EventStore from "../state/EventStore";

export const useWebsocket = () => {
  const store = useContext(EventStore);
  const socket = useRef((null as unknown) as WebSocket);
  useEffect(() => {
    const url = "ws://localhost:50000";
    console.log("new socket!");
    socket.current = new WebSocket(url);
    socket.current.onmessage = (e: any) => {
      console.log("message!");
      console.log(e.data);
      store.events.push(JSON.parse(e.data));
    };
    return () => {
      console.log("closing");
      socket.current.close();
    };
  }, []);
};
