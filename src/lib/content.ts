import { GameMode, MediaRound } from "./types";
import { randomInt } from "./random";

export const PINPOINTER_CONTENT_BANK: MediaRound[] = [
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
    id: "statue-of-liberty",
    type: "image",
    url: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1800&q=80",
    actualLat: 40.6892,
    actualLng: -74.0445,
    locationLabel: "Statue of Liberty, New York",
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
    id: "colosseum",
    type: "image",
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1800&q=80",
    actualLat: 41.8902,
    actualLng: 12.4922,
    locationLabel: "Colosseum, Rome",
    contentPack: "Ancient Wonders",
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
    id: "great-wall-mutianyu",
    type: "image",
    url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1800&q=80",
    actualLat: 40.4319,
    actualLng: 116.5704,
    locationLabel: "Great Wall, Mutianyu",
    contentPack: "Ancient Wonders",
    difficulty: "medium",
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
    id: "petra-treasury",
    type: "image",
    url: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=1800&q=80",
    actualLat: 30.3285,
    actualLng: 35.4444,
    locationLabel: "Petra, Jordan",
    contentPack: "Ancient Wonders",
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
  },
  {
    id: "christ-the-redeemer",
    type: "image",
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1800&q=80",
    actualLat: -22.9519,
    actualLng: -43.2105,
    locationLabel: "Christ the Redeemer, Rio de Janeiro",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "angkor-wat",
    type: "image",
    url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=80",
    actualLat: 13.4125,
    actualLng: 103.867,
    locationLabel: "Angkor Wat, Cambodia",
    contentPack: "Ancient Wonders",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "burj-khalifa",
    type: "image",
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",
    actualLat: 25.1972,
    actualLng: 55.2744,
    locationLabel: "Burj Khalifa, Dubai",
    contentPack: "Modern Icons",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "mount-fuji",
    type: "image",
    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1800&q=80",
    actualLat: 35.3606,
    actualLng: 138.7274,
    locationLabel: "Mount Fuji, Japan",
    contentPack: "Nature Icons",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "uluru",
    type: "image",
    url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=1800&q=80",
    actualLat: -25.3444,
    actualLng: 131.0369,
    locationLabel: "Uluru, Australia",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "salar-de-uyuni",
    type: "image",
    url: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1800&q=80",
    actualLat: -20.1338,
    actualLng: -67.4891,
    locationLabel: "Salar de Uyuni, Bolivia",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "neuschwanstein",
    type: "image",
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=80",
    actualLat: 47.5576,
    actualLng: 10.7498,
    locationLabel: "Neuschwanstein Castle, Germany",
    contentPack: "Castles",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "sagrada-familia",
    type: "image",
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",
    actualLat: 41.4036,
    actualLng: 2.1744,
    locationLabel: "Sagrada Familia, Barcelona",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  }
];

const PIN_CENTRAL_PHOTOS = [
  {
    id: "central-eiffel-tower",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    lat: 48.8584,
    lng: 2.2945,
    label: "Eiffel Tower, Paris",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-tower-bridge",
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    lat: 51.5055,
    lng: -0.0754,
    label: "Tower Bridge, London",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-colosseum",
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    lat: 41.8902,
    lng: 12.4922,
    label: "Colosseum, Rome",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-sagrada-familia",
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    lat: 41.4036,
    lng: 2.1744,
    label: "Sagrada Familia, Barcelona",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-statue-liberty",
    url: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=1200&q=80",
    lat: 40.6892,
    lng: -74.0445,
    label: "Statue of Liberty, New York",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-christ-redeemer",
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    lat: -22.9519,
    lng: -43.2105,
    label: "Christ the Redeemer, Rio de Janeiro",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-sydney-opera-house",
    url: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=1200&q=80",
    lat: -33.8568,
    lng: 151.2153,
    label: "Sydney Opera House",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-burj-khalifa",
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    lat: 25.1972,
    lng: 55.2744,
    label: "Burj Khalifa, Dubai",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-taj-mahal",
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    lat: 27.1751,
    lng: 78.0421,
    label: "Taj Mahal, Agra",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-angkor-wat",
    url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    lat: 13.4125,
    lng: 103.867,
    label: "Angkor Wat, Cambodia",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-mount-fuji",
    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=80",
    lat: 35.3606,
    lng: 138.7274,
    label: "Mount Fuji, Japan",
    attribution: "Photo via Unsplash"
  },
  {
    id: "central-machu-picchu",
    url: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80",
    lat: -13.1631,
    lng: -72.545,
    label: "Machu Picchu, Peru",
    attribution: "Photo via Unsplash"
  }
];

export const PIN_CENTRAL_CONTENT_BANK: MediaRound[] = [
  buildPinCentralRound("pin-central-europe-icons", "European Icons", PIN_CENTRAL_PHOTOS.slice(0, 4), "easy"),
  buildPinCentralRound("pin-central-global-south", "Global South", PIN_CENTRAL_PHOTOS.slice(4, 8), "medium"),
  buildPinCentralRound("pin-central-asia-pacific", "Asia-Pacific", PIN_CENTRAL_PHOTOS.slice(8, 12), "hard")
];

export const EARTH_CLASSIC_CONTENT_BANK: MediaRound[] = [
  {
    id: "earth-classic-manhattan",
    type: "street",
    actualLat: 40.758,
    actualLng: -73.9855,
    locationLabel: "Times Square, New York",
    contentPack: "Earth Classic",
    difficulty: "easy",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 40.759,
      startLng: -73.9845,
      heading: 228,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-westminster",
    type: "street",
    actualLat: 51.5007,
    actualLng: -0.1246,
    locationLabel: "Westminster, London",
    contentPack: "Earth Classic",
    difficulty: "easy",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 51.5014,
      startLng: -0.1252,
      heading: 148,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-shibuya",
    type: "street",
    actualLat: 35.6595,
    actualLng: 139.7005,
    locationLabel: "Shibuya Crossing, Tokyo",
    contentPack: "Earth Classic",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 35.6602,
      startLng: 139.7001,
      heading: 166,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-montmartre",
    type: "street",
    actualLat: 48.8867,
    actualLng: 2.3431,
    locationLabel: "Montmartre, Paris",
    contentPack: "Earth Classic",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 48.8861,
      startLng: 2.3427,
      heading: 38,
      zoom: 16.3
    }
  },
  {
    id: "earth-classic-fremantle",
    type: "street",
    actualLat: -32.0569,
    actualLng: 115.7439,
    locationLabel: "Fremantle, Australia",
    contentPack: "Earth Classic",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -32.0558,
      startLng: 115.7442,
      heading: 192,
      zoom: 15.9
    }
  },
  {
    id: "earth-classic-mexico-city",
    type: "street",
    actualLat: 19.4326,
    actualLng: -99.1332,
    locationLabel: "Centro Historico, Mexico City",
    contentPack: "Earth Classic",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 19.4332,
      startLng: -99.1341,
      heading: 118,
      zoom: 16.1
    }
  },
  {
    id: "earth-classic-cape-town",
    type: "street",
    actualLat: -33.9249,
    actualLng: 18.4241,
    locationLabel: "Cape Town City Bowl",
    contentPack: "Earth Classic",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -33.9244,
      startLng: 18.4214,
      heading: 76,
      zoom: 15.8
    }
  },
  {
    id: "earth-classic-barcelona",
    type: "street",
    actualLat: 41.3851,
    actualLng: 2.1734,
    locationLabel: "Gothic Quarter, Barcelona",
    contentPack: "Earth Classic",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 41.3839,
      startLng: 2.1762,
      heading: 278,
      zoom: 16.3
    }
  },
  {
    id: "earth-classic-vancouver",
    type: "street",
    actualLat: 49.2827,
    actualLng: -123.1207,
    locationLabel: "Downtown Vancouver",
    contentPack: "Earth Classic",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 49.2819,
      startLng: -123.1212,
      heading: 34,
      zoom: 16
    }
  },
  {
    id: "earth-classic-venice",
    type: "street",
    actualLat: 45.4372,
    actualLng: 12.3359,
    locationLabel: "San Marco, Venice",
    contentPack: "Earth Classic",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 45.4367,
      startLng: 12.3372,
      heading: 292,
      zoom: 16.5
    }
  }
];

export function pickRounds(count: 3 | 5 | 10, mode: GameMode = "pinpointer"): MediaRound[] {
  const bank = getContentBank(mode);
  const needed = Math.min(count, bank.length);
  return shuffle(bank).slice(0, needed);
}

function getContentBank(mode: GameMode) {
  if (mode === "pin_central") return PIN_CENTRAL_CONTENT_BANK;
  if (mode === "earth_classic" || mode === "heliview") return EARTH_CLASSIC_CONTENT_BANK;
  return PINPOINTER_CONTENT_BANK;
}

function buildPinCentralRound(
  id: string,
  locationLabel: string,
  centralImages: typeof PIN_CENTRAL_PHOTOS,
  difficulty: MediaRound["difficulty"]
): MediaRound {
  const center = getGeographicCenter(centralImages);

  return {
    id,
    type: "image",
    actualLat: center.lat,
    actualLng: center.lng,
    locationLabel,
    contentPack: "PinPoint Central",
    difficulty,
    attribution: "Photos via Unsplash",
    centralImages
  };
}

function getGeographicCenter(points: Array<{ lat: number; lng: number }>) {
  const vector = points.reduce(
    (total, point) => {
      const lat = toRadians(point.lat);
      const lng = toRadians(point.lng);

      return {
        x: total.x + Math.cos(lat) * Math.cos(lng),
        y: total.y + Math.cos(lat) * Math.sin(lng),
        z: total.z + Math.sin(lat)
      };
    },
    { x: 0, y: 0, z: 0 }
  );
  const count = Math.max(points.length, 1);
  const x = vector.x / count;
  const y = vector.y / count;
  const z = vector.z / count;
  const hyp = Math.sqrt(x * x + y * y);

  return {
    lat: toDegrees(Math.atan2(z, hyp)),
    lng: toDegrees(Math.atan2(y, x))
  };
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI;
}

function shuffle(rounds: MediaRound[]): MediaRound[] {
  const next = [...rounds];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(index + 1);
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}
