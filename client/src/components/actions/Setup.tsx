import React, { useContext } from "react";
import Api from "../../framework/api";
import { useGlobalState } from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { SubmitTeamCommand } from "../../../../shared/contract";

export const Setup = observer((props: { selected: string[] }) => {
  const store = useGlobalState();

  let array: string[] = [];

  const handleNewNomination = async () => {
    const data: SubmitTeamCommand = {
      type: "SubmitTeamCommand",
      code: store.code,
      player: store.player,
      players: props.selected
    };
    const response = await Api.Post("/setup", data);
    console.log(response);
  };

  return (
    <>
      <button
        className="u-full-width button-primary"
        onClick={handleNewNomination}
        disabled={
          props.selected.length !== store.missions[store.round - 1].quantity
        }
      >
        Setup
      </button>
    </>
  );
});
