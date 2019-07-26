import React, { Component } from "react";
import { Game } from "../../model/Game";

interface Props {
  game: Game;
}

export const GameBoard = (props: Props) => {
  console.log("game board rerendered");
  return (
    <>
      Round: {props.game.round}
      <br />
      State: {props.game.state}
      <br />
      Counter: {props.game.missions[props.game.round].counter}
      <br />
      Players: {props.game.players.length}
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
                      <React.Fragment key={index}>
                        ({index}){nomination.nominator} ->
                        {nomination.votes.map(
                          vote => `${vote.player}:${vote.succeed}, `
                        )}
                        <br />
                      </React.Fragment>
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
