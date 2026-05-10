# Pinpoint Party

A phone-first, TV-led location guessing party game. The host opens a room on the big screen, players join from their phones, drop a pin on a world map, and the reveal walks through guesses from furthest to closest before showing the true location.

This repo implements the first playable web prototype based on the supplied game plan.

## What Works Now

- Host can create a room with 3, 5, or 10 rounds.
- Players can join with a four-character room code.
- Up to 8 players are supported.
- Host sees lobby, round clue, confirmation status, reveal, scoreboard, and final state.
- Player phones can place and confirm pins on a responsive world map.
- Rounds end when all players confirm or the timer expires.
- Distances use the Haversine formula.
- Scores use the exponential 5000-point formula from the plan.
- Reveal order runs from furthest guess to closest guess, then the answer.

The prototype realtime layer is local-tab only through `BroadcastChannel` and `localStorage`. `supabase/schema.sql` is included for the production realtime backend.

## Tech Stack

- Vite
- React
- TypeScript
- CSS
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
3. Add MapLibre GL JS with a production tile provider.
4. Add host-uploaded content packs.
5. Add reconnect handling with persisted host and player sessions.
