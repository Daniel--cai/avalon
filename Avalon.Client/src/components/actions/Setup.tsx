import React, { useContext } from "react";
import Api from "../../framework/api";
import GameStore from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface NominatePlayersCommand {
  code: string;
  player: string;
  players: string[];
}

export const Setup = observer((props: { selected: string[] }) => {
  const store = useContext(GameStore);

  let array: string[] = [];

  const handleNewNomination = async () => {
    const data: NominatePlayersCommand = {
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
        Setup Command
      </button>
    </>
  );
});
