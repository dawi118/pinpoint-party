import { MapPinned } from "lucide-react";

export function AppLogo() {
  return (
    <a className="app-logo" href="/" aria-label="PinPoint Party main menu">
      <span><MapPinned size={19} /></span>
      <strong>PinPoint Party</strong>
    </a>
  );
}
