import { ArrowRight, Clock, Copy, Play, Trophy, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  advanceReveal,
  advanceRound,
  allPlayersConfirmed,
  createInitialGame,
  finishRound,
  getRoundGuesses,
  showScoreboard,
  sortGuessesForReveal,
  startRound,
  updateSettings
} from "../lib/gameState";
import { fetchGame, loadGame, saveGame, saveGameAndWait, subscribeToGame } from "../lib/localGameStore";
import { generateRoomCode } from "../lib/roomCodes";
import { GameState } from "../lib/types";
import { RevealMap } from "./RevealMap";
import { Scoreboard } from "./Scoreboard";

export function HostScreen({ roomCode }: { roomCode?: string }) {
  const [game, setGame] = useState<GameState | undefined>(() => (roomCode ? loadGame(roomCode) : undefined));
  const [roundCount, setRoundCount] = useState<3 | 5 | 10>(3);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!roomCode) return undefined;
    return subscribeToGame(roomCode, setGame);
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode || game) return;
    void fetchGame(roomCode).then((remoteGame) => {
      if (remoteGame) setGame(remoteGame);
    });
  }, [game, roomCode]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!game || game.status !== "round_active") return;
    const timeExpired = game.roundEndsAt ? new Date(game.roundEndsAt).getTime() <= now : false;
    if (timeExpired || allPlayersConfirmed(game)) {
      const next = finishRound(game);
      setGame(next);
      saveGame(next);
    }
  }, [game, now]);

  useEffect(() => {
    if (!game || game.status !== "revealing") return undefined;
    const revealCount = sortGuessesForReveal(game).length;
    if (game.revealStep > revealCount) return undefined;

    const timer = window.setTimeout(() => {
      setGame((current) => {
        if (!current || current.status !== "revealing") return current;
        if (current.revealStep > sortGuessesForReveal(current).length) return current;

        const next = advanceReveal(current);
        saveGame(next);
        return next;
      });
    }, game.revealStep === 0 ? 800 : 2100);

    return () => window.clearTimeout(timer);
  }, [game?.revealStep, game?.roomCode, game?.status]);

  const joinUrl = useMemo(() => {
    if (!game) return "";
    return `${window.location.origin}/join?room=${game.roomCode}`;
  }, [game]);

  if (!roomCode || !game) {
    return (
      <main className="app host-create">
        <section className="host-hero">
          <div>
            <span className="kicker">TV-led mobile party game</span>
            <h1>Pinpoint Party</h1>
            <p>Open a room on the big screen, let players join by code, then watch every guess collapse toward the answer.</p>
          </div>
          <form
            className="setup-panel"
            onSubmit={async (event) => {
              event.preventDefault();
              const next = createInitialGame({ roomCode: generateRoomCode(), roundCount, timerSeconds });
              await saveGameAndWait(next);
              window.location.href = `/host/${next.roomCode}`;
            }}
          >
            <label>
              <span>Rounds</span>
              <select value={roundCount} onChange={(event) => setRoundCount(Number(event.target.value) as 3 | 5 | 10)}>
                <option value={3}>3 rounds</option>
                <option value={5}>5 rounds</option>
                <option value={10}>10 rounds</option>
              </select>
            </label>
            <label>
              <span>Timer</span>
              <select value={timerSeconds} onChange={(event) => setTimerSeconds(Number(event.target.value))}>
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
                <option value={180}>3 minutes</option>
                <option value={300}>5 minutes</option>
              </select>
            </label>
            <button className="primary-action" type="submit">
              <Play size={20} /> Create room
            </button>
          </form>
        </section>
      </main>
    );
  }

  const round = game.rounds[game.currentRoundIndex];
  const guesses = getRoundGuesses(game);
  const revealComplete = game.status === "revealing" && game.revealStep > sortGuessesForReveal(game).length;
  const confirmedCount = guesses.filter((guess) => guess.confirmed).length;
  const remainingSeconds = game.roundEndsAt
    ? Math.max(0, Math.ceil((new Date(game.roundEndsAt).getTime() - now) / 1000))
    : game.timerSeconds;

  const persist = (next: GameState) => {
    setGame(next);
    saveGame(next);
  };

  return (
    <main className="app host-display">
      <header className="top-bar">
        <div>
          <span className="kicker">Room</span>
          <strong className="room-code">{game.roomCode}</strong>
        </div>
        <div className="status-pills">
          <span><Users size={16} /> {game.players.length}/8</span>
          <span><Clock size={16} /> {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, "0")}</span>
          <span>Round {game.currentRoundIndex + 1}/{game.rounds.length}</span>
        </div>
      </header>

      {game.status === "lobby" && (
        <section className="lobby-grid">
          <div className="join-band">
            <span className="kicker">Join on your phone</span>
            <h1>{game.roomCode}</h1>
            <p>{joinUrl}</p>
            <button className="secondary-action" type="button" onClick={() => navigator.clipboard?.writeText(joinUrl)}>
              <Copy size={18} /> Copy join link
            </button>
          </div>
          <div className="host-controls">
            <label>
              <span>Rounds</span>
              <select
                value={game.roundCount}
                onChange={(event) => persist(updateSettings(game, Number(event.target.value) as 3 | 5 | 10, game.timerSeconds))}
              >
                <option value={3}>3 rounds</option>
                <option value={5}>5 rounds</option>
                <option value={10}>10 rounds</option>
              </select>
            </label>
            <label>
              <span>Timer</span>
              <select
                value={game.timerSeconds}
                onChange={(event) => persist(updateSettings(game, game.roundCount, Number(event.target.value)))}
              >
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
                <option value={180}>3 minutes</option>
                <option value={300}>5 minutes</option>
              </select>
            </label>
            <button className="primary-action" type="button" disabled={game.players.length < 1} onClick={() => persist(startRound(game))}>
              <Play size={20} /> Start round
            </button>
          </div>
          <PlayerList game={game} />
        </section>
      )}

      {game.status === "round_active" && (
        <section className="round-stage">
          <img src={round.url} alt="Round clue" />
          <div className="round-overlay">
            <span className="kicker">{round.contentPack}</span>
            <h1>Where was this taken?</h1>
            <p>{confirmedCount} of {game.players.length} players locked in</p>
          </div>
          <PlayerList game={game} />
        </section>
      )}

      {game.status === "revealing" && (
        <section className="host-flow">
          <RevealMap game={game} />
          <div className="flow-actions">
            <button className="secondary-action" type="button" disabled={!revealComplete} onClick={() => persist(showScoreboard(game))}>
              <Trophy size={18} /> Reveal scores
            </button>
            <button className="primary-action" type="button" disabled={revealComplete} onClick={() => persist(advanceReveal(game))}>
              <ArrowRight size={18} /> Step reveal
            </button>
          </div>
        </section>
      )}

      {game.status === "scoreboard" && (
        <section className="scoreboard-stage">
          <span className="kicker">Round complete</span>
          <h1>{round.locationLabel}</h1>
          <Scoreboard game={game} />
          <button className="primary-action" type="button" onClick={() => persist(advanceRound(game))}>
            <ArrowRight size={18} /> {game.currentRoundIndex + 1 >= game.rounds.length ? "Final results" : "Next round"}
          </button>
        </section>
      )}

      {game.status === "finished" && (
        <section className="scoreboard-stage final">
          <span className="kicker">Final leaderboard</span>
          <h1>{game.players[0] ? "Champion crowned" : "Game complete"}</h1>
          <Scoreboard game={game} />
        </section>
      )}
    </main>
  );
}

function PlayerList({ game }: { game: GameState }) {
  const guesses = getRoundGuesses(game);

  return (
    <ul className="player-list">
      {game.players.map((player) => {
        const confirmed = guesses.some((guess) => guess.playerId === player.id && guess.confirmed);
        return (
          <li key={player.id}>
            <span className="player-dot" style={{ background: player.color }} />
            <strong>{player.displayName}</strong>
            <small>{game.status === "round_active" ? (confirmed ? "Locked" : "Guessing") : player.avatar}</small>
          </li>
        );
      })}
      {game.players.length === 0 && <li className="empty-row">Waiting for players</li>}
    </ul>
  );
}
