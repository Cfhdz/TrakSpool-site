// File: src/components/FeatureIcon.jsx
import {
  Nfc,             // RFID/NFC - waves symbol
  PackageSearch,   // Inventory - package with magnifying glass
  ShieldCheck,     // Local-first - security with checkmark
  Gauge,           // Dashboard - gauge/speedometer
  Layers,          // Platform - stacked layers
  Cpu,             // Tech specs - processor chip
  Weight,          // Scale - weight measurement
  Tag,             // Tag a spool
  SlidersHorizontal, // Presets / control
} from "lucide-react";

const ICON_PROPS = {
  size: 40,
  strokeWidth: 1.75,
};

export function FeatureIcon({ name, className, size }) {
  const icons = {
    rfid: Nfc,
    inventory: PackageSearch,
    local: ShieldCheck,
    dashboard: Gauge,
    platform: Layers,
    tech: Cpu,
    scale: Weight,
    tag: Tag,
    presets: SlidersHorizontal,
  };

  const Icon = icons[name];
  if (!Icon) return null;

  const props = size ? { ...ICON_PROPS, size } : ICON_PROPS;
  return <Icon {...props} className={className} />;
}