import { GameState } from "./types";
import { io, Socket } from "socket.io-client";

const gameKey = (roomCode: string) => `pinpoint-party:game:${roomCode}`;
const channelName = (roomCode: string) => `pinpoint-party:${roomCode}`;
let socket: Socket | undefined;
const memoryCache = new Map<string, GameState>();

export function loadGame(roomCode: string): GameState | undefined {
  const raw = localStorage.getItem(gameKey(roomCode));
  if (!raw) return memoryCache.get(roomCode);

  try {
    const game = JSON.parse(raw) as GameState;
    memoryCache.set(roomCode, game);
    return game;
  } catch {
    return undefined;
  }
}

export async function fetchGame(roomCode: string): Promise<GameState | undefined> {
  const local = loadGame(roomCode);
  const activeSocket = getSocket();

  if (!activeSocket || local) return local;

  const remote = await activeSocket.timeout(3000).emitWithAck("game:load", roomCode).catch(() => undefined);
  if (!remote) {
    if (local) activeSocket.emit("game:save", local);
    return local;
  }

  cacheGame(remote as GameState);
  return remote as GameState;
}

export function saveGame(game: GameState) {
  cacheGame(game);
  getSocket()?.emit("game:save", game);

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(channelName(game.roomCode));
    channel.postMessage(game);
    channel.close();
  }
}

export async function saveGameAndWait(game: GameState): Promise<boolean> {
  cacheGame(game);

  const activeSocket = getSocket();
  if (!activeSocket) return false;

  const connected = await waitForSocket(activeSocket, 3000);
  if (!connected) return false;

  const result = await activeSocket.timeout(3000).emitWithAck("game:save", game).catch(() => undefined);
  return Boolean((result as { ok?: boolean } | undefined)?.ok);
}

export function subscribeToGame(roomCode: string, onChange: (game: GameState) => void) {
  const cleanups: Array<() => void> = [];
  const activeSocket = getSocket();
  const key = gameKey(roomCode);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== key || !event.newValue) return;

    try {
      const game = JSON.parse(event.newValue) as GameState;
      cacheGame(game);
      onChange(game);
    } catch {
      return;
    }
  };

  window.addEventListener("storage", handleStorage);
  cleanups.push(() => window.removeEventListener("storage", handleStorage));

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(channelName(roomCode));
    channel.onmessage = (event) => {
      cacheGame(event.data as GameState);
      onChange(event.data as GameState);
    };
    cleanups.push(() => channel.close());
  }

  if (activeSocket) {
    const handleUpdate = (game: GameState) => {
      if (game.roomCode !== roomCode) return;
      cacheGame(game);
      onChange(game);
    };

    activeSocket.emit("game:join-room", roomCode);
    activeSocket.on("game:update", handleUpdate);
    void fetchGame(roomCode).then((game) => {
      if (game) onChange(game);
    });
    cleanups.push(() => activeSocket.off("game:update", handleUpdate));
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

function cacheGame(game: GameState) {
  memoryCache.set(game.roomCode, game);
  localStorage.setItem(gameKey(game.roomCode), JSON.stringify(game));
}

function getSocket() {
  if (typeof window === "undefined") return undefined;
  if (socket) return socket;

  socket = io({
    transports: ["websocket", "polling"],
    reconnectionDelayMax: 3000
  });

  return socket;
}

function waitForSocket(activeSocket: Socket, timeoutMs: number): Promise<boolean> {
  if (activeSocket.connected) return Promise.resolve(true);

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      resolve(false);
    }, timeoutMs);

    const handleConnect = () => {
      cleanup();
      resolve(true);
    };

    const handleError = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      window.clearTimeout(timeout);
      activeSocket.off("connect", handleConnect);
      activeSocket.off("connect_error", handleError);
    };

    activeSocket.once("connect", handleConnect);
    activeSocket.once("connect_error", handleError);
  });
}
