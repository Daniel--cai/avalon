import React, { useEffect, useState } from "react";
import Api from "../../framework/api";
import { useGlobalState } from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

export const VoteTeam = observer(() => {
  const store = useGlobalState();

  const [disabled, setDisabled] = useState({} as any);

  const sendVote = (success: boolean) => async () => {
    const data: ReceiveVoteCommand = {
      code: store.code,
      player: store.player,
      success
    };
    const response = await Api.Post("/vote", data);
    const _disabled = { ...disabled };
    _disabled[store.player] = success ? "Accept" : "Reject";
    setDisabled(_disabled);

    console.log(response);
  };
  if (store.player == "") return <div />;
  return (
    <>
      <button
        className="u-full-width button-primary"
        onClick={sendVote(true)}
        disabled={disabled[store.player] == "Accept"}
      >
        Accept
      </button>
      <button
        className="u-full-width button-primary"
        onClick={sendVote(false)}
        disabled={disabled[store.player] == "Reject"}
      >
        Reject
      </button>
    </>
  );
});
