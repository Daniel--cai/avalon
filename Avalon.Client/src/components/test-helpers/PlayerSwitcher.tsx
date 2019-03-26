import React, { useState, useContext } from "react";
import { useGlobalState } from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface Props {
  players: string[];
}

export const PlayerSwitcher = observer((props: Props) => {
  const [selected, setSelected] = useState("");
  const store = useGlobalState();

  const handleSetSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    store.player = e.target.value;
    setSelected(e.target.value || "");
  };

  return (
    <select name="name" value={selected} onChange={handleSetSelected}>
      {props.players.map(player => (
        <option value={player} key={player}>
          {player}
        </option>
      ))}
    </select>
  );
});
