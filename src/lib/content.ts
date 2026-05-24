import { GameMode, MediaRound } from "./types";
import { randomInt } from "./random";
import { mapSpaceMean } from "./geo";

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
  },
  {
    id: "pyramids-of-giza",
    type: "image",
    url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1800&q=80",
    actualLat: 29.9792,
    actualLng: 31.1342,
    locationLabel: "Pyramids of Giza, Egypt",
    contentPack: "Ancient Wonders",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "golden-gate-bridge",
    type: "image",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1800&q=80",
    actualLat: 37.8199,
    actualLng: -122.4783,
    locationLabel: "Golden Gate Bridge, San Francisco",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "chichen-itza",
    type: "image",
    url: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1800&q=80",
    actualLat: 20.6843,
    actualLng: -88.5678,
    locationLabel: "Chichen Itza, Mexico",
    contentPack: "Ancient Wonders",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "hagia-sophia",
    type: "image",
    url: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1800&q=80",
    actualLat: 41.0086,
    actualLng: 28.9802,
    locationLabel: "Hagia Sophia, Istanbul",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "brandenburg-gate",
    type: "image",
    url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1800&q=80",
    actualLat: 52.5163,
    actualLng: 13.3777,
    locationLabel: "Brandenburg Gate, Berlin",
    contentPack: "World Landmarks",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  },
  {
    id: "victoria-falls",
    type: "image",
    url: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&w=1800&q=80",
    actualLat: -17.9243,
    actualLng: 25.8572,
    locationLabel: "Victoria Falls, Zambia/Zimbabwe",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "banff-lake-louise",
    type: "image",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    actualLat: 51.4254,
    actualLng: -116.1773,
    locationLabel: "Lake Louise, Banff",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "prague-charles-bridge",
    type: "image",
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1800&q=80",
    actualLat: 50.0865,
    actualLng: 14.4114,
    locationLabel: "Charles Bridge, Prague",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "st-basils-cathedral",
    type: "image",
    url: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1800&q=80",
    actualLat: 55.7525,
    actualLng: 37.6231,
    locationLabel: "St Basil's Cathedral, Moscow",
    contentPack: "World Landmarks",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "acropolis-athens",
    type: "image",
    url: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1800&q=80",
    actualLat: 37.9715,
    actualLng: 23.7257,
    locationLabel: "Acropolis of Athens",
    contentPack: "Ancient Wonders",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "alhambra-granada",
    type: "image",
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1800&q=80",
    actualLat: 37.1761,
    actualLng: -3.5881,
    locationLabel: "Alhambra, Granada",
    contentPack: "Architecture",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "sheikh-zayed-mosque",
    type: "image",
    url: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1800&q=80",
    actualLat: 24.4128,
    actualLng: 54.4749,
    locationLabel: "Sheikh Zayed Grand Mosque, Abu Dhabi",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "potala-palace",
    type: "image",
    url: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=80",
    actualLat: 29.6578,
    actualLng: 91.1169,
    locationLabel: "Potala Palace, Lhasa",
    contentPack: "World Landmarks",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "ha-long-bay",
    type: "image",
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
    actualLat: 20.9101,
    actualLng: 107.1839,
    locationLabel: "Ha Long Bay, Vietnam",
    contentPack: "Nature Icons",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "matterhorn-zermatt",
    type: "image",
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=80",
    actualLat: 45.9763,
    actualLng: 7.6586,
    locationLabel: "Matterhorn, Switzerland",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "wat-arun",
    type: "image",
    url: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1800&q=80",
    actualLat: 13.7437,
    actualLng: 100.4889,
    locationLabel: "Wat Arun, Bangkok",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "meteora-monasteries",
    type: "image",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=80",
    actualLat: 39.7217,
    actualLng: 21.6306,
    locationLabel: "Meteora Monasteries, Greece",
    contentPack: "Nature Icons",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "moai-rapa-nui",
    type: "image",
    url: "https://images.unsplash.com/photo-1589793907316-f94025b46850?auto=format&fit=crop&w=1800&q=80",
    actualLat: -27.1212,
    actualLng: -109.3664,
    locationLabel: "Moai of Rapa Nui, Easter Island",
    contentPack: "Ancient Wonders",
    difficulty: "hard",
    attribution: "Photo via Unsplash"
  },
  {
    id: "blue-mosque-istanbul",
    type: "image",
    url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=80",
    actualLat: 41.0054,
    actualLng: 28.9768,
    locationLabel: "Blue Mosque, Istanbul",
    contentPack: "Architecture",
    difficulty: "medium",
    attribution: "Photo via Unsplash"
  },
  {
    id: "marina-bay-sands",
    type: "image",
    url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=80",
    actualLat: 1.2834,
    actualLng: 103.8607,
    locationLabel: "Marina Bay Sands, Singapore",
    contentPack: "Modern Icons",
    difficulty: "easy",
    attribution: "Photo via Unsplash"
  }
];

export const EARTH_CLASSIC_CONTENT_BANK: MediaRound[] = [
  {
    id: "earth-classic-manhattan",
    type: "street",
    actualLat: 40.758,
    actualLng: -73.9855,
    locationLabel: "Times Square, New York",
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
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
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 45.4367,
      startLng: 12.3372,
      heading: 292,
      zoom: 16.5
    }
  },
  {
    id: "earth-classic-singapore",
    type: "street",
    actualLat: 1.2834,
    actualLng: 103.8607,
    locationLabel: "Marina Bay, Singapore",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 1.2849,
      startLng: 103.861,
      heading: 215,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-marrakech",
    type: "street",
    actualLat: 31.6258,
    actualLng: -7.9891,
    locationLabel: "Medina, Marrakech",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 31.6262,
      startLng: -7.9867,
      heading: 246,
      zoom: 16.1
    }
  },
  {
    id: "earth-classic-buenos-aires",
    type: "street",
    actualLat: -34.6037,
    actualLng: -58.3816,
    locationLabel: "Buenos Aires Microcentro",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -34.6076,
      startLng: -58.3737,
      heading: 302,
      zoom: 16
    }
  },
  {
    id: "earth-classic-stockholm",
    type: "street",
    actualLat: 59.325,
    actualLng: 18.0711,
    locationLabel: "Gamla Stan, Stockholm",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 59.3256,
      startLng: 18.0716,
      heading: 174,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-hanoi",
    type: "street",
    actualLat: 21.0285,
    actualLng: 105.8542,
    locationLabel: "Old Quarter, Hanoi",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 21.0333,
      startLng: 105.8501,
      heading: 128,
      zoom: 16
    }
  },
  {
    id: "earth-classic-quebec-city",
    type: "street",
    actualLat: 46.8139,
    actualLng: -71.208,
    locationLabel: "Old Quebec City",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 46.8122,
      startLng: -71.2051,
      heading: 38,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-prague",
    type: "street",
    actualLat: 50.087,
    actualLng: 14.4208,
    locationLabel: "Old Town Square, Prague",
    contentPack: "HeliView",
    difficulty: "easy",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 50.0875,
      startLng: 14.4213,
      heading: 206,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-wellington",
    type: "street",
    actualLat: -41.2865,
    actualLng: 174.7762,
    locationLabel: "Wellington Waterfront",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -41.2851,
      startLng: 174.7782,
      heading: 244,
      zoom: 16
    }
  },
  {
    id: "earth-classic-lisbon",
    type: "street",
    actualLat: 38.7139,
    actualLng: -9.1394,
    locationLabel: "Alfama, Lisbon",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 38.7118,
      startLng: -9.1299,
      heading: 284,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-seoul",
    type: "street",
    actualLat: 37.5638,
    actualLng: 126.982,
    locationLabel: "Myeongdong, Seoul",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 37.5651,
      startLng: 126.9844,
      heading: 212,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-taipei",
    type: "street",
    actualLat: 25.033,
    actualLng: 121.5654,
    locationLabel: "Xinyi, Taipei",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 25.0339,
      startLng: 121.5645,
      heading: 132,
      zoom: 16.1
    }
  },
  {
    id: "earth-classic-amsterdam",
    type: "street",
    actualLat: 52.3676,
    actualLng: 4.9041,
    locationLabel: "Canal Ring, Amsterdam",
    contentPack: "HeliView",
    difficulty: "easy",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 52.3679,
      startLng: 4.8897,
      heading: 78,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-edinburgh",
    type: "street",
    actualLat: 55.9486,
    actualLng: -3.1999,
    locationLabel: "Old Town, Edinburgh",
    contentPack: "HeliView",
    difficulty: "medium",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 55.9496,
      startLng: -3.1904,
      heading: 248,
      zoom: 16.2
    }
  },
  {
    id: "earth-classic-dubrovnik",
    type: "street",
    actualLat: 42.6403,
    actualLng: 18.1083,
    locationLabel: "Old Town, Dubrovnik",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 42.641,
      startLng: 18.1105,
      heading: 308,
      zoom: 16.3
    }
  },
  {
    id: "earth-classic-jaipur",
    type: "street",
    actualLat: 26.9239,
    actualLng: 75.8267,
    locationLabel: "Pink City, Jaipur",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 26.9258,
      startLng: 75.8237,
      heading: 96,
      zoom: 16
    }
  },
  {
    id: "earth-classic-zanzibar",
    type: "street",
    actualLat: -6.1622,
    actualLng: 39.1921,
    locationLabel: "Stone Town, Zanzibar",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -6.1616,
      startLng: 39.1886,
      heading: 68,
      zoom: 15.9
    }
  },
  {
    id: "earth-classic-copenhagen",
    type: "street",
    actualLat: 55.6797,
    actualLng: 12.5901,
    locationLabel: "Nyhavn, Copenhagen",
    contentPack: "HeliView",
    difficulty: "easy",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 55.68,
      startLng: 12.5887,
      heading: 112,
      zoom: 16.4
    }
  },
  {
    id: "earth-classic-lagos",
    type: "street",
    actualLat: 6.4281,
    actualLng: 3.4219,
    locationLabel: "Victoria Island, Lagos",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 6.4264,
      startLng: 3.43,
      heading: 276,
      zoom: 15.8
    }
  },
  {
    id: "earth-classic-beirut",
    type: "street",
    actualLat: 33.8938,
    actualLng: 35.5018,
    locationLabel: "Downtown Beirut",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: 33.8954,
      startLng: 35.5057,
      heading: 190,
      zoom: 16
    }
  },
  {
    id: "earth-classic-cusco",
    type: "street",
    actualLat: -13.5167,
    actualLng: -71.9789,
    locationLabel: "Historic Centre, Cusco",
    contentPack: "HeliView",
    difficulty: "hard",
    attribution: "Street-map view via OpenFreeMap",
    streetView: {
      startLat: -13.5163,
      startLng: -71.9781,
      heading: 142,
      zoom: 16.1
    }
  }
];

export const GEOGUESSR_CLASSIC_CONTENT_BANK: MediaRound[] = EARTH_CLASSIC_CONTENT_BANK.map((round) => ({
  ...round,
  id: round.id.replace("earth-classic", "geoguessr-classic"),
  contentPack: "PinPoint Classic",
  attribution: "Street panorama"
}));

const PIN_CENTRAL_CITY_BANK: MediaRound[] = [
  {
    id: "central-london",
    type: "image",
    actualLat: 51.5074,
    actualLng: -0.1278,
    locationLabel: "Central London",
    contentPack: "PinPoint Central",
    difficulty: "easy",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-paris",
    type: "image",
    actualLat: 48.8566,
    actualLng: 2.3522,
    locationLabel: "Central Paris",
    contentPack: "PinPoint Central",
    difficulty: "easy",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-new-york",
    type: "image",
    actualLat: 40.7128,
    actualLng: -74.006,
    locationLabel: "New York City",
    contentPack: "PinPoint Central",
    difficulty: "easy",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-rome",
    type: "image",
    actualLat: 41.9028,
    actualLng: 12.4964,
    locationLabel: "Central Rome",
    contentPack: "PinPoint Central",
    difficulty: "medium",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-tokyo",
    type: "image",
    actualLat: 35.6762,
    actualLng: 139.6503,
    locationLabel: "Central Tokyo",
    contentPack: "PinPoint Central",
    difficulty: "medium",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-sydney",
    type: "image",
    actualLat: -33.8688,
    actualLng: 151.2093,
    locationLabel: "Central Sydney",
    contentPack: "PinPoint Central",
    difficulty: "medium",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1523428096881-5bd79d043006?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516941064643-74aacd84843c?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-dubai",
    type: "image",
    actualLat: 25.2048,
    actualLng: 55.2708,
    locationLabel: "Central Dubai",
    contentPack: "PinPoint Central",
    difficulty: "medium",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-barcelona",
    type: "image",
    actualLat: 41.3874,
    actualLng: 2.1686,
    locationLabel: "Central Barcelona",
    contentPack: "PinPoint Central",
    difficulty: "medium",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-rio",
    type: "image",
    actualLat: -22.9068,
    actualLng: -43.1729,
    locationLabel: "Rio de Janeiro",
    contentPack: "PinPoint Central",
    difficulty: "hard",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "central-istanbul",
    type: "image",
    actualLat: 41.0082,
    actualLng: 28.9784,
    locationLabel: "Central Istanbul",
    contentPack: "PinPoint Central",
    difficulty: "hard",
    attribution: "Photos via Unsplash",
    clueImages: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const PIN_CENTRAL_SETS: Array<{
  id: string;
  label: string;
  difficulty: "easy" | "medium" | "hard";
  clues: Array<{ url: string; lat: number; lng: number; label: string }>;
}> = [
  {
    id: "atlantic-balance",
    label: "Atlantic balance point",
    difficulty: "medium",
    clues: [
      { label: "New York", lat: 40.7128, lng: -74.006, url: "https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&w=900&q=80" },
      { label: "Chicago", lat: 41.8781, lng: -87.6298, url: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=900&q=80" },
      { label: "Los Angeles", lat: 34.0522, lng: -118.2437, url: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=900&q=80" },
      { label: "Sydney", lat: -33.8688, lng: 151.2093, url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "euro-africa-centre",
    label: "Europe-Africa midpoint",
    difficulty: "easy",
    clues: [
      { label: "London", lat: 51.5074, lng: -0.1278, url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80" },
      { label: "Paris", lat: 48.8566, lng: 2.3522, url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80" },
      { label: "Rome", lat: 41.9028, lng: 12.4964, url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80" },
      { label: "Cairo", lat: 30.0444, lng: 31.2357, url: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "pacific-ring",
    label: "Pacific ring average",
    difficulty: "hard",
    clues: [
      { label: "Tokyo", lat: 35.6762, lng: 139.6503, url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80" },
      { label: "Auckland", lat: -36.8509, lng: 174.7645, url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=80" },
      { label: "San Francisco", lat: 37.7749, lng: -122.4194, url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80" },
      { label: "Honolulu", lat: 21.3069, lng: -157.8583, url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "americas-spread",
    label: "Americas spread",
    difficulty: "medium",
    clues: [
      { label: "Vancouver", lat: 49.2827, lng: -123.1207, url: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=900&q=80" },
      { label: "Mexico City", lat: 19.4326, lng: -99.1332, url: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=900&q=80" },
      { label: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80" },
      { label: "Buenos Aires", lat: -34.6037, lng: -58.3816, url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "global-crossroads",
    label: "Global crossroads",
    difficulty: "hard",
    clues: [
      { label: "London", lat: 51.5074, lng: -0.1278, url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80" },
      { label: "New York", lat: 40.7128, lng: -74.006, url: "https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&w=900&q=80" },
      { label: "Tokyo", lat: 35.6762, lng: 139.6503, url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80" },
      { label: "Cape Town", lat: -33.9249, lng: 18.4241, url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "silk-road-centre",
    label: "Silk road centre",
    difficulty: "medium",
    clues: [
      { label: "Istanbul", lat: 41.0082, lng: 28.9784, url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80" },
      { label: "Dubai", lat: 25.2048, lng: 55.2708, url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80" },
      { label: "Delhi", lat: 28.6139, lng: 77.209, url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80" },
      { label: "Bangkok", lat: 13.7563, lng: 100.5018, url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "southern-oceans",
    label: "Southern oceans average",
    difficulty: "hard",
    clues: [
      { label: "Cape Town", lat: -33.9249, lng: 18.4241, url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80" },
      { label: "Perth", lat: -31.9523, lng: 115.8613, url: "https://images.unsplash.com/photo-1524586410818-196d249560e4?auto=format&fit=crop&w=900&q=80" },
      { label: "Santiago", lat: -33.4489, lng: -70.6693, url: "https://images.unsplash.com/photo-1597006438013-6f0cca2c9ab6?auto=format&fit=crop&w=900&q=80" },
      { label: "Auckland", lat: -36.8509, lng: 174.7645, url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "north-world",
    label: "Northern world average",
    difficulty: "medium",
    clues: [
      { label: "Reykjavik", lat: 64.1466, lng: -21.9426, url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80" },
      { label: "Oslo", lat: 59.9139, lng: 10.7522, url: "https://images.unsplash.com/photo-1605832666463-1ff6c721bb7b?auto=format&fit=crop&w=900&q=80" },
      { label: "Toronto", lat: 43.6532, lng: -79.3832, url: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=900&q=80" },
      { label: "Seoul", lat: 37.5665, lng: 126.978, url: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "indian-ocean-pull",
    label: "Indian Ocean pull",
    difficulty: "hard",
    clues: [
      { label: "Mumbai", lat: 19.076, lng: 72.8777, url: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80" },
      { label: "Nairobi", lat: -1.2921, lng: 36.8219, url: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=900&q=80" },
      { label: "Singapore", lat: 1.3521, lng: 103.8198, url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80" },
      { label: "Perth", lat: -31.9523, lng: 115.8613, url: "https://images.unsplash.com/photo-1524586410818-196d249560e4?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "med-atlantic-mix",
    label: "Mediterranean-Atlantic mix",
    difficulty: "easy",
    clues: [
      { label: "Lisbon", lat: 38.7223, lng: -9.1393, url: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=900&q=80" },
      { label: "Madrid", lat: 40.4168, lng: -3.7038, url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80" },
      { label: "Casablanca", lat: 33.5731, lng: -7.5898, url: "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=900&q=80" },
      { label: "Rome", lat: 41.9028, lng: 12.4964, url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "andes-arc",
    label: "Andes arc average",
    difficulty: "hard",
    clues: [
      { label: "Quito", lat: -0.1807, lng: -78.4678, url: "https://images.unsplash.com/photo-1588979355313-6711a095465f?auto=format&fit=crop&w=900&q=80" },
      { label: "Lima", lat: -12.0464, lng: -77.0428, url: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=900&q=80" },
      { label: "La Paz", lat: -16.4897, lng: -68.1193, url: "https://images.unsplash.com/photo-1544985361-b420d7a77043?auto=format&fit=crop&w=900&q=80" },
      { label: "Santiago", lat: -33.4489, lng: -70.6693, url: "https://images.unsplash.com/photo-1597006438013-6f0cca2c9ab6?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "nordic-capitals",
    label: "Nordic capitals centre",
    difficulty: "medium",
    clues: [
      { label: "Copenhagen", lat: 55.6761, lng: 12.5683, url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80" },
      { label: "Stockholm", lat: 59.3293, lng: 18.0686, url: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=900&q=80" },
      { label: "Oslo", lat: 59.9139, lng: 10.7522, url: "https://images.unsplash.com/photo-1605832666463-1ff6c721bb7b?auto=format&fit=crop&w=900&q=80" },
      { label: "Helsinki", lat: 60.1699, lng: 24.9384, url: "https://images.unsplash.com/photo-1559058922-b6c02c31c103?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "african-great-lakes",
    label: "African great lakes pull",
    difficulty: "hard",
    clues: [
      { label: "Kampala", lat: 0.3476, lng: 32.5825, url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80" },
      { label: "Kigali", lat: -1.9441, lng: 30.0619, url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80" },
      { label: "Nairobi", lat: -1.2921, lng: 36.8219, url: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=900&q=80" },
      { label: "Dar es Salaam", lat: -6.7924, lng: 39.2083, url: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "east-asia-megalopolis",
    label: "East Asia megalopolis",
    difficulty: "medium",
    clues: [
      { label: "Seoul", lat: 37.5665, lng: 126.978, url: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=80" },
      { label: "Shanghai", lat: 31.2304, lng: 121.4737, url: "https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=900&q=80" },
      { label: "Taipei", lat: 25.033, lng: 121.5654, url: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=900&q=80" },
      { label: "Hong Kong", lat: 22.3193, lng: 114.1694, url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "canadian-crossing",
    label: "Canadian crossing",
    difficulty: "easy",
    clues: [
      { label: "Vancouver", lat: 49.2827, lng: -123.1207, url: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=900&q=80" },
      { label: "Calgary", lat: 51.0447, lng: -114.0719, url: "https://images.unsplash.com/photo-1571789288651-c0869d9e23b4?auto=format&fit=crop&w=900&q=80" },
      { label: "Toronto", lat: 43.6532, lng: -79.3832, url: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=900&q=80" },
      { label: "Montreal", lat: 45.5017, lng: -73.5673, url: "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "south-east-asia",
    label: "Southeast Asia blend",
    difficulty: "medium",
    clues: [
      { label: "Bangkok", lat: 13.7563, lng: 100.5018, url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80" },
      { label: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297, url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80" },
      { label: "Kuala Lumpur", lat: 3.139, lng: 101.6869, url: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=900&q=80" },
      { label: "Singapore", lat: 1.3521, lng: 103.8198, url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "baltic-harbour-chain",
    label: "Baltic harbour chain",
    difficulty: "medium",
    clues: [
      { label: "Tallinn", lat: 59.437, lng: 24.7536, url: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=900&q=80" },
      { label: "Riga", lat: 56.9496, lng: 24.1052, url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80" },
      { label: "Vilnius", lat: 54.6872, lng: 25.2797, url: "https://images.unsplash.com/photo-1587915860457-5a1dc7f822b5?auto=format&fit=crop&w=900&q=80" },
      { label: "Gdansk", lat: 54.352, lng: 18.6466, url: "https://images.unsplash.com/photo-1550664730-9c13b3713022?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "arabian-peninsula",
    label: "Arabian peninsula sweep",
    difficulty: "medium",
    clues: [
      { label: "Riyadh", lat: 24.7136, lng: 46.6753, url: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=900&q=80" },
      { label: "Doha", lat: 25.2854, lng: 51.531, url: "https://images.unsplash.com/photo-1527267207156-3372670819dc?auto=format&fit=crop&w=900&q=80" },
      { label: "Muscat", lat: 23.588, lng: 58.3829, url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80" },
      { label: "Kuwait City", lat: 29.3759, lng: 47.9774, url: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "balkan-spine",
    label: "Balkan spine",
    difficulty: "hard",
    clues: [
      { label: "Zagreb", lat: 45.815, lng: 15.9819, url: "https://images.unsplash.com/photo-1555990538-c48f49d1df3d?auto=format&fit=crop&w=900&q=80" },
      { label: "Sarajevo", lat: 43.8563, lng: 18.4131, url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80" },
      { label: "Belgrade", lat: 44.8125, lng: 20.4612, url: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=80" },
      { label: "Skopje", lat: 41.9981, lng: 21.4254, url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "caribbean-circuit",
    label: "Caribbean circuit",
    difficulty: "hard",
    clues: [
      { label: "Havana", lat: 23.1136, lng: -82.3666, url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80" },
      { label: "Kingston", lat: 17.9712, lng: -76.7936, url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
      { label: "Santo Domingo", lat: 18.4861, lng: -69.9312, url: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80" },
      { label: "San Juan", lat: 18.4655, lng: -66.1057, url: "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "west-africa-coast",
    label: "West Africa coast",
    difficulty: "hard",
    clues: [
      { label: "Dakar", lat: 14.7167, lng: -17.4677, url: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=900&q=80" },
      { label: "Accra", lat: 5.6037, lng: -0.187, url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80" },
      { label: "Abidjan", lat: 5.36, lng: -4.0083, url: "https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&w=900&q=80" },
      { label: "Lagos", lat: 6.5244, lng: 3.3792, url: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "danube-capitals",
    label: "Danube capitals",
    difficulty: "easy",
    clues: [
      { label: "Vienna", lat: 48.2082, lng: 16.3738, url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=80" },
      { label: "Bratislava", lat: 48.1486, lng: 17.1077, url: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=900&q=80" },
      { label: "Budapest", lat: 47.4979, lng: 19.0402, url: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=80" },
      { label: "Belgrade", lat: 44.8125, lng: 20.4612, url: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "north-atlantic-isles",
    label: "North Atlantic isles",
    difficulty: "hard",
    clues: [
      { label: "Reykjavik", lat: 64.1466, lng: -21.9426, url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80" },
      { label: "Nuuk", lat: 64.1814, lng: -51.6941, url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80" },
      { label: "Torshavn", lat: 62.0079, lng: -6.7909, url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80" },
      { label: "Dublin", lat: 53.3498, lng: -6.2603, url: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "himalaya-edge",
    label: "Himalaya edge",
    difficulty: "hard",
    clues: [
      { label: "Kathmandu", lat: 27.7172, lng: 85.324, url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80" },
      { label: "Thimphu", lat: 27.4728, lng: 89.639, url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
      { label: "Leh", lat: 34.1526, lng: 77.5771, url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80" },
      { label: "Islamabad", lat: 33.6844, lng: 73.0479, url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "australian-east",
    label: "Australian east coast",
    difficulty: "easy",
    clues: [
      { label: "Brisbane", lat: -27.4698, lng: 153.0251, url: "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=900&q=80" },
      { label: "Gold Coast", lat: -28.0167, lng: 153.4, url: "https://images.unsplash.com/photo-1516941064643-74aacd84843c?auto=format&fit=crop&w=900&q=80" },
      { label: "Canberra", lat: -35.2809, lng: 149.13, url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80" },
      { label: "Melbourne", lat: -37.8136, lng: 144.9631, url: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "north-africa-line",
    label: "North Africa line",
    difficulty: "medium",
    clues: [
      { label: "Rabat", lat: 34.0209, lng: -6.8416, url: "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=900&q=80" },
      { label: "Algiers", lat: 36.7538, lng: 3.0588, url: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=900&q=80" },
      { label: "Tunis", lat: 36.8065, lng: 10.1815, url: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=900&q=80" },
      { label: "Tripoli", lat: 32.8872, lng: 13.1913, url: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=900&q=80" }
    ]
  },
  {
    id: "great-lakes-us",
    label: "Great Lakes sweep",
    difficulty: "easy",
    clues: [
      { label: "Chicago", lat: 41.8781, lng: -87.6298, url: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=900&q=80" },
      { label: "Detroit", lat: 42.3314, lng: -83.0458, url: "https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&w=900&q=80" },
      { label: "Cleveland", lat: 41.4993, lng: -81.6944, url: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80" },
      { label: "Buffalo", lat: 42.8864, lng: -78.8784, url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80" }
    ]
  }
];

export const PIN_CENTRAL_CONTENT_BANK: MediaRound[] = PIN_CENTRAL_SETS.map((set) => {
  const center = mapSpaceMean(set.clues.map((clue) => ({ lat: clue.lat, lng: clue.lng })));

  return {
    id: `pin-central-${set.id}`,
    type: "image",
    actualLat: center.lat,
    actualLng: center.lng,
    locationLabel: set.label,
    contentPack: "PinPoint Central",
    difficulty: set.difficulty,
    attribution: "Photos via Unsplash",
    clueImages: set.clues.map((clue) => clue.url),
    imageClues: set.clues
  };
});

export function pickRounds(count: 3 | 5 | 10, mode: GameMode = "pinpointer"): MediaRound[] {
  const bank = getContentBank(mode);
  const needed = Math.min(count, bank.length);
  return shuffle(bank).slice(0, needed).map(randomizeRoundContent);
}

function getContentBank(mode: GameMode) {
  if (mode === "pin_central") return PIN_CENTRAL_CONTENT_BANK;
  if (mode === "earth_classic" || mode === "heliview") return EARTH_CLASSIC_CONTENT_BANK;
  if (mode === "geoguessr_classic") return GEOGUESSR_CLASSIC_CONTENT_BANK;
  return PINPOINTER_CONTENT_BANK;
}

function randomizeRoundContent(round: MediaRound): MediaRound {
  if (round.imageClues?.length) {
    const imageClues = shuffle(round.imageClues);

    return {
      ...round,
      imageClues,
      clueImages: imageClues.map((clue) => clue.url)
    };
  }

  if (round.clueImages?.length) {
    return {
      ...round,
      clueImages: shuffle(round.clueImages)
    };
  }

  return { ...round };
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(index + 1);
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}
