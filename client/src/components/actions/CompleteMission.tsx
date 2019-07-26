import React, { useEffect, useState } from "react";
import Api from "../../framework/api";

import { SubmitMissionCommand } from "../../../../shared/contract";
import { GameStore } from "../../state/GameStore";
import { useGlobal } from "reactn";

export const CompleteMission = () => {
  const [store, setStore] = useGlobal<GameStore>();
  const [disabled, setDisabled] = useState<{ [key: string]: string }>({});
  const sendMission = (success: boolean) => async () => {
    const data: SubmitMissionCommand = {
      type: "SubmitMissionCommand",
      code: store.code,
      player: store.player,
      success: success
    };
    const response = await Api.Post("/mission", data);
    setDisabled(disable => ({
      ...disable,
      [store.player]: success ? "Succeed" : "Fail"
    }));
    console.log(response);
  };

  const mission = store.missions[store.round];

  const nomination = mission.nominations[mission.counter];

  if (nomination.nominees.indexOf(store.player) == -1)
    return (
      <div>
        Currently: {store.player} Waiting on players:{" "}
        {nomination.nominees
          .filter(
            nominee => mission.quest.map(q => q.player).indexOf(nominee) == -1
          )
          .join(", ")}
      </div>
    );

  return (
    <>
      <p>{store.player}</p>
      <button
        className="u-full-width button-primary"
        onClick={sendMission(true)}
        disabled={disabled[store.player] == "Succeed"}
      >
        Succeed
      </button>
      <button
        className="u-full-width button-primary"
        onClick={sendMission(false)}
        disabled={disabled[store.player] == "Fail"}
      >
        Fail
      </button>
    </>
  );
};
