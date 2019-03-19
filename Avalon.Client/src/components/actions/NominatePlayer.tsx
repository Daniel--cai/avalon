import React, { useState, useEffect, useContext } from "react";
import Api from "../../framework/api";
import GameStore from "../../state/GameStore";
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

export const NominatePlayer = observer(() => {
  const store = useContext(GameStore);

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

  const handleNewNomination = async () => {
    const data: NominatePlayersCommand = {
      code: store.code,
      player: store.player,
      players: selected
    };
    const response = await Api.Post("/setup", data);
    console.log(response);
  };

  return (
    <>
      <table>
        <tbody>
          {store.players.map(player => {
            return (
              <tr key={player.name}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      name={player.name}
                      checked={selected.includes(player.name)}
                      onChange={handleSelectOption}
                      disabled={
                        selected.length >=
                          store.missions[store.round - 1].quantity &&
                        !selected.includes(player.name)
                      }
                    />
                    {player.name}
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleNewNomination}>Setup Command</button>
    </>
  );
});
