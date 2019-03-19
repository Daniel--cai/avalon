import React, { Component } from "react";
import { Game } from "../../model/Game";

interface Props {
  game: Game;
}

export const GameBoard = (props: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>Round</th>
          <th>Number</th>
          <th>Nominees</th>
          <th>Nominations</th>
          <th>Quest</th>
        </tr>
      </thead>
      <tbody>
        {props.game.missions.map((mission, index) => {
          return (
            <tr key={index}>
              <td>{mission.round}</td>
              <td>{mission.quantity}</td>
              <td>
                {mission.nominations.map(nomination => {
                  return nomination.nominees.join(" ");
                })}
              </td>
              <td>
                {mission.nominations
                  .map(nomination => {
                    return nomination.votes.map(
                      vote => `${vote.player} ${vote.succeed}`
                    );
                  })
                  .join("")}
              </td>
              <td>{mission.quest.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
