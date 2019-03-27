import React, { useEffect, useState } from "react";
import Api from "../../framework/api";
import { useGlobalState } from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

export const CompleteMission = observer(() => {
  const store = useGlobalState();
  const [disabled, setDisabled] = useState({} as any);
  const sendQuest = (success: boolean) => async () => {
    const data: ReceiveVoteCommand = {
      code: store.code,
      player: store.player,
      success: success
    };
    const response = await Api.Post("/mission", data);
    const _disabled = { ...disabled };
    _disabled[store.player] = success ? "Succeed" : "Fail";
    setDisabled(_disabled);
    console.log(response);
  };

  const mission = store.missions[store.round - 1];

  const nomination =
    mission.nominations[store.missions[store.round - 1].nominations.length - 1];

  if (nomination.nominees.indexOf(store.player) == -1)
    return (
      <div>
        Waiting on players:{" "}
        {nomination.nominees
          .filter(
            nominee => mission.quest.map(q => q.player).indexOf(nominee) == -1
          )
          .join(", ")}
      </div>
    );

  return (
    <>
      <button
        className="u-full-width button-primary"
        onClick={sendQuest(true)}
        disabled={disabled[store.player] == "Succeed"}
      >
        Succeed
      </button>
      <button
        className="u-full-width button-primary"
        onClick={sendQuest(false)}
        disabled={disabled[store.player] == "Fail"}
      >
        Fail
      </button>
    </>
  );
});
