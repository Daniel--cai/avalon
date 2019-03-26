import React, { useState, useEffect, useRef } from "react";

export const useEventEmitter = () => {
  console.log("event emitter!");
  const url = "ws://localhost:50000";
  const socket = useRef((null as unknown) as WebSocket);
  useEffect(() => {
    console.log("mount!");
    console.log("second effect");
    console.log(socket.current);
    socket.current.onopen = e => {
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
  return sendMessage;
};

// export type SelectTeam = {
//     type: "SelectTeam";
//     player: string;
//     quantity: number;
//   };
//   export type VoteTeam = {
//     type: "VoteTeam";
//     players: string[];
//   };
//   export type CompleteTeam = {
//     type: "CompleteTeam";
//     players: string[];
//   };

//   export type SelectMerlin = {
//     type: "SelectMerlin";
//     player: string;
//   };
