export type GameStatus = "lobby" | "round_active" | "revealing" | "scoreboard" | "finished";

export type MediaRound = {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  actualLat: number;
  actualLng: number;
  locationLabel: string;
  contentPack: string;
  difficulty: "easy" | "medium" | "hard";
  attribution: string;
};

export type Player = {
  id: string;
  displayName: string;
  color: string;
  avatar: string;
  joinedAt: string;
  connected: boolean;
  totalScore: number;
};

export type Guess = {
  playerId: string;
  lat: number;
  lng: number;
  confirmed: boolean;
  confirmedAt?: string;
  distanceKm?: number;
  score?: number;
};

export type GameState = {
  id: string;
  roomCode: string;
  hostSessionId: string;
  status: GameStatus;
  roundCount: 3 | 5 | 10;
  timerSeconds: number;
  currentRoundIndex: number;
  roundStartedAt?: string;
  roundEndsAt?: string;
  scoreboardStartedAt?: string;
  nextRoundStartsAt?: string;
  revealStep: number;
  readyPlayerIds?: string[];
  players: Player[];
  rounds: MediaRound[];
  guessesByRound: Record<number, Guess[]>;
  createdAt: string;
};
