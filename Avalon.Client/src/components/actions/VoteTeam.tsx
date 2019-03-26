import React, { useEffect, useContext } from "react";
import Api from "../../framework/api";
import { useGlobalState } from "../../state/GameStore";
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
  const store = useGlobalState();

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
      <div className="one-half column">
        <button className="u-full-width" onClick={sendVote(true)}>
          Accept
        </button>
      </div>
      <div className="one-half column">
        <button className="u-full-width" onClick={sendVote(false)}>
          Reject
        </button>
      </div>
      <div className="one-half column">
        <button className="u-full-width" onClick={sendQuest(true)}>
          Success
        </button>
        <button className="u-full-width" onClick={sendQuest(false)}>
          Fail
        </button>
      </div>
    </>
  );
});
