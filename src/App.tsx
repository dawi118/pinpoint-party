import { HostScreen } from "./components/HostScreen";
import { JoinScreen } from "./components/JoinScreen";
import { MainMenu } from "./components/MainMenu";
import { PlayerScreen } from "./components/PlayerScreen";

function getRoute() {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(window.location.search);

  if (parts[0] === "host") return { name: "host", roomCode: parts[1] };
  if (parts[0] === "join") return { name: "join", roomCode: params.get("room") ?? undefined };
  if (parts[0] === "player") return { name: "player", roomCode: parts[1], playerId: params.get("player") ?? undefined };
  return { name: "menu" };
}

export function App() {
  const route = getRoute();

  if (route.name === "join") return <JoinScreen initialRoomCode={route.roomCode} />;
  if (route.name === "player" && route.roomCode) {
    return <PlayerScreen roomCode={route.roomCode} playerId={route.playerId} />;
  }
  if (route.name === "host" && route.roomCode) return <HostScreen roomCode={route.roomCode} />;

  return <MainMenu />;
}
