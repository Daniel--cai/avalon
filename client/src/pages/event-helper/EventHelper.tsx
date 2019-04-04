import React, { useRef, useEffect, useState } from "react";
import { useEventEmitter } from "../../components/test-helpers/useEventEmitter";
export const EventHelper = () => {
  const [player, setPlayer] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState("F");
  const [players, setPlayers] = useState("");
  const [round, setRound] = useState(0);

  const [option, setOption] = useState("CompleteTeam");
  const sendMessage = useEventEmitter();
  function handleClick(event: any) {
    console.log(option);
    let message: any = {
      type: option,
      players: players.split(" "),
      success: success === "T",
      player,
      quantity,
      round
    };

    sendMessage(message);
  }
  return (
    <div>
      <select
        name="event"
        value={option}
        onChange={e => setOption(e.target.value)}
      >
        <option value="SelectTeam">SelectTeam</option>
        <option value="VoteTeam">VoteTeam</option>
        <option value="CompleteTeam">CompleteTeam</option>
        {/* <option value="SelectMerlin">SelectMerlin</option> */}
        <option value="PlayerConnected">PlayerConnected</option>
        <option value="PlayerDisconnected">PlayerDisconnected</option>
        <option value="TeamSelected">TeamSelected</option>
        <option value="VoteSubmitted">VoteSubmitted</option>
        <option value="TeamAccepted">TeamAccepted</option>
        <option value="TeamRejected">TeamRejected</option>
        <option value="MissionSubmitted">MissionSubmitted</option>
        <option value="MissionSucceeded">MissionSucceeded</option>
        <option value="MissionFailed">MissionFailed</option>
      </select>
      <br />
      {"SelectTeam PlayerConnected PlayerDisconnected TeamSelected VoteSubmitted MissionSubmitted".includes(
        option
      ) && (
        <>
          <label htmlFor="">Player</label>
          <input
            type="text"
            name="player"
            placeholder="player"
            value={player}
            onChange={e => setPlayer(e.target.value)}
          />
        </>
      )}
      {"SelectTeam".includes(option) && (
        <>
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
          />
        </>
      )}
      {"TeamSelected VoteTeam CompleteTeam TeamAccepted PlayerDisconnected".includes(
        option
      ) && (
        <>
          <label htmlFor="">Players</label>
          <input
            type="text"
            name="players"
            value={players}
            onChange={e => setPlayers(e.target.value)}
          />
        </>
      )}

      {"TeamSelected VoteTeam CompleteTeam TeamAccepted PlayerDisconnected".includes(
        option
      ) && (
        <>
          <label htmlFor="">Round</label>
          <input
            type="number"
            name="players"
            value={round}
            onChange={e => setRound(parseInt(e.target.value))}
          />
        </>
      )}

      {"MissionSucceeded MissionFailed VoteSubmitted".includes(option) && (
        <>
          <label htmlFor="">Success</label>
          <input
            type="text"
            name="success"
            value={success}
            onChange={e => setSuccess(e.target.value)}
          />
        </>
      )}
      <br />
      <button name="SelectTeam" onClick={handleClick}>
        Send
      </button>

      <hr />
    </div>
  );
};
