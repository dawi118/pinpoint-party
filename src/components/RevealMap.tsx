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
  const progress = revealGuesses.length
    ? Math.min(100, (game.revealStep / (revealGuesses.length + 1)) * 100)
    : 100;

  return (
    <section className="reveal-layout">
      <RevealGuessMap game={game} showAnswer={showAnswer} visibleGuesses={visibleGuesses} />
      <div className="reveal-callout">
        {showAnswer ? (
          <>
            <span className="kicker">True location</span>
            <h2>{round.locationLabel}</h2>
            <p>{round.attribution}</p>
            <div className="reveal-progress" aria-hidden="true">
              <span style={{ width: "100%" }} />
            </div>
          </>
        ) : current && player ? (
          <>
            <span className="kicker">Guess {Math.min(game.revealStep, revealGuesses.length)} of {revealGuesses.length}</span>
            <h2>{player.displayName}</h2>
            <p>The room is moving closer to the answer.</p>
            <div className="reveal-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <strong>Scores hidden</strong>
          </>
        ) : (
          <>
            <span className="kicker">Scores on the doors</span>
            <h2>Drumroll please...</h2>
            <p>The furthest guess will appear first.</p>
            <div className="reveal-progress" aria-hidden="true">
              <span style={{ width: "0%" }} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function RevealGuessMap({
  game,
  showAnswer,
  visibleGuesses
}: {
  game: GameState;
  showAnswer: boolean;
  visibleGuesses: ReturnType<typeof sortGuessesForReveal>;
}) {
  const round = game.rounds[game.currentRoundIndex];

  return (
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
  );
}
