import React from "react";
import "./Progress.css";
import { useGlobalState } from "../../state/GameStore";

export const Progress = () => {
  const store = useGlobalState();
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
