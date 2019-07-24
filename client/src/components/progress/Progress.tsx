import React from "react";
import "./Progress.css";
import { GameStore } from "../../state/GameStore";
import { useGlobal } from "reactn";

export const Progress = () => {
  const [store, setStore] = useGlobal<GameStore>();
  const nomination =
    store.missions[store.round - 1].nominations[
      store.missions[store.round - 1].counter
    ];
  return (
    <div className="progress">
      {store.players.map(player => {
        const playerVote = nomination.votes.find(
          vote => vote.player === player.name
        );
        if (playerVote == null) {
          return <div className="progress__bar"> .</div>;
        }
        return <div className="progress__bar progress__bar--active">.</div>;
      })}
    </div>
  );
};
