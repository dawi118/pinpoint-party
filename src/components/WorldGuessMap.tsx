import { MousePointer2, RotateCcw } from "lucide-react";
import { PointerEvent, useRef } from "react";
import { clampLatLng, Coordinates, latLngToPercent, percentToLatLng } from "../lib/geo";

type WorldGuessMapProps = {
  value?: Coordinates;
  actual?: Coordinates;
  disabled?: boolean;
  onChange?: (position: Coordinates) => void;
  pins?: Array<{ id: string; label: string; color: string; position: Coordinates; hidden?: boolean }>;
};

export function WorldGuessMap({ value, actual, disabled, onChange, pins = [] }: WorldGuessMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const updateFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || !onChange || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    onChange(percentToLatLng(x, y));
  };

  const ownPin = value ? latLngToPercent(clampLatLng(value)) : undefined;
  const actualPin = actual ? latLngToPercent(actual) : undefined;

  return (
    <div className="map-shell">
      <div
        ref={mapRef}
        className={`world-map ${disabled ? "is-locked" : ""}`}
        onPointerDown={updateFromPointer}
        onPointerMove={(event) => {
          if (event.buttons === 1) updateFromPointer(event);
        }}
      >
        <div className="continents" aria-hidden="true">
          <span className="continent north-america" />
          <span className="continent south-america" />
          <span className="continent europe" />
          <span className="continent africa" />
          <span className="continent asia" />
          <span className="continent australia" />
          <span className="continent antarctica" />
        </div>

        {pins.map((pin) => {
          if (pin.hidden) return null;
          const point = latLngToPercent(pin.position);
          return (
            <span
              className="map-pin labelled"
              key={pin.id}
              style={{ left: `${point.x}%`, top: `${point.y}%`, color: pin.color }}
            >
              <span />
              <strong>{pin.label}</strong>
            </span>
          );
        })}

        {ownPin && (
          <span className="map-pin own" style={{ left: `${ownPin.x}%`, top: `${ownPin.y}%` }}>
            <span />
          </span>
        )}

        {actualPin && (
          <span className="map-pin actual" style={{ left: `${actualPin.x}%`, top: `${actualPin.y}%` }}>
            <span />
            <strong>Answer</strong>
          </span>
        )}

        {!disabled && !ownPin && (
          <div className="map-empty">
            <MousePointer2 size={26} />
            <span>Tap the map to place your pin</span>
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
