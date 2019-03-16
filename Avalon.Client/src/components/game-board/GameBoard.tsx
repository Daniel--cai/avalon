import React, { Component } from "react";
import { Game } from "../../model/Game";

interface Props {
  game: Game;
}

export class GameBoard extends Component<Props, any> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Round</th>
            <th>Number</th>
            <th>Nominations</th>
            <th>Quest</th>
          </tr>
        </thead>
        <tbody>
          {this.props.game.missions.map((mission, index) => {
            return (
              <tr key={index}>
                <td>{mission.round}</td>
                <td>{mission.quantity}</td>
                <td>{mission.nominations.length}</td>
                <td>{mission.quest.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
