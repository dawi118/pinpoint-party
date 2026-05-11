import { Compass, LocateFixed } from "lucide-react";
import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { MediaRound } from "../lib/types";
import { hideTextLabels } from "./WorldGuessMap";

const STREET_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

export function EarthStreetView({ round }: { round: MediaRound }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const seed = round.streetView ?? {
    startLat: round.actualLat,
    startLng: round.actualLng,
    heading: 0,
    zoom: 15.5
  };
  const [bearing, setBearing] = useState(seed.heading);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STREET_STYLE_URL,
      center: [seed.startLng, seed.startLat],
      zoom: seed.zoom,
      minZoom: 14,
      maxZoom: 18,
      pitch: 67,
      bearing: seed.heading,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.touchZoomRotate.enable();
    map.touchZoomRotate.disableRotation();
    map.on("styledata", () => hideTextLabels(map));
    map.on("click", (event) => {
      const center = map.getCenter();
      const nextBearing = getBearing(center.lat, center.lng, event.lngLat.lat, event.lngLat.lng);
      setBearing(nextBearing);
      map.easeTo({
        center: event.lngLat,
        bearing: nextBearing,
        pitch: 67,
        zoom: Math.max(map.getZoom(), seed.zoom),
        duration: 650
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [round.id]);

  return (
    <div className="earth-street-view">
      <div ref={containerRef} className="earth-street-map" />
      <div className="street-reticle" aria-hidden="true">
        <LocateFixed size={24} />
      </div>
      <div className="street-compass" aria-label={`Bearing ${Math.round(bearing)} degrees`}>
        <Compass size={18} style={{ transform: `rotate(${bearing}deg)` }} />
      </div>
    </div>
  );
}

function getBearing(fromLat: number, fromLng: number, toLat: number, toLng: number) {
  const fromLatRad = toRadians(fromLat);
  const toLatRad = toRadians(toLat);
  const deltaLng = toRadians(toLng - fromLng);
  const y = Math.sin(deltaLng) * Math.cos(toLatRad);
  const x = Math.cos(fromLatRad) * Math.sin(toLatRad) - Math.sin(fromLatRad) * Math.cos(toLatRad) * Math.cos(deltaLng);
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI;
}
