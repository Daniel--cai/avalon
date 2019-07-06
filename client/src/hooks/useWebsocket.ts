import { useRef, useEffect, useContext, useState } from "react";
import EventStore from "../state/EventStore";
import Sockette from "sockette";

export interface ConnectionRequest {
  code: string;
  name: string;
}

export const useWebsocket = () => {
  const store = useContext(EventStore);
  const socket = useRef((null as unknown) as Sockette);

  const [connection, setConnection] = useState(
    (null as unknown) as ConnectionRequest
  );
  function sendMessage(data: any) {
    return socket.current.send(data);
  }

  function connect(code: string, name: string) {
    console.log("setting connection");
    setConnection({ code, name });
  }

  useEffect(() => {
    console.log("first useeffect:", connection);
    if (connection !== null) {
      console.log("connection not null!");
      const url = `ws://localhost:3001?code=${connection.code}&player=${
        connection.name
      }`;
      console.log("new socket!");
      socket.current = new Sockette(url, {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: e => {
          console.log("connected:", e);
        },
        onmessage: e => {
          console.log("message!");
          console.log(e.data);
          store.events.push(JSON.parse(e.data));
        },
        onreconnect: e => console.log("Reconnecting...", e),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => console.log("Closed!", e),
        onerror: e => {
          console.log("Error:", e);
        }
      });
    }
    return () => {
      console.log("closing");
      if (socket.current !== null) {
        socket.current.close();
      }
    };
  }, [connection]);
  return [connect, sendMessage];
};

// socketConnect = (code: string) => {
//
// };
