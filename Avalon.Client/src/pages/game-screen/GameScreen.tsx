import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Api from "../../framework/api";
import { Game } from "../../model/Game";
import { GameBoard } from "../../components/game-board";
interface Player {
  connectionId: string;
  name: string;
  number: number;
}

interface State {
  game: Game | null;
}

type TParams = { code: string };

export class GameScreen extends React.Component<
  RouteComponentProps<TParams>,
  State
> {
  constructor(props: RouteComponentProps<TParams>) {
    super(props);

    this.state = { game: null };
  }

  async componentDidMount() {
    const response = await Api.get(`/game/${this.props.match.params.code}`);
    const game = response.data;
    console.log(game);
    this.setState({ game });
  }

  render() {
    if (this.state.game === null) return <div>Loading...</div>;
    return (
      <div>
        <p>State: {this.state.game.state}</p>
        <GameBoard game={this.state.game} />
      </div>
    );
  }
}
