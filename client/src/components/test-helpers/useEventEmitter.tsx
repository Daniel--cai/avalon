import React, { useState, useEffect, useRef, useCallback } from "react";

export const useEventEmitter = () => {
  const socket = useRef((null as unknown) as WebSocket);
  useEffect(() => {
    const url = "localhost:3001";
    console.log("event emitter!");
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
