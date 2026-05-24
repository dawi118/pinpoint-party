import { pickRounds } from "./content";
import { clampLatLng } from "./geo";
import { createId } from "./random";
import { generateRoomCode } from "./roomCodes";
import { scoreGuess } from "./scoring";
import { GameMode, GameState, Guess, Player, StreetMovementPoint } from "./types";

const COLORS = ["#00A6A6", "#FF6B57", "#F6C85F", "#7B61FF", "#2FBF71", "#F55FA6", "#2D9CDB", "#F2994A"];
const AVATARS = ["Compass", "Rocket", "Beacon", "Globe", "Flag", "Spark", "Radar", "Peak"];
export const SCOREBOARD_COUNTDOWN_SECONDS = 15;

export function createInitialGame(options?: {
  roomCode?: string;
  roundCount?: 3 | 5 | 10;
  timerSeconds?: number;
  mode?: GameMode;
}): GameState {
  const roundCount = options?.roundCount ?? 3;
  const roomCode = options?.roomCode ?? generateRoomCode();
  const mode = options?.mode ?? "pinpointer";

  return {
    id: createId("game"),
    roomCode,
    hostSessionId: createId("host"),
    status: "lobby",
    mode,
    roundCount,
    timerSeconds: options?.timerSeconds ?? 180,
    currentRoundIndex: 0,
    revealStep: 0,
    players: [],
    rounds: pickRounds(roundCount, mode),
    guessesByRound: {},
    streetMovementsByRound: {},
    createdAt: new Date().toISOString()
  };
}

export function addPlayer(game: GameState, displayName: string, preferredColor?: string): GameState {
  const usedNames = new Set(game.players.map((player) => player.displayName.toLowerCase()));
  let finalName = displayName.trim() || "Player";
  let suffix = 2;

  while (usedNames.has(finalName.toLowerCase())) {
    finalName = `${displayName.trim() || "Player"} ${suffix}`;
    suffix += 1;
  }

  const player: Player = {
    id: createId("player"),
    displayName: finalName,
    color: preferredColor || COLORS[game.players.length % COLORS.length],
    avatar: AVATARS[game.players.length % AVATARS.length],
    joinedAt: new Date().toISOString(),
    connected: true,
    totalScore: 0
  };

  return {
    ...game,
    players: [...game.players, player].slice(0, 8)
  };
}

export function updateSettings(game: GameState, roundCount: 3 | 5 | 10, timerSeconds: number, mode: GameMode = game.mode ?? "pinpointer"): GameState {
  return {
    ...game,
    mode,
    roundCount,
    timerSeconds,
    rounds: pickRounds(roundCount, mode)
  };
}

export function startRound(game: GameState): GameState {
  const now = Date.now();

  return {
    ...game,
    status: "round_active",
    revealStep: 0,
    roundStartedAt: new Date(now).toISOString(),
    roundEndsAt: new Date(now + game.timerSeconds * 1000).toISOString(),
    scoreboardStartedAt: undefined,
    nextRoundStartsAt: undefined,
    readyPlayerIds: [],
    streetMovementsByRound: {
      ...(game.streetMovementsByRound ?? {}),
      [game.currentRoundIndex]: game.streetMovementsByRound?.[game.currentRoundIndex] ?? {}
    },
    guessesByRound: {
      ...game.guessesByRound,
      [game.currentRoundIndex]: game.guessesByRound[game.currentRoundIndex] ?? []
    }
  };
}

export function upsertGuess(game: GameState, playerId: string, lat: number, lng: number): GameState {
  if (game.status !== "round_active") return game;

  const position = clampLatLng({ lat, lng });
  const roundIndex = game.currentRoundIndex;
  const guesses = game.guessesByRound[roundIndex] ?? [];
  const existing = guesses.find((guess) => guess.playerId === playerId);
  const nextGuess: Guess = {
    playerId,
    lat: position.lat,
    lng: position.lng,
    confirmed: existing?.confirmed ?? false,
    confirmedAt: existing?.confirmedAt
  };

  const nextGuesses = existing
    ? guesses.map((guess) => (guess.playerId === playerId ? nextGuess : guess))
    : [...guesses, nextGuess];

  return {
    ...game,
    guessesByRound: {
      ...game.guessesByRound,
      [roundIndex]: nextGuesses
    }
  };
}

export function logStreetMovement(game: GameState, playerId: string, point: StreetMovementPoint): GameState {
  if (game.status !== "round_active" || game.mode !== "geoguessr_classic") return game;
  if (!game.players.some((player) => player.id === playerId)) return game;

  const roundIndex = game.currentRoundIndex;
  const movementsByRound = game.streetMovementsByRound ?? {};
  const movementsByPlayer = movementsByRound[roundIndex] ?? {};
  const existing = movementsByPlayer[playerId] ?? [];

  return {
    ...game,
    streetMovementsByRound: {
      ...movementsByRound,
      [roundIndex]: {
        ...movementsByPlayer,
        [playerId]: [...existing, point].slice(-160)
      }
    }
  };
}

export function confirmGuess(game: GameState, playerId: string): GameState {
  const roundIndex = game.currentRoundIndex;
  const guesses = game.guessesByRound[roundIndex] ?? [];

  return {
    ...game,
    guessesByRound: {
      ...game.guessesByRound,
      [roundIndex]: guesses.map((guess) =>
        guess.playerId === playerId
          ? { ...guess, confirmed: true, confirmedAt: new Date().toISOString() }
          : guess
      )
    }
  };
}

export function allPlayersConfirmed(game: GameState): boolean {
  if (game.players.length === 0) return false;
  const guesses = game.guessesByRound[game.currentRoundIndex] ?? [];
  return game.players.every((player) => guesses.some((guess) => guess.playerId === player.id && guess.confirmed));
}

export function finishRound(game: GameState): GameState {
  const round = game.rounds[game.currentRoundIndex];
  const guesses = game.guessesByRound[game.currentRoundIndex] ?? [];
  const scoredGuesses = guesses.map((guess) => {
    const result = scoreGuess(guess, { lat: round.actualLat, lng: round.actualLng });
    return {
      ...guess,
      confirmed: true,
      distanceKm: result.distanceKm,
      score: result.score
    };
  });

  const players = game.players.map((player) => {
    const scored = scoredGuesses.find((guess) => guess.playerId === player.id);
    return {
      ...player,
      totalScore: player.totalScore + (scored?.score ?? 0)
    };
  });

  return {
    ...game,
    status: "revealing",
    revealStep: 0,
    players,
    guessesByRound: {
      ...game.guessesByRound,
      [game.currentRoundIndex]: scoredGuesses
    }
  };
}

export function advanceReveal(game: GameState): GameState {
  const guesses = game.guessesByRound[game.currentRoundIndex] ?? [];
  const maxStep = guesses.length + 1;
  return {
    ...game,
    revealStep: Math.min(maxStep, game.revealStep + 1)
  };
}

export function getRoundStreetMovements(game: GameState) {
  return game.streetMovementsByRound?.[game.currentRoundIndex] ?? {};
}

export function getStreetMovementPath(game: GameState, playerId: string) {
  return getRoundStreetMovements(game)[playerId] ?? [];
}

export function showScoreboard(game: GameState): GameState {
  const now = Date.now();

  return {
    ...game,
    status: "scoreboard",
    scoreboardStartedAt: new Date(now).toISOString(),
    nextRoundStartsAt: new Date(now + SCOREBOARD_COUNTDOWN_SECONDS * 1000).toISOString(),
    readyPlayerIds: []
  };
}

export function advanceRound(game: GameState): GameState {
  const nextRound = game.currentRoundIndex + 1;
  if (nextRound >= game.rounds.length) {
    return {
      ...game,
      status: "finished",
      scoreboardStartedAt: undefined,
      nextRoundStartsAt: undefined,
      readyPlayerIds: []
    };
  }

  return startRound({
    ...game,
    currentRoundIndex: nextRound,
    revealStep: 0,
    roundStartedAt: undefined,
    roundEndsAt: undefined,
    scoreboardStartedAt: undefined,
    nextRoundStartsAt: undefined,
    readyPlayerIds: []
  });
}

export function getRoundGuesses(game: GameState) {
  return game.guessesByRound[game.currentRoundIndex] ?? [];
}

export function sortGuessesForReveal(game: GameState) {
  return getRoundGuesses(game)
    .filter((guess) => guess.distanceKm !== undefined)
    .sort((a, b) => (b.distanceKm ?? 0) - (a.distanceKm ?? 0));
}

export function markPlayerReady(game: GameState, playerId: string): GameState {
  if (game.status !== "scoreboard") return game;
  if (!game.players.some((player) => player.id === playerId)) return game;

  const readyPlayerIds = game.readyPlayerIds ?? [];
  if (readyPlayerIds.includes(playerId)) return game;

  return {
    ...game,
    readyPlayerIds: [...readyPlayerIds, playerId]
  };
}

export function getReadyPlayerCount(game: GameState) {
  const playerIds = new Set(game.players.map((player) => player.id));
  return (game.readyPlayerIds ?? []).filter((playerId) => playerIds.has(playerId)).length;
}

export function allPlayersReady(game: GameState): boolean {
  if (game.players.length === 0) return false;
  const readyPlayerIds = new Set(game.readyPlayerIds ?? []);
  return game.players.every((player) => readyPlayerIds.has(player.id));
}

export function rankedPlayers(game: GameState) {
  return [...game.players].sort((a, b) => b.totalScore - a.totalScore);
}

export function getAvailableColors() {
  return COLORS;
}
