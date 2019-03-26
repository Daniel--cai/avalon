import React, { useRef, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEventEmitter } from "../../components/test-helpers/EventEmitter";

export const EventHelper = () => {
  console.log("event emitter!");
  const url = "ws://localhost:50000";
  const socket = useRef(null as any);
  useEffect(() => {
    socket.current = new WebSocket(url);
    console.log("second effect");
    console.log(socket.current);
    socket.current.onopen = (e: any) => {
      console.log("opened!");
      socket.current.send(JSON.stringify("opened"));
    };
    return () => {
      console.log("closing");
      socket.current.close();
    };
  }, []);

  function sendMessage(message: any) {
    socket.current.send(JSON.stringify(message));
  }

  const [input, setInput] = useState("");
  function handleClick(event: any) {
    console.log(event.target.name);
    let message: any = {};
    message.type = event.target.name;
    if (event.target.name == "SelectTeam") {
      message.player = input;
      message.quantity = 2;
    } else if (event.target.name == "VoteTeam") {
      message.players = ["player1", "player2", "player3"];
    } else if (event.target.name == "CompleteTeam") {
      message.players = input.split(",");
    } else if (event.target.name == "SelectMerlin") {
    }
    sendMessage(message);
  }
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button name="SelectTeam" onClick={handleClick}>
        SelectTeam
      </button>
      <button name="VoteTeam" onClick={handleClick}>
        VoteTeam
      </button>
      <button name="CompleteTeam" onClick={handleClick}>
        CompleteTeam
      </button>
      <button name="SelectMerlin" onClick={handleClick}>
        SelectMerlin
      </button>
    </div>
  );
};
