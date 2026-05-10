import { Check, Clock, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { confirmGuess, getRoundGuesses, upsertGuess } from "../lib/gameState";
import { formatDistance } from "../lib/geo";
import { fetchGame, loadGame, saveGame, subscribeToGame } from "../lib/localGameStore";
import { GameState, Guess } from "../lib/types";
import { Scoreboard } from "./Scoreboard";
import { WorldGuessMap } from "./WorldGuessMap";

export function PlayerScreen({ roomCode, playerId }: { roomCode: string; playerId?: string }) {
  const [game, setGame] = useState<GameState | undefined>(() => loadGame(roomCode));
  const [now, setNow] = useState(Date.now());

  useEffect(() => subscribeToGame(roomCode, setGame), [roomCode]);
  useEffect(() => {
    if (game) return;
    void fetchGame(roomCode).then((remoteGame) => {
      if (remoteGame) setGame(remoteGame);
    });
  }, [game, roomCode]);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, []);

  const player = useMemo(() => game?.players.find((item) => item.id === playerId), [game, playerId]);

  if (!game || !player) {
    return (
      <main className="app phone-shell">
        <section className="phone-panel">
          <span className="kicker">Room {roomCode}</span>
          <h1>Join required</h1>
          <p>This player session was not found on this device.</p>
          <a className="primary-action" href={`/join?room=${roomCode}`}>Join again</a>
        </section>
      </main>
    );
  }

  const guesses = getRoundGuesses(game);
  const guess = guesses.find((item) => item.playerId === player.id);
  const round = game.rounds[game.currentRoundIndex];
  const remainingSeconds = game.roundEndsAt
    ? Math.max(0, Math.ceil((new Date(game.roundEndsAt).getTime() - now) / 1000))
    : game.timerSeconds;

  const persist = (next: GameState) => {
    setGame(next);
    saveGame(next);
  };

  if (game.status === "round_active") {
    return (
      <main className="app player-game">
        <header className="phone-top">
          <div>
            <span className="player-dot" style={{ background: player.color }} />
            <strong>{player.displayName}</strong>
          </div>
          <span><Clock size={16} /> {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, "0")}</span>
        </header>
        <WorldGuessMap
          value={guess ? { lat: guess.lat, lng: guess.lng } : undefined}
          disabled={guess?.confirmed}
          onChange={(position) => persist(upsertGuess(game, player.id, position.lat, position.lng))}
        />
        <section className="confirm-dock">
          <div>
            <span className="kicker">Round {game.currentRoundIndex + 1}</span>
            <strong>{guess?.confirmed ? "Guess confirmed" : "Place your pin"}</strong>
          </div>
          <button
            className="primary-action"
            type="button"
            disabled={!guess || guess.confirmed}
            onClick={() => persist(confirmGuess(game, player.id))}
          >
            <Check size={18} /> Confirm
          </button>
        </section>
      </main>
    );
  }

  const ownGuess = guesses.find((item) => item.playerId === player.id);

  return (
    <main className="app phone-shell">
      <section className="phone-panel">
        <span className="kicker">Room {game.roomCode}</span>
        {game.status === "lobby" && (
          <>
            <h1>Waiting for host</h1>
            <p>Round {game.currentRoundIndex + 1} is queued. Keep this screen open.</p>
          </>
        )}
        {game.status === "revealing" && (
          <>
            <span className="kicker">Reveal in progress</span>
            <h1>Eyes on the main screen</h1>
            <p>Scores unlock after the final answer reveal.</p>
          </>
        )}
        {game.status === "scoreboard" && (
          <PlayerResult guess={ownGuess} locationLabel={round.locationLabel} />
        )}
        {game.status === "finished" && (
          <>
            <Trophy size={38} />
            <h1>Final scores</h1>
            <Scoreboard game={game} compact />
          </>
        )}
      </section>
    </main>
  );
}

function PlayerResult({ guess, locationLabel }: { guess?: Guess; locationLabel: string }) {
  return (
    <>
      <span className="kicker">Round result</span>
      <h1>{locationLabel}</h1>
      <div className="result-metrics">
        <div>
          <span>Distance</span>
          <strong>{formatDistance(guess?.distanceKm)}</strong>
        </div>
        <div>
          <span>Points</span>
          <strong>{guess?.score?.toLocaleString() ?? 0}</strong>
        </div>
      </div>
      <p>Watch the reveal on the main screen.</p>
    </>
  );
}
