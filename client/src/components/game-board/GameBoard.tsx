import React, { Component } from "react";
import { Game } from "../../model/Game";

interface Props {
  game: Game;
}

export const GameBoard = (props: Props) => {
  return (
    <>
      Round: {props.game.round}
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Nominees</th>
            <th>Nominations</th>
            <th>Quest</th>
          </tr>
        </thead>
        <tbody>
          {props.game.missions.map((mission, index) => {
            return (
              <tr key={index}>
                <td>{mission.quantity}</td>
                <td>
                  {mission.nominations.map(nomination => {
                    return nomination.nominees.join(" ");
                  })}
                </td>
                <td>
                  {mission.nominations.map((nomination, index) => {
                    return (
                      <>
                        {nomination.nominator} ({index})->
                        {nomination.votes.map(
                          vote => `${vote.player}:${vote.succeed}, `
                        )}
                        <br />
                      </>
                    );
                  })}
                </td>
                <td>
                  {mission.quest
                    .map(q => {
                      return `${q.player}:${q.succeed}, `;
                    })
                    .join("")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
