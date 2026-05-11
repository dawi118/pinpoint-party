import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { networkInterfaces } from "node:os";
import { Server as SocketServer } from "socket.io";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "pinpoint-network-info",
      configureServer(server) {
        installGameSocketServer(server.httpServer);

        server.middlewares.use("/api/network-info", (request, response) => {
          const host = request.headers.host ?? "";
          const origin = `http://${host}`;
          const port = host.split(":")[1] ?? "5173";
          const lanOrigins = getLanAddresses().map((address) => `http://${address}:${port}`);
          const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({
            origin,
            lanOrigins,
            preferredOrigin: isLocalhost ? lanOrigins[0] ?? origin : origin
          }));
        });
      }
    }
  ],
  server: {
    port: 5173
  }
});

type GameSocketHost = NonNullable<ViteDevServer["httpServer"]> & {
  pinpointPartyIo?: SocketServer;
  pinpointPartyGames?: Map<string, unknown>;
};

function installGameSocketServer(httpServer: GameSocketHost | null) {
  if (!httpServer || httpServer.pinpointPartyIo) return;

  const games = httpServer.pinpointPartyGames ?? new Map<string, unknown>();
  httpServer.pinpointPartyGames = games;

  const io = new SocketServer(httpServer, {
    cors: {
      origin: true
    }
  });

  httpServer.pinpointPartyIo = io;
  wireGameSocketHandlers(io, games);
}

function wireGameSocketHandlers(io: SocketServer, games: Map<string, unknown>) {
  io.on("connection", (socket) => {
    socket.on("game:join-room", (roomCode) => {
      if (typeof roomCode === "string") socket.join(roomCode);
    });

    socket.on("game:load", (roomCode, reply) => {
      if (typeof roomCode !== "string") {
        reply?.(null);
        return;
      }

      socket.join(roomCode);
      reply?.(games.get(roomCode) ?? null);
    });

    socket.on("game:save", (game, reply) => {
      if (!game?.roomCode) {
        reply?.({ ok: false });
        return;
      }

      games.set(game.roomCode, game);
      socket.join(game.roomCode);
      io.to(game.roomCode).emit("game:update", game);
      reply?.({ ok: true, roomCode: game.roomCode });
    });
  });
}

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flatMap((items) => items ?? [])
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}
