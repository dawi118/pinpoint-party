# Pinpoint Party Architecture

Pinpoint Party is a phone-first, TV-led location guessing party game. The first build keeps the gameplay surface working locally while the Supabase schema is ready for the real multi-device realtime layer.

## Routes

- `/host/:roomCode` is the central display for the TV or shared computer.
- `/join?room=ABCD` lets a player enter their name and color.
- `/player/:roomCode?player=:playerId` is the phone controller with the guess map.

## Prototype Realtime

The current app uses `localStorage` plus `BroadcastChannel` so multiple tabs can test the loop immediately. This intentionally mirrors the events that Supabase Realtime will later broadcast: lobby changes, round starts, guess confirmations, reveal state, and scoreboards.

## Shared Logic

- `src/lib/geo.ts` contains Haversine distance and map projection helpers.
- `src/lib/scoring.ts` implements the exponential 5000-point scoring formula.
- `src/lib/gameState.ts` owns state transitions for lobby, active round, reveal, scoreboard, final results, and selected game mode.
- `src/lib/roomCodes.ts` creates readable four-character room codes.

## Game Modes

- Pinpointer is the introductory landmark-photo mode: players place one pin and closest wins.
- PinPoint Central uses four landmark photos per round and calculates the geographic centre as the scoring target.
- HeliView uses city-map rounds with buildings, hidden labels, and the same guess map, confirmation, reveal, and scoring flow.

## Backend Path

`supabase/schema.sql` models the MVP tables from the plan:

- `games`
- `players`
- `rounds`
- `media`
- `guesses`

The next backend step is replacing `src/lib/localGameStore.ts` with a Supabase adapter that preserves the same `loadGame`, `saveGame`, and subscription responsibilities.
