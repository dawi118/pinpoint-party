import { AlertTriangle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { MediaRound, StreetMovementPoint } from "../lib/types";

type GoogleStreetViewProps = {
  round: MediaRound;
  onMovement?: (point: StreetMovementPoint) => void;
};

export function GoogleStreetView({ round, onMovement }: GoogleStreetViewProps) {
  const seed = round.streetView ?? {
    startLat: round.actualLat,
    startLng: round.actualLng,
    heading: 0,
    zoom: 1
  };
  const apiKey = useMemo(() => getEmbedApiKey(), []);
  const startPoint: StreetMovementPoint = {
    lat: seed.startLat,
    lng: seed.startLng,
    heading: seed.heading,
    pitch: 0,
    zoom: toStreetViewZoom(seed.zoom),
    recordedAt: new Date().toISOString()
  };

  useEffect(() => {
    if (!apiKey) return;
    onMovement?.(startPoint);
  }, [apiKey, round.id]);

  if (!apiKey) {
    return (
      <div className="google-street-view">
        <div className="street-view-empty">
          <AlertTriangle size={26} />
          <strong>Street view unavailable</strong>
          <span>Street view is not configured.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="google-street-view">
      <iframe
        className="google-street-panorama"
        title="Street panorama"
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        src={createStreetViewEmbedUrl(apiKey, startPoint)}
      />
    </div>
  );
}

function getEmbedApiKey() {
  return (
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY ||
    import.meta.env.VITE_GOOGLE_EMBED_API_KEY ||
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    import.meta.env.VITE_GOOGLE_STREET_VIEW_API_KEY
  ) as string | undefined;
}

function createStreetViewEmbedUrl(apiKey: string, point: StreetMovementPoint) {
  const params = new URLSearchParams({
    key: apiKey,
    location: `${point.lat},${point.lng}`,
    heading: String(Math.round(normalizeHeading(point.heading))),
    pitch: String(Math.round(point.pitch)),
    fov: String(zoomToFov(point.zoom)),
    radius: "90",
    source: "outdoor"
  });

  return `https://www.google.com/maps/embed/v1/streetview?${params.toString()}`;
}

function toStreetViewZoom(seedZoom: number) {
  if (seedZoom <= 3) return seedZoom;
  return 1;
}

function normalizeHeading(value: number) {
  return ((value % 360) + 360) % 360;
}

function zoomToFov(zoom: number) {
  return Math.max(45, Math.min(100, Math.round(100 - zoom * 12)));
}
