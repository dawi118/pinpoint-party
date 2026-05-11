import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { addPlayer, getAvailableColors } from "../lib/gameState";
import { fetchGame, saveGame } from "../lib/localGameStore";
import { normalizeRoomCode } from "../lib/roomCodes";

export function JoinScreen({ initialRoomCode }: { initialRoomCode?: string }) {
  const [roomCode, setRoomCode] = useState(normalizeRoomCode(initialRoomCode ?? ""));
  const [displayName, setDisplayName] = useState("");
  const [color, setColor] = useState(getAvailableColors()[0]);
  const [error, setError] = useState("");

  const joinGame = async (event: FormEvent) => {
    event.preventDefault();
    const code = normalizeRoomCode(roomCode);
    const game = await fetchGame(code);

    if (!game) {
      setError("Room not found on the host computer. Check that the host lobby is open and you scanned the LAN QR code.");
      return;
    }

    if (game.status !== "lobby") {
      setError("This game is already in progress. Ask the host to create a new room.");
      return;
    }

    if (game.players.length >= 8) {
      setError("This room is full.");
      return;
    }

    const next = addPlayer(game, displayName, color);
    const player = next.players[next.players.length - 1];
    saveGame(next);
    window.location.href = `/player/${next.roomCode}?player=${player.id}`;
  };

  return (
    <main className="app phone-shell">
      <form className="phone-panel" onSubmit={joinGame}>
        <span className="kicker">Join game</span>
        <h1>Pinpoint Party</h1>
        <label>
          <span>Room code</span>
          <input value={roomCode} maxLength={4} onChange={(event) => setRoomCode(normalizeRoomCode(event.target.value))} placeholder="ABCD" />
        </label>
        <label>
          <span>Name</span>
          <input value={displayName} maxLength={16} onChange={(event) => setDisplayName(event.target.value)} placeholder="Your name" />
        </label>
        <div className="color-row" aria-label="Choose a player color">
          {getAvailableColors().map((item) => (
            <button
              type="button"
              key={item}
              className={item === color ? "selected" : ""}
              style={{ background: item }}
              title={`Use color ${item}`}
              onClick={() => setColor(item)}
            />
          ))}
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-action" type="submit">
          <ArrowRight size={18} /> Join room
        </button>
      </form>
    </main>
  );
}
