import { Coordinates, haversineDistanceKm } from "./geo";

export const MAX_SCORE = 5000;
export const SCORE_SCALE_KM = 2000;

export function scoreDistance(distanceKm: number): number {
  return Math.round(MAX_SCORE * Math.exp(-distanceKm / SCORE_SCALE_KM));
}

export function scoreGuess(guess: Coordinates, actual: Coordinates) {
  const distanceKm = haversineDistanceKm(guess, actual);
  return {
    distanceKm,
    score: scoreDistance(distanceKm)
  };
}
