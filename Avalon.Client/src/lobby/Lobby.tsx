import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Api from "../framework/api";

interface Player {
  connectionId: string;
  name: string;
  number: number;
}

interface State {
  players: Player[];
}

type TParams = { code: string };

export class Lobby extends React.Component<
  RouteComponentProps<TParams>,
  State
> {
  constructor(props: RouteComponentProps<TParams>) {
    super(props);
    this.state = {
      players: []
    };
  }

  async componentDidMount() {
    const players = await Api.get(
      `/lobby/${this.props.match.params.code}/players`
    );
    console.log(players.data);
    this.setState({ players: players.data });
  }

  render() {
    return (
      <div>
        Joined lobby {this.props.match.params.code}
        {this.state.players.map((player, index) => {
          return <div key={index}>{player.name}</div>;
        })}
      </div>
    );
  }
}
