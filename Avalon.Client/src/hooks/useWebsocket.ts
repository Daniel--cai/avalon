import { useState, useEffect, useContext } from "react";
import { observer, useObservable } from "mobx-react-lite";
import EventStore from "../state/EventStore";
// import WebSocket from "ws";

export const useWebsocket = () => {
  const store = useContext(EventStore);
  const url = "ws://localhost:50000";
  const socket = new WebSocket(url);

  useEffect(() => {
    console.log("mount!");
    return () => {
      console.log("closing");
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log("second effect");
    socket.onmessage = e => {
      console.log("message!");
      console.log(e.data);
      store.events.push(e.data);
    };

    socket.onopen = e => {
      console.log("opened!");
      socket.send("hello");
    };
  }, []);
};
