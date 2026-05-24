import { RotateCcw } from "lucide-react";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import { Coordinates } from "../lib/geo";

type MapPin = { id: string; label: string; color: string; position: Coordinates; hidden?: boolean };
type MarkerConfig = {
  id: string;
  position: Coordinates;
  label?: string;
  color: string;
  className: string;
  draggable?: boolean;
  onDragEnd?: (position: Coordinates) => void;
};
type MarkerRecord = {
  marker: maplibregl.Marker;
  signature: string;
};

type WorldGuessMapProps = {
  value?: Coordinates;
  actual?: Coordinates;
  disabled?: boolean;
  onChange?: (position: Coordinates) => void;
  pins?: MapPin[];
  helperPins?: MapPin[];
  helperCenter?: Coordinates;
};

const STREET_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const GUIDE_SOURCE_ID = "pinpoint-helper-guides";
const GUIDE_LAYER_ID = "pinpoint-helper-guides-line";

export function WorldGuessMap({ value, actual, disabled, onChange, pins = [], helperPins = [], helperCenter }: WorldGuessMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRecordsRef = useRef<Map<string, MarkerRecord>>(new Map());
  const onChangeRef = useRef(onChange);
  const disabledRef = useRef(disabled);
  const hidePlaceLabels = Boolean(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
    disabledRef.current = disabled;
  }, [disabled, onChange]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STREET_STYLE_URL,
      center: value ? [value.lng, value.lat] : [0, 20],
      zoom: value ? 4 : 1.25,
      minZoom: 1,
      maxZoom: 15,
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

    const resizeMap = () => map.resize();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resizeMap) : undefined;
    resizeObserver?.observe(containerRef.current);

    if (hidePlaceLabels) {
      map.on("load", () => hideTextLabels(map));
      map.on("styledata", () => hideTextLabels(map));
    }

    map.on("load", resizeMap);
    window.addEventListener("resize", resizeMap);
    window.visualViewport?.addEventListener("resize", resizeMap);
    requestAnimationFrame(resizeMap);
    window.setTimeout(resizeMap, 250);

    map.on("click", (event) => {
      if (disabledRef.current || !onChangeRef.current) return;
      onChangeRef.current({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    });

    mapRef.current = map;

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeMap);
      window.visualViewport?.removeEventListener("resize", resizeMap);
      markerRecordsRef.current.forEach(({ marker }) => marker.remove());
      markerRecordsRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const guideFeatures = helperPins.length >= 2 && helperCenter
      ? helperPins
          .filter((pin) => !pin.hidden)
          .map((pin) => ({
            type: "Feature" as const,
            properties: {},
            geometry: {
              type: "LineString" as const,
              coordinates: [
                [pin.position.lng, pin.position.lat],
                [helperCenter.lng, helperCenter.lat]
              ]
            }
          }))
      : [];
    const guideData = {
      type: "FeatureCollection" as const,
      features: guideFeatures
    } satisfies GeoJSON.FeatureCollection;
    const syncGuideLines = () => {
      if (!map.isStyleLoaded()) return;
      const existingSource = map.getSource(GUIDE_SOURCE_ID) as maplibregl.GeoJSONSource | undefined;

      if (!guideFeatures.length) {
        if (map.getLayer(GUIDE_LAYER_ID)) map.removeLayer(GUIDE_LAYER_ID);
        if (existingSource) map.removeSource(GUIDE_SOURCE_ID);
        return;
      }

      if (existingSource) {
        existingSource.setData(guideData);
        return;
      }

      map.addSource(GUIDE_SOURCE_ID, {
        type: "geojson",
        data: guideData
      });
      map.addLayer({
        id: GUIDE_LAYER_ID,
        type: "line",
        source: GUIDE_SOURCE_ID,
        paint: {
          "line-color": "#ff6b57",
          "line-width": 2,
          "line-opacity": 0.62,
          "line-dasharray": [1.2, 1.6]
        }
      });
    };

    syncGuideLines();
    if (!map.isStyleLoaded()) map.once("load", syncGuideLines);

    const createMarker = (config: MarkerConfig) => {
      const element = document.createElement("div");
      element.className = `real-map-marker ${config.className}`;
      element.style.setProperty("--marker-color", config.color);
      element.innerHTML = `<span></span>${config.label ? `<strong>${config.label}</strong>` : ""}`;

      const marker = new maplibregl.Marker({ element, draggable: config.draggable })
        .setLngLat([config.position.lng, config.position.lat])
        .addTo(map);

      if (config.onDragEnd) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          config.onDragEnd?.({ lat: lngLat.lat, lng: lngLat.lng });
        });
      }

      return marker;
    };

    const markerConfigs: MarkerConfig[] = [];

    pins.forEach((pin) => {
      if (!pin.hidden) {
        markerConfigs.push({
          id: `pin:${pin.id}`,
          position: pin.position,
          label: pin.label,
          color: pin.color,
          className: "labelled"
        });
      }
    });

    helperPins.forEach((pin) => {
      if (!pin.hidden) {
        markerConfigs.push({
          id: `helper:${pin.id}`,
          position: pin.position,
          label: pin.label,
          color: pin.color,
          className: "placeholder"
        });
      }
    });

    if (helperCenter && helperPins.filter((pin) => !pin.hidden).length >= 2) {
      markerConfigs.push({
        id: "helper:center",
        position: helperCenter,
        label: "Guide centre",
        color: "#ff6b57",
        className: "helper-center"
      });
    }

    if (actual) {
      markerConfigs.push({
        id: "actual",
        position: actual,
        label: "Answer",
        color: "#ff6b57",
        className: "actual"
      });
    }

    if (value) {
      markerConfigs.push({
        id: "own",
        position: value,
        color: "#f6c85f",
        className: "own",
        draggable: !disabled,
        onDragEnd: (position) => onChangeRef.current?.(position)
      });
    }

    const desiredMarkerIds = new Set(markerConfigs.map((config) => config.id));
    markerRecordsRef.current.forEach(({ marker }, id) => {
      if (!desiredMarkerIds.has(id)) {
        marker.remove();
        markerRecordsRef.current.delete(id);
      }
    });

    markerConfigs.forEach((config) => {
      const signature = `${config.className}|${config.color}|${config.label ?? ""}|${Boolean(config.draggable)}`;
      const existing = markerRecordsRef.current.get(config.id);

      if (existing?.signature === signature) {
        existing.marker.setLngLat([config.position.lng, config.position.lat]);
        return;
      }

      existing?.marker.remove();
      markerRecordsRef.current.set(config.id, {
        marker: createMarker(config),
        signature
      });
    });

    const boundsPositions = [
      ...pins.filter((pin) => !pin.hidden).map((pin) => pin.position),
      ...(actual ? [actual] : []),
      ...(value ? [value] : [])
    ];
    const shouldFitBounds = !onChange || disabled;

    if (shouldFitBounds && boundsPositions.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      boundsPositions.forEach((position) => bounds.extend([position.lng, position.lat]));
      map.fitBounds(bounds, { padding: 80, maxZoom: 8, duration: disabled ? 900 : 0 });
    }
  }, [actual, disabled, helperCenter, helperPins, onChange, pins, value]);

  return (
    <div className="map-shell">
      <div ref={containerRef} className={`world-map real-world-map ${disabled ? "is-locked" : ""}`} />

      {onChange && (
        <button
          type="button"
          className="icon-action"
          title="Reset pin"
          disabled={disabled || !value}
          onClick={() => onChange({ lat: 20, lng: 0 })}
        >
          <RotateCcw size={18} />
        </button>
      )}
    </div>
  );
}

export function hideTextLabels(map: maplibregl.Map) {
  const style = map.getStyle();
  if (!style.layers) return;

  style.layers.forEach((layer) => {
    const layout = layer.layout as Record<string, unknown> | undefined;
    const textField = layout?.["text-field"];
    if (layer.type === "symbol" && textField) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  });
}
