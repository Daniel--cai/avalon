import React, { useEffect, useContext } from "react";
import Api from "../../framework/api";
import GameStore from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

interface NominatePlayersCommand {
  code: string;
  player: string;
  players: string[];
}

export const VoteTeam = observer(() => {
  const store = useContext(GameStore);

  const sendVote = (success: boolean) => async () => {
    const data: ReceiveVoteCommand = {
      code: store.code,
      player: store.player,
      success
    };
    const response = await Api.Post("/vote", data);
    console.log(response);
  };

  const sendQuest = (success: boolean) => async () => {
    const data: ReceiveVoteCommand = {
      code: store.code,
      player: store.player,
      success: success
    };
    const response = await Api.Post("/mission", data);
    console.log(response);
  };

  return (
    <>
      <button onClick={sendVote(true)}>Accept</button>
      <button onClick={sendVote(false)}>Reject</button>
      <button onClick={sendQuest(true)}>Success</button>
      <button onClick={sendQuest(false)}>Fail</button>
    </>
  );
});
