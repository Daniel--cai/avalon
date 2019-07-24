import React, { useContext } from "react";
import Api from "../../framework/api";
import { observer } from "mobx-react-lite";
import { SubmitTeamCommand } from "../../../../shared/contract";
import { useGlobal } from "reactn";
import { GameStore } from "../../state/GameStore";

export const Setup = observer((props: { selected: string[] }) => {
  const [store, setStore] = useGlobal<GameStore>();

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
