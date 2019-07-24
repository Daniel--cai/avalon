import React, { useState, useEffect, useContext } from "react";
import { GameStore } from "../../state/GameStore";
import { observer } from "mobx-react-lite";
import { Checkbox } from "../checkbox";
import { Setup } from "../actions";

import "./playerlist.css";
import { useGlobal } from "reactn";

interface ReceiveVoteCommand {
  code: string;
  player: string;
  success: boolean;
}

export const PlayerList = observer(() => {
  const [store, setStore] = useGlobal<GameStore>();

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

  const mission = store.missions[store.round - 1];
  const nominator = mission.nominations[mission.counter].nominator;

  if (store.player != nominator)
    return (
      <div>
        Currently:{store.player} Waiting on {nominator}{" "}
      </div>
    );
  return (
    <>
      <div className="player-list">
        {store.players.map(player => {
          return (
            <div key={player.name} className="player-list__item">
              <Checkbox
                checked={selected.includes(player.name)}
                onChange={handleSelectOption}
                disabled={
                  selected.length >= store.missions[store.round - 1].quantity &&
                  !selected.includes(player.name)
                }
                label={player.name}
              />
            </div>
          );
        })}
      </div>
      <Setup selected={selected} />
    </>
  );
});
