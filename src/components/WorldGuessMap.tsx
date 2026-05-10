import { Crosshair, RotateCcw } from "lucide-react";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import { Coordinates } from "../lib/geo";

type WorldGuessMapProps = {
  value?: Coordinates;
  actual?: Coordinates;
  disabled?: boolean;
  onChange?: (position: Coordinates) => void;
  pins?: Array<{ id: string; label: string; color: string; position: Coordinates; hidden?: boolean }>;
};

const STREET_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

export function WorldGuessMap({ value, actual, disabled, onChange, pins = [] }: WorldGuessMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
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

    if (hidePlaceLabels) {
      map.on("styledata", () => hideTextLabels(map));
    }

    map.on("click", (event) => {
      if (disabledRef.current || !onChangeRef.current) return;
      onChangeRef.current({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const addMarker = (
      position: Coordinates,
      options: { label?: string; color: string; className: string; draggable?: boolean; onDragEnd?: (position: Coordinates) => void }
    ) => {
      const element = document.createElement("div");
      element.className = `real-map-marker ${options.className}`;
      element.style.setProperty("--marker-color", options.color);
      element.innerHTML = `<span></span>${options.label ? `<strong>${options.label}</strong>` : ""}`;

      const marker = new maplibregl.Marker({ element, draggable: options.draggable })
        .setLngLat([position.lng, position.lat])
        .addTo(map);

      if (options.onDragEnd) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          options.onDragEnd?.({ lat: lngLat.lat, lng: lngLat.lng });
        });
      }

      markersRef.current.push(marker);
    };

    pins.forEach((pin) => {
      if (!pin.hidden) {
        addMarker(pin.position, {
          label: pin.label,
          color: pin.color,
          className: "labelled"
        });
      }
    });

    if (actual) {
      addMarker(actual, {
        label: "Answer",
        color: "#ff6b57",
        className: "actual"
      });
    }

    if (value) {
      addMarker(value, {
        color: "#f6c85f",
        className: "own",
        draggable: !disabled,
        onDragEnd: (position) => onChangeRef.current?.(position)
      });
    }

    const boundsPositions = [
      ...pins.filter((pin) => !pin.hidden).map((pin) => pin.position),
      ...(actual ? [actual] : []),
      ...(value ? [value] : [])
    ];

    if (boundsPositions.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      boundsPositions.forEach((position) => bounds.extend([position.lng, position.lat]));
      map.fitBounds(bounds, { padding: 80, maxZoom: 8, duration: disabled ? 900 : 0 });
    }
  }, [actual, disabled, pins, value]);

  return (
    <div className="map-shell">
      <div ref={containerRef} className={`world-map real-world-map ${disabled ? "is-locked" : ""}`}>
        {!disabled && !value && (
          <div className="map-empty">
            <Crosshair size={26} />
            <span>Tap the map or pinch to explore</span>
          </div>
        )}
      </div>

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

function hideTextLabels(map: maplibregl.Map) {
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
