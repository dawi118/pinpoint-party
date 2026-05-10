import { formatDistance } from "../lib/geo";
import { getRoundGuesses, rankedPlayers } from "../lib/gameState";
import { GameState } from "../lib/types";

export function Scoreboard({ game, compact = false }: { game: GameState; compact?: boolean }) {
  const guesses = getRoundGuesses(game);

  return (
    <ol className={`scoreboard ${compact ? "compact" : ""}`}>
      {rankedPlayers(game).map((player, index) => {
        const guess = guesses.find((item) => item.playerId === player.id);
        return (
          <li key={player.id}>
            <span className="rank">{index + 1}</span>
            <span className="player-dot" style={{ background: player.color }} />
            <div>
              <strong>{player.displayName}</strong>
              {!compact && <small>{formatDistance(guess?.distanceKm)}</small>}
            </div>
            <b>{player.totalScore.toLocaleString()}</b>
          </li>
        );
      })}
    </ol>
  );
}
