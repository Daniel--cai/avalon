import {
  useRef,
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo
} from "react";
import EventStore from "../state/EventStore";
import Sockette from "sockette";

export interface ConnectionRequest {
  code: string;
  name: string;
}

export enum SocketState {
  IDLE,
  CONNECTING,
  RECONNECTING,
  OPEN,
  CLOSE,
  ERROR
}

export const useWebsocket = (url: string) => {
  const socket = useRef((null as unknown) as Sockette);
  const [socketState, setSocketState] = useState(SocketState.IDLE);
  const [lastMessage, setLastMessage] = useState(null as any);
  const sendMessage = useCallback((data: any) => {
    socket.current && socket.current.send(data);
  }, []);
  const convertedUrl = useMemo(() => {
    return url;
  }, [url]);

  useEffect(() => {
    if (convertedUrl != "") {
      socket.current = new Sockette(convertedUrl, {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: e => {
          setSocketState(SocketState.OPEN);
        },
        onmessage: e => {
          console.log(e.data);
          setLastMessage(JSON.parse(e.data));
          // store.events.push(JSON.parse(e.data));
        },
        onreconnect: e => setSocketState(SocketState.RECONNECTING),
        onmaximum: e => console.log("Stop Attempting!", e),
        onclose: e => setSocketState(SocketState.CLOSE),
        onerror: e => {
          setSocketState(SocketState.ERROR);
        }
      });
    }
    return () => {
      if (socket.current !== null) {
        console.log("closing");
        socket.current.close();
      }
    };
  }, [convertedUrl]);
  return [sendMessage, lastMessage, socketState];
};
