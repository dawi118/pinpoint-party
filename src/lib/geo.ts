export type Coordinates = {
  lat: number;
  lng: number;
};

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
export function normalizeLng(lng: number): number {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(normalizeLng(b.lng - a.lng));
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function clampLatLng(position: Coordinates): Coordinates {
  return {
    lat: Math.max(-85, Math.min(85, position.lat)),
    lng: normalizeLng(position.lng)
  };
}

export function mapSpaceMean(points: Coordinates[]): Coordinates {
  if (points.length === 0) return { lat: 0, lng: 0 };

  const total = points.reduce(
    (sum, point) => ({
      lat: sum.lat + point.lat,
      lng: sum.lng + normalizeLng(point.lng)
    }),
    { lat: 0, lng: 0 }
  );

  return clampLatLng({
    lat: total.lat / points.length,
    lng: total.lng / points.length
  });
}

export function latLngToPercent(position: Coordinates) {
  const safe = clampLatLng(position);
  return {
    x: ((safe.lng + 180) / 360) * 100,
    y: ((85 - safe.lat) / 170) * 100
  };
}

export function percentToLatLng(xPercent: number, yPercent: number): Coordinates {
  return clampLatLng({
    lng: (xPercent / 100) * 360 - 180,
    lat: 85 - (yPercent / 100) * 170
  });
}

export function formatDistance(km?: number): string {
  if (km === undefined) return "No guess";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${Math.round(km).toLocaleString()} km`;
}
