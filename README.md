# Pinpoint Party

A phone-first, TV-led location guessing party game. The host opens a room on the big screen, players join from their phones, drop a pin on a world map, and the reveal walks through guesses from furthest to closest before showing the true location.

This repo implements the first playable web prototype based on the supplied game plan.

## What Works Now

- Host can create a room with 3, 5, or 10 rounds.
- Players can join with a four-character room code.
- Up to 8 players are supported.
- Host sees lobby, round clue, confirmation status, reveal, scoreboard, and final state.
- Player phones can place and confirm pins on a responsive world map.
- Guessing uses MapLibre GL JS with an OpenFreeMap street-map style, including pinch and wheel zoom.
- Rounds end when all players confirm or the timer expires.
- Distances use the Haversine formula.
- Scores use the exponential 5000-point formula from the plan.
- Reveal order auto-steps from furthest guess to closest guess, then the answer.
- Scores stay hidden until the reveal slideshow has finished.
- Rounds are selected randomly from a geographically accurate image bank with easy, medium, and hard clues.

The app can run as a single-browser prototype through `BroadcastChannel` and `localStorage`, or as a same-Wi-Fi party server through Socket.IO. `supabase/schema.sql` is included for the production realtime backend.

## Tech Stack

- Vite
- React
- TypeScript
- CSS
- MapLibre GL JS
- OpenFreeMap vector street map style
- Express + Socket.IO LAN host
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

Open the host app:

```text
http://localhost:5173/
```

Create a room, then open the join link in another tab to simulate a phone.

## Play On Phones Over Wi-Fi

For real phones on the same Wi-Fi network, use the LAN host server:

```bash
npm run host
```

Open the printed LAN URL on the laptop first, such as:

```text
http://192.168.1.191:4173/
```

Players should scan or open the join URL with that same laptop IP address. `localhost` only means "this device", so a phone visiting `localhost` will look at the phone itself, not the laptop. The LAN server keeps room state in memory with Socket.IO, so phones and the host share the same lobby, guesses, reveal, and scoreboard.

## Project Structure

```text
src
  components
    HostScreen.tsx
    JoinScreen.tsx
    PlayerScreen.tsx
    RevealMap.tsx
    Scoreboard.tsx
    WorldGuessMap.tsx
  lib
    content.ts
    gameState.ts
    geo.ts
    localGameStore.ts
    roomCodes.ts
    scoring.ts
    supabase.ts
    types.ts
  styles
    app.css
supabase
  schema.sql
docs
  architecture.md
```

## Next Milestones

1. Replace local prototype storage with Supabase Realtime.
2. Add QR-code joining.
3. Add deployment hosting with a persistent realtime backend.
4. Add host-uploaded content packs.
5. Add reconnect handling with persisted host and player sessions.
