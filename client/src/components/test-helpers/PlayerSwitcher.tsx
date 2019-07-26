import React, { useState } from "react";
import { usePersistentStorage } from "../../hooks/usePersistentStorage";
import { useGlobal, setGlobal } from "reactn";
import { GameStore } from "../../state/GameStore";

interface Props {
  players: string[];
}

export const PlayerSwitcher = (props: Props) => {
  console.log("PlayerSwitcher rerendered");
  const [selected, setSelected] = useState("none");
  const [{ name, code }, setCookie] = usePersistentStorage();
  const [player, setPlayer] = useGlobal<GameStore>("player");
  function handleSetSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    //dispatch({ type: "SetPlayer", player: e.target.value });
    setPlayer(e.target.value);
    console.log("store updated:");
    console.log(player);
  }

  return (
    <>
      <select name="name" value={selected} onChange={handleSetSelected}>
        {props.players.map((player, index) => (
          <option value={player} key={index}>
            {player}
          </option>
        ))}
      </select>
    </>
  );
};
