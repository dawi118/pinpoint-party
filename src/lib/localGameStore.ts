import { GameState } from "./types";

const gameKey = (roomCode: string) => `pinpoint-party:game:${roomCode}`;
const channelName = (roomCode: string) => `pinpoint-party:${roomCode}`;

export function loadGame(roomCode: string): GameState | undefined {
  const raw = localStorage.getItem(gameKey(roomCode));
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return undefined;
  }
}

export function saveGame(game: GameState) {
  localStorage.setItem(gameKey(game.roomCode), JSON.stringify(game));

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(channelName(game.roomCode));
    channel.postMessage(game);
    channel.close();
  }
}

export function subscribeToGame(roomCode: string, onChange: (game: GameState) => void) {
  if (!("BroadcastChannel" in window)) return () => undefined;

  const channel = new BroadcastChannel(channelName(roomCode));
  channel.onmessage = (event) => onChange(event.data as GameState);

  return () => channel.close();
}
