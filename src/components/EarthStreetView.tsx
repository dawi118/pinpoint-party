import { Compass } from "lucide-react";
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
    map.scrollZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.on("styledata", () => hideTextLabels(map));
    map.on("load", () => {
      hideTextLabels(map);
      addBuildingExtrusions(map);
      map.resize();
    });
    map.on("rotate", () => {
      setBearing(map.getBearing());
    });

    const resizeMap = () => map.resize();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resizeMap) : undefined;
    resizeObserver?.observe(containerRef.current);
    window.addEventListener("resize", resizeMap);
    window.visualViewport?.addEventListener("resize", resizeMap);
    requestAnimationFrame(resizeMap);
    window.setTimeout(resizeMap, 250);

    mapRef.current = map;

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeMap);
      window.visualViewport?.removeEventListener("resize", resizeMap);
      map.remove();
      mapRef.current = null;
    };
  }, [round.id]);

  return (
    <div className="earth-street-view">
      <div ref={containerRef} className="earth-street-map" />
      <div className="street-compass" aria-label={`Bearing ${Math.round(bearing)} degrees`}>
        <Compass size={18} style={{ transform: `rotate(${bearing}deg)` }} />
      </div>
    </div>
  );
}

function addBuildingExtrusions(map: maplibregl.Map) {
  if (map.getLayer("pinpoint-3d-buildings")) return;
  const style = map.getStyle();
  const sourceName = Object.keys(style.sources ?? {}).find((name) => name === "openmaptiles" || name === "openfreemap" || name === "protomaps");
  if (!sourceName) return;

  const firstSymbolLayer = style.layers?.find((layer) => layer.type === "symbol")?.id;

  try {
    map.addLayer(
      {
        id: "pinpoint-3d-buildings",
        source: sourceName,
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": "#6d7f91",
          "fill-extrusion-height": ["coalesce", ["get", "render_height"], ["get", "height"], 18],
          "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], ["get", "min_height"], 0],
          "fill-extrusion-opacity": 0.72
        }
      },
      firstSymbolLayer
    );
  } catch {
    // Some tile styles do not expose a compatible building layer.
  }
}
