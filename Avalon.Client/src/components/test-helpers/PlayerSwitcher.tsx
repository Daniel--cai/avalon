import React, { useState, useContext } from "react";
import { useGlobalState, useDispatch } from "../../state/GameStore";
import { observer } from "mobx-react-lite";

interface Props {
  players: string[];
}

export const PlayerSwitcher = observer((props: Props) => {
  const [selected, setSelected] = useState("none");
  const store = useGlobalState();
  const dispatch = useDispatch();

  function handleSetSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: "SetPlayer", player: e.target.value });
    setSelected(e.target.value);
  }

  return (
    <>
      <select name="name" value={selected} onChange={handleSetSelected}>
        <option value="none" disabled />
        {props.players.map(player => (
          <option value={player} key={player}>
            {player}
          </option>
        ))}
      </select>
    </>
  );
});
