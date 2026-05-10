import { formatDistance } from "../lib/geo";
import { sortGuessesForReveal } from "../lib/gameState";
import { GameState } from "../lib/types";
import { WorldGuessMap } from "./WorldGuessMap";

export function RevealMap({ game }: { game: GameState }) {
  const round = game.rounds[game.currentRoundIndex];
  const revealGuesses = sortGuessesForReveal(game);
  const visibleGuesses = revealGuesses.slice(0, game.revealStep);
  const current = visibleGuesses.at(-1);
  const player = current ? game.players.find((item) => item.id === current.playerId) : undefined;
  const showAnswer = game.revealStep > revealGuesses.length;

  return (
    <section className="reveal-layout">
      <WorldGuessMap
        disabled
        actual={showAnswer ? { lat: round.actualLat, lng: round.actualLng } : undefined}
        pins={visibleGuesses.map((guess) => {
          const guessPlayer = game.players.find((item) => item.id === guess.playerId);
          return {
            id: guess.playerId,
            label: guessPlayer?.displayName ?? "Player",
            color: guessPlayer?.color ?? "#ffffff",
            position: { lat: guess.lat, lng: guess.lng }
          };
        })}
      />
      <div className="reveal-callout">
        {current && player ? (
          <>
            <span className="kicker">Reveal {Math.min(game.revealStep, revealGuesses.length)} of {revealGuesses.length}</span>
            <h2>{player.displayName}</h2>
            <p>{formatDistance(current.distanceKm)} away</p>
            <strong>{current.score?.toLocaleString()} points</strong>
          </>
        ) : showAnswer ? (
          <>
            <span className="kicker">True location</span>
            <h2>{round.locationLabel}</h2>
            <p>{round.attribution}</p>
          </>
        ) : (
          <>
            <span className="kicker">Reveal ready</span>
            <h2>Furthest guess appears first</h2>
            <p>Advance through the room, then reveal the answer.</p>
          </>
        )}
      </div>
    </section>
  );
}
