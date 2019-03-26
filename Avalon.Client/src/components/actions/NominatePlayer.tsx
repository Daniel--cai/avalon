import React, { useState, useEffect, useContext } from "react";
import { useGlobalState } from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { Checkbox } from "../checkbox";
import { Setup } from ".";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

export const NominatePlayer = () => {
  const store = useGlobalState();

  let array: string[] = [];
  const [selected, setSelected] = useState(array);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updated = [...selected];
    if (e.target.checked) {
      updated.push(e.target.name);
    } else {
      updated = updated.filter(name => name !== e.target.name);
    }
    setSelected(updated);
  };

  return (
    <>
      <table className="u-full-width">
        <tbody>
          {store.players.map(player => {
            return (
              <tr key={player.name}>
                <td>
                  <Checkbox
                    checked={selected.includes(player.name)}
                    onChange={handleSelectOption}
                    disabled={
                      selected.length >=
                        store.missions[store.round - 1].quantity &&
                      !selected.includes(player.name)
                    }
                    label={player.name}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Setup selected={selected} />
    </>
  );
};
