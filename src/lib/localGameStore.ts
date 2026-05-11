import { GameState } from "./types";
import { io, Socket } from "socket.io-client";

const gameKey = (roomCode: string) => `pinpoint-party:game:${roomCode}`;
const channelName = (roomCode: string) => `pinpoint-party:${roomCode}`;
let socket: Socket | undefined;
const memoryCache = new Map<string, GameState>();

export function loadGame(roomCode: string): GameState | undefined {
  const cached = memoryCache.get(roomCode);
  if (cached) return cached;

  const raw = localStorage.getItem(gameKey(roomCode));
  if (!raw) return undefined;

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

  if (!activeSocket) return local;

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
  let lastStoredGame = localStorage.getItem(gameKey(roomCode));

  const storagePollTimer = window.setInterval(() => {
    const raw = localStorage.getItem(gameKey(roomCode));
    if (!raw || raw === lastStoredGame) return;

    try {
      const game = JSON.parse(raw) as GameState;
      lastStoredGame = raw;
      memoryCache.set(roomCode, game);
      onChange(game);
    } catch {
      // Ignore malformed local cache entries.
    }
  }, 750);

  cleanups.push(() => window.clearInterval(storagePollTimer));

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(channelName(roomCode));
    channel.onmessage = (event) => {
      cacheGame(event.data as GameState);
      lastStoredGame = localStorage.getItem(gameKey(roomCode));
      onChange(event.data as GameState);
    };
    cleanups.push(() => channel.close());
  }

  if (activeSocket) {
    const handleUpdate = (game: GameState) => {
      if (game.roomCode !== roomCode) return;
      cacheGame(game);
      lastStoredGame = localStorage.getItem(gameKey(roomCode));
      onChange(game);
    };

    activeSocket.emit("game:join-room", roomCode);
    activeSocket.on("game:update", handleUpdate);
    void fetchGame(roomCode).then((game) => {
      if (game) onChange(game);
    });
    cleanups.push(() => activeSocket.off("game:update", handleUpdate));

    let polling = false;
    const pollTimer = window.setInterval(() => {
      if (polling) return;
      polling = true;

      void activeSocket.timeout(1200).emitWithAck("game:load", roomCode)
        .then((remote) => {
          if (!remote) return;
          const game = remote as GameState;
          cacheGame(game);
          lastStoredGame = localStorage.getItem(gameKey(roomCode));
          onChange(game);
        })
        .catch(() => undefined)
        .finally(() => {
          polling = false;
        });
    }, 1500);

    cleanups.push(() => window.clearInterval(pollTimer));
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
