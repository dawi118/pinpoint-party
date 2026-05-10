import { MediaRound } from "./types";

export const CONTENT_BANK: MediaRound[] = [
  {
    id: "eiffel-tower",
    type: "image",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80",
    actualLat: 48.8584,
    actualLng: 2.2945,
    locationLabel: "Eiffel Tower, Paris",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "tower-bridge",
    type: "image",
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80",
    actualLat: 51.5055,
    actualLng: -0.0754,
    locationLabel: "Tower Bridge, London",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "taj-mahal",
    type: "image",
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80",
    actualLat: 27.1751,
    actualLng: 78.0421,
    locationLabel: "Taj Mahal, Agra",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "machu-picchu",
    type: "image",
    url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1800&q=80",
    actualLat: -13.1631,
    actualLng: -72.545,
    locationLabel: "Machu Picchu, Peru",
    contentPack: "World Landmarks",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "sydney-opera-house",
    type: "image",
    url: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1800&q=80",
    actualLat: -33.8568,
    actualLng: 151.2153,
    locationLabel: "Sydney Opera House",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  }
];

export function pickRounds(count: 3 | 5 | 10): MediaRound[] {
  const needed = Math.min(count, CONTENT_BANK.length);
  return CONTENT_BANK.slice(0, needed);
}
