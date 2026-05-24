import { LogIn, Play, Sparkles } from "lucide-react";
import { createInitialGame } from "../lib/gameState";
import { saveGame, saveGameAndWait } from "../lib/localGameStore";
import { generateRoomCode } from "../lib/roomCodes";
import { AppLogo } from "./AppLogo";

const MENU_IMAGES = [
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85"
];

export function MainMenu() {
  const hostGame = async () => {
    const next = createInitialGame({ roomCode: generateRoomCode() });
    const synced = await saveGameAndWait(next);
    if (!synced) saveGame(next);
    window.location.href = `/host/${next.roomCode}`;
  };

  return (
    <main className="app main-menu">
      <AppLogo />
      <section className="menu-stage">
        <div className="menu-art" aria-hidden="true">
          {MENU_IMAGES.map((imageUrl, index) => (
            <span key={imageUrl} className={`menu-photo menu-photo-${index + 1}`} style={{ backgroundImage: `url(${imageUrl})` }} />
          ))}
          <div className="menu-radar">
            <Sparkles size={28} />
          </div>
        </div>
        <div className="menu-copy">
          <span className="kicker">TV-led location party game</span>
          <h1>PinPoint Party</h1>
          <p>Race from clue to guess, then watch every pin reveal who found the place.</p>
          <div className="menu-actions">
            <button className="primary-action" type="button" onClick={hostGame}>
              <Play size={20} /> Host game
            </button>
            <a className="secondary-action" href="/join">
              <LogIn size={20} /> Join game
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
