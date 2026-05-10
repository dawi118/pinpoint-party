import express from "express";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 4173);
const games = new Map();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
});

app.use(express.static(distDir));
app.use((request, response, next) => {
  if (request.method !== "GET") {
    next();
    return;
  }

  response.sendFile(path.join(distDir, "index.html"));
});

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

httpServer.listen(port, "0.0.0.0", () => {
  const addresses = getLanAddresses();
  console.log(`Pinpoint Party host running at http://localhost:${port}`);
  addresses.forEach((address) => console.log(`LAN: http://${address}:${port}`));
});

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flatMap((items) => items ?? [])
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}
