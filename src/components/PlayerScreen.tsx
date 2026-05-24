import { Check, Clock, MapPin, MapPinned, RotateCcw, Route, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { confirmGuess, getRoundGuesses, markPlayerReady, upsertGuess } from "../lib/gameState";
import { Coordinates, formatDistance } from "../lib/geo";
import { fetchGame, loadGame, saveGame, subscribeToGame } from "../lib/localGameStore";
import { GameState, Guess } from "../lib/types";
import { EarthStreetView } from "./EarthStreetView";
import { Scoreboard } from "./Scoreboard";
import { WorldGuessMap } from "./WorldGuessMap";

export function PlayerScreen({ roomCode, playerId }: { roomCode: string; playerId?: string }) {
  const [game, setGame] = useState<GameState | undefined>(() => loadGame(roomCode));
  const [now, setNow] = useState(Date.now());
  const [classicView, setClassicView] = useState<"street" | "map">("street");
  const [centralPinMode, setCentralPinMode] = useState<"placeholder" | "scoring">("scoring");
  const [placeholderPins, setPlaceholderPins] = useState<Coordinates[]>([]);

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

  useEffect(() => {
    if (game?.status === "round_active" && isHeliViewMode(game.mode ?? "pinpointer")) {
      setClassicView("street");
    }
  }, [game?.currentRoundIndex, game?.mode, game?.status]);

  useEffect(() => {
    setPlaceholderPins([]);
    setCentralPinMode("scoring");
  }, [game?.currentRoundIndex, game?.mode, game?.status]);

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
    const mode = game.mode ?? "pinpointer";
    const isCentral = mode === "pin_central";
    const helperCenter = isCentral ? getAveragePosition(placeholderPins) : undefined;
    const helperPins = isCentral
      ? placeholderPins.map((position, index) => ({
          id: `placeholder-${index}`,
          label: `${index + 1}`,
          color: "#58d5ff",
          position
        }))
      : [];
    const handleMapChange = (position: Coordinates) => {
      if (isCentral && centralPinMode === "placeholder") {
        setPlaceholderPins((current) => current.length >= 4 ? current : [...current, position]);
        return;
      }

      persist(upsertGuess(game, player.id, position.lat, position.lng));
    };
    const confirmDock = (
      <section className="confirm-dock">
        <div>
          <span className="kicker">{isCentral ? "PinPoint Central" : isHeliViewMode(mode) ? `${getExploreModeLabel(mode)} / Round` : "Round"} {game.currentRoundIndex + 1}</span>
          <strong>{guess?.confirmed ? "Guess confirmed" : isCentral ? "Place your scoring pin" : isHeliViewMode(mode) ? "Explore, then pin it" : "Place your pin"}</strong>
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
    );

    if (isHeliViewMode(mode)) {
      return (
        <main className="app player-game earth-classic-player">
          <header className="phone-top">
            <div>
              <span className="player-dot" style={{ background: player.color }} />
              <strong>{player.displayName}</strong>
            </div>
            <span><Clock size={16} /> {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, "0")}</span>
          </header>
          <section className="classic-view-tabs" aria-label={`${getExploreModeLabel(mode)} view`}>
            <button className={classicView === "street" ? "selected" : ""} type="button" onClick={() => setClassicView("street")}>
              <Route size={17} /> Explore
            </button>
            <button className={classicView === "map" ? "selected" : ""} type="button" onClick={() => setClassicView("map")}>
              <MapPinned size={17} /> Map
            </button>
          </section>
          {confirmDock}
          <section className="classic-play-surface">
            {classicView === "street" ? (
              <EarthStreetView round={round} />
            ) : (
              <WorldGuessMap
                value={guess ? { lat: guess.lat, lng: guess.lng } : undefined}
                disabled={guess?.confirmed}
                onChange={handleMapChange}
              />
            )}
          </section>
        </main>
      );
    }

    return (
      <main className={`app player-game ${isCentral ? "pin-central-player" : ""}`}>
        <header className="phone-top">
          <div>
            <span className="player-dot" style={{ background: player.color }} />
            <strong>{player.displayName}</strong>
          </div>
          <span><Clock size={16} /> {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2, "0")}</span>
        </header>
        {confirmDock}
        {isCentral && (
          <section className="central-pin-tools" aria-label="PinPoint Central pin tools">
            <div className="pin-mode-toggle">
              <button
                type="button"
                className={centralPinMode === "placeholder" ? "selected" : ""}
                disabled={guess?.confirmed || placeholderPins.length >= 4}
                onClick={() => setCentralPinMode("placeholder")}
              >
                <MapPin size={16} /> Placeholder pins
              </button>
              <button
                type="button"
                className={centralPinMode === "scoring" ? "selected" : ""}
                disabled={guess?.confirmed}
                onClick={() => setCentralPinMode("scoring")}
              >
                <Check size={16} /> Scoring pin
              </button>
            </div>
            <button
              className="secondary-action"
              type="button"
              disabled={guess?.confirmed || placeholderPins.length === 0}
              onClick={() => setPlaceholderPins([])}
            >
              <RotateCcw size={16} /> Reset {placeholderPins.length}/4
            </button>
          </section>
        )}
        <WorldGuessMap
          value={guess ? { lat: guess.lat, lng: guess.lng } : undefined}
          disabled={guess?.confirmed}
          onChange={handleMapChange}
          helperPins={helperPins}
          helperCenter={helperCenter}
        />
      </main>
    );
  }

  const ownGuess = guesses.find((item) => item.playerId === player.id);
  const isFinalRound = game.currentRoundIndex + 1 >= game.rounds.length;
  const isReady = (game.readyPlayerIds ?? []).includes(player.id);

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
          <>
            <PlayerResult guess={ownGuess} locationLabel={round.locationLabel} />
            {isFinalRound ? (
              <p className="final-waiting">Final leaderboard is coming up on the main screen.</p>
            ) : (
              <button
                className="primary-action"
                type="button"
                disabled={isReady}
                onClick={() => persist(markPlayerReady(game, player.id))}
              >
                <Check size={18} /> {isReady ? "Ready" : "Ready for next round"}
              </button>
            )}
          </>
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

function isHeliViewMode(mode: GameState["mode"]) {
  return mode === "heliview" || mode === "earth_classic";
}

function getExploreModeLabel(mode: GameState["mode"]) {
  return mode === "earth_classic" ? "PinPoint Classic" : "HeliView";
}

function getAveragePosition(points: Coordinates[]): Coordinates | undefined {
  if (points.length < 2) return undefined;

  return {
    lat: points.reduce((total, point) => total + point.lat, 0) / points.length,
    lng: points.reduce((total, point) => total + point.lng, 0) / points.length
  };
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
