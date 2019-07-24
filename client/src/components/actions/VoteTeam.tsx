import React, { useEffect, useState } from "react";
import Api from "../../framework/api";
import { observer } from "mobx-react-lite";
import { GameStore } from "../../state/GameStore";
import { useGlobal } from "reactn";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

export const VoteTeam = observer(() => {
  const [store, setStore] = useGlobal<GameStore>();

  const [disabled, setDisabled] = useState<{ [key: string]: string }>({});

  const sendVote = (success: boolean) => async () => {
    const data: ReceiveVoteCommand = {
      code: store.code,
      player: store.player,
      success
    };
    const response = await Api.Post("/vote", data);

    setDisabled(disable => ({
      ...disable,
      [store.player]: success ? "Accept" : "Reject"
    }));

    console.log(response);
  };
  if (store.player == "") return <div />;
  return (
    <>
      <p>{store.player}</p>
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
