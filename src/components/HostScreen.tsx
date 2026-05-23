import { ArrowRight, Clock, Copy, Globe2, MapPinned, Play, RotateCcw, Route, Trophy, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  advanceReveal,
  advanceRound,
  allPlayersConfirmed,
  allPlayersReady,
  createInitialGame,
  finishRound,
  getReadyPlayerCount,
  getRoundGuesses,
  showScoreboard,
  sortGuessesForReveal,
  startRound,
  updateSettings
} from "../lib/gameState";
import { fetchGame, fetchRemoteGame, loadGame, saveGame, saveGameAndWait, subscribeToGame } from "../lib/localGameStore";
import { generateRoomCode } from "../lib/roomCodes";
import { GameMode, GameState } from "../lib/types";
import { EarthStreetView } from "./EarthStreetView";
import { RevealMap } from "./RevealMap";
import { Scoreboard } from "./Scoreboard";

const SCENIC_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
];

export function HostScreen({ roomCode }: { roomCode?: string }) {
  const [game, setGame] = useState<GameState | undefined>(() => (roomCode ? loadGame(roomCode) : undefined));
  const [roundCount, setRoundCount] = useState<3 | 5 | 10>(3);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [mode, setMode] = useState<GameMode>("pinpointer");
  const [now, setNow] = useState(Date.now());
  const [mobileOrigin, setMobileOrigin] = useState<string | undefined>();

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
    if (!roomCode || !game) return;
    let active = true;

    void fetchRemoteGame(roomCode).then((remoteGame) => {
      if (!active) return;
      if (remoteGame) {
        setGame(remoteGame);
        return;
      }

      void saveGameAndWait(game);
    });

    return () => {
      active = false;
    };
  }, [game?.id, roomCode]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;

    const loadNetworkInfo = async () => {
      const info = await fetch("/api/network-info")
        .then((response) => response.ok ? response.json() as Promise<{ preferredOrigin?: string }> : undefined)
        .catch(() => undefined);

      if (active) setMobileOrigin(info?.preferredOrigin?.replace(/\/$/, ""));
    };

    void loadNetworkInfo();
    const timer = window.setInterval(loadNetworkInfo, 10000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
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
    }, game.revealStep === 0 ? 3600 : 2100);

    return () => window.clearTimeout(timer);
  }, [game?.revealStep, game?.roomCode, game?.status]);

  useEffect(() => {
    if (!game || game.status !== "revealing") return undefined;
    const revealComplete = game.revealStep > sortGuessesForReveal(game).length;
    if (!revealComplete) return undefined;

    const timer = window.setTimeout(() => {
      setGame((current) => {
        if (!current || current.status !== "revealing") return current;
        if (current.revealStep <= sortGuessesForReveal(current).length) return current;

        const next = showScoreboard(current);
        saveGame(next);
        return next;
      });
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [game?.revealStep, game?.roomCode, game?.status]);

  useEffect(() => {
    if (!game || game.status !== "scoreboard") return;

    const isFinalRound = game.currentRoundIndex + 1 >= game.rounds.length;
    const countdownExpired = game.nextRoundStartsAt ? new Date(game.nextRoundStartsAt).getTime() <= now : false;
    const shouldAdvance = countdownExpired || (!isFinalRound && allPlayersReady(game));

    if (shouldAdvance) {
      const next = advanceRound(game);
      setGame(next);
      saveGame(next);
    }
  }, [game, now]);

  const joinUrl = useMemo(() => {
    if (!game) return "";
    const publicOrigin = import.meta.env.VITE_PUBLIC_ORIGIN as string | undefined;
    const origin = publicOrigin?.replace(/\/$/, "") || mobileOrigin || window.location.origin;
    return `${origin}/join?room=${game.roomCode}`;
  }, [game, mobileOrigin]);
  const isLocalhostOrigin = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (!roomCode || !game) {
    return (
      <main className="app host-create">
        <section className="host-hero">
          <ScenicBackdrop />
          <div>
            <span className="kicker">TV-led mobile party game</span>
            <h1>Pinpoint Party</h1>
            <p>Open a room on the big screen, let players join by code, then watch every guess collapse toward the answer.</p>
          </div>
          <form
            className="setup-panel"
            onSubmit={async (event) => {
              event.preventDefault();
              const next = createInitialGame({ roomCode: generateRoomCode(), roundCount, timerSeconds, mode });
              const synced = await saveGameAndWait(next);
              if (!synced) saveGame(next);
              window.location.href = `/host/${next.roomCode}`;
            }}
          >
            <ModeMenu value={mode} onChange={setMode} />
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
  const readyCount = getReadyPlayerCount(game);
  const isFinalRound = game.currentRoundIndex + 1 >= game.rounds.length;
  const nextRoundCountdown = game.nextRoundStartsAt
    ? Math.max(0, Math.ceil((new Date(game.nextRoundStartsAt).getTime() - now) / 1000))
    : 0;
  const roundCountdown = game.roundEndsAt
    ? Math.max(0, Math.min(game.timerSeconds, Math.ceil((new Date(game.roundEndsAt).getTime() - now) / 1000)))
    : game.timerSeconds;
  const displayedSeconds =
    game.status === "round_active"
      ? roundCountdown
      : game.status === "scoreboard"
        ? nextRoundCountdown
        : 0;
  const showClock = game.status === "round_active" || game.status === "scoreboard";

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
          {showClock && (
            <span><Clock size={16} /> {Math.floor(displayedSeconds / 60)}:{String(displayedSeconds % 60).padStart(2, "0")}</span>
          )}
          <span>Round {game.currentRoundIndex + 1}/{game.rounds.length}</span>
          <span>{getModeLabel(game.mode ?? "pinpointer")}</span>
        </div>
      </header>

      {game.status === "lobby" && (
        <section className="lobby-grid">
          <div className="join-band">
            <ScenicBackdrop />
            <span className="kicker">Join on your phone</span>
            <h1>{game.roomCode}</h1>
            <JoinQrCode value={joinUrl} />
            <p className="join-url">{joinUrl}</p>
            {isLocalhostOrigin && !mobileOrigin && (
              <p className="join-warning">Open the host from the LAN address so phones do not scan localhost.</p>
            )}
            <button className="secondary-action" type="button" onClick={() => navigator.clipboard?.writeText(joinUrl)}>
              <Copy size={18} /> Copy join link
            </button>
          </div>
          <div className="host-controls">
            <ModeMenu
              value={game.mode ?? "pinpointer"}
              onChange={(nextMode) => persist(updateSettings(game, game.roundCount, game.timerSeconds, nextMode))}
            />
            <label>
              <span>Rounds</span>
              <select
                value={game.roundCount}
                onChange={(event) => persist(updateSettings(game, Number(event.target.value) as 3 | 5 | 10, game.timerSeconds, game.mode ?? "pinpointer"))}
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
                onChange={(event) => persist(updateSettings(game, game.roundCount, Number(event.target.value), game.mode ?? "pinpointer"))}
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
          {(game.mode ?? "pinpointer") === "pin_central" ? (
            <CentralPhotoGrid game={game} />
          ) : isHeliViewMode(game.mode ?? "pinpointer") ? (
            <EarthStreetView round={round} />
          ) : (
            <img src={round.url} alt="Round clue" />
          )}
          <div className="round-overlay">
            <span className="kicker">{round.contentPack}</span>
            <h1>{getRoundPrompt(game.mode ?? "pinpointer")}</h1>
            <p>{confirmedCount} of {game.players.length} players locked in</p>
          </div>
          <PlayerList game={game} />
        </section>
      )}

      {game.status === "revealing" && (
        <section className="host-flow">
          <RevealMap game={game} />
          <div className="flow-status" aria-live="polite">
            {revealComplete ? (
              <span><Trophy size={18} /> Scores coming up</span>
            ) : (
              <span><ArrowRight size={18} /> Reveal advancing automatically</span>
            )}
          </div>
        </section>
      )}

      {game.status === "scoreboard" && (
        <section className="scoreboard-stage">
          <span className="kicker">Round complete</span>
          <h1>{round.locationLabel}</h1>
          <Scoreboard game={game} />
          <div className="ready-panel">
            {isFinalRound ? (
              <>
                <span className="kicker">Game complete</span>
                <strong>Final leaderboard in {nextRoundCountdown}s</strong>
              </>
            ) : (
              <>
                <span className="kicker">Next round starts automatically</span>
                <strong>{readyCount} of {game.players.length} players ready</strong>
                <p>Starting in {nextRoundCountdown}s unless everyone readies up first.</p>
              </>
            )}
          </div>
        </section>
      )}

      {game.status === "finished" && (
        <section className="scoreboard-stage final">
          <span className="kicker">Final leaderboard</span>
          <h1>{game.players[0] ? "Champion crowned" : "Game complete"}</h1>
          <Scoreboard game={game} showDistances={false} />
          <a className="primary-action final-action" href="/">
            <RotateCcw size={18} /> New game
          </a>
        </section>
      )}
    </main>
  );
}

function ScenicBackdrop() {
  return (
    <div className="scenic-backdrop" aria-hidden="true">
      {SCENIC_IMAGES.map((imageUrl) => (
        <span key={imageUrl} style={{ backgroundImage: `url(${imageUrl})` }} />
      ))}
    </div>
  );
}

function JoinQrCode({ value }: { value: string }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let active = true;

    if (!value) {
      setImageUrl("");
      return undefined;
    }

    void QRCode.toDataURL(value, {
      width: 240,
      margin: 1,
      color: {
        dark: "#111827",
        light: "#ffffff"
      }
    }).then((nextImageUrl) => {
      if (active) setImageUrl(nextImageUrl);
    });

    return () => {
      active = false;
    };
  }, [value]);

  return (
    <div className="join-qr">
      {imageUrl ? <img src={imageUrl} alt="QR code to join this room" /> : <span />}
    </div>
  );
}

function ModeMenu({ value, onChange }: { value: GameMode; onChange: (mode: GameMode) => void }) {
  return (
    <fieldset className="mode-menu">
      <legend>Game mode</legend>
      <button type="button" className={value === "pinpointer" ? "selected" : ""} onClick={() => onChange("pinpointer")}>
        <MapPinned size={18} />
        <span>
          <strong>Pinpointer</strong>
          <small>Famous landmarks, closest wins</small>
        </span>
      </button>
      <button type="button" className={value === "pin_central" ? "selected" : ""} onClick={() => onChange("pin_central")}>
        <Globe2 size={18} />
        <span>
          <strong>PinPoint Central</strong>
          <small>Four clues, find the centre</small>
        </span>
      </button>
      <button type="button" className={isHeliViewMode(value) ? "selected" : ""} onClick={() => onChange("heliview")}>
        <Route size={18} />
        <span>
          <strong>HeliView</strong>
          <small>Scroll city maps with buildings</small>
        </span>
      </button>
    </fieldset>
  );
}

function getModeLabel(mode: GameMode) {
  if (mode === "pin_central") return "PinPoint Central";
  if (isHeliViewMode(mode)) return "HeliView";
  return "Pinpointer";
}

function getRoundPrompt(mode: GameMode) {
  if (mode === "pin_central") return "Where is the centre of these four places?";
  if (isHeliViewMode(mode)) return "Explore the city map, then pinpoint it";
  return "Where was this taken?";
}

function isHeliViewMode(mode: GameMode) {
  return mode === "heliview" || mode === "earth_classic";
}

function CentralPhotoGrid({ game }: { game: GameState }) {
  const round = game.rounds[game.currentRoundIndex];
  const images = round.centralImages ?? [];

  return (
    <div className="central-photo-grid">
      {images.map((image) => (
        <figure key={image.id}>
          <img src={image.url} alt={image.label} loading="eager" />
          <figcaption>{image.label}</figcaption>
        </figure>
      ))}
    </div>
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
