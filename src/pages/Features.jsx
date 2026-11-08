// File: src/pages/Features.jsx
import { Link } from "react-router-dom";
import { Cpu, Gauge, Nfc, PackageSearch, ShieldCheck, Weight } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";

const SPOTLIGHTS = [
  {
    icon: <Weight aria-hidden="true" />,
    eyebrow: "Precision hardware",
    title: "Know exactly what is left",
    text: "A load cell read by a 24-bit ADC weighs your spool in real time. No more guessing, kitchen scales or spreadsheets.",
    points: [
      "Empty-spool weight subtracted automatically",
      "Live weight as filament is used",
      "Stability detection filters out vibration and noise",
    ],
  },
  {
    icon: <PackageSearch aria-hidden="true" />,
    eyebrow: "Inventory management",
    title: "Every spool, tracked and searchable",
    text: "Tag a spool and TrakSpool adds it to your inventory. Search by material, brand, color or what is left: your whole filament collection, organized.",
    points: [
      "Works with any spool: just add a tag",
      "Filter and search the whole collection",
      "Storage locations across your shop",
      "Unopened spools too",
    ],
  },
];

const FEATURES = [
  {
    icon: <Weight aria-hidden="true" />,
    title: "Precision weighing",
    points: [
      "Load cell with a 24-bit ADC",
      "Empty-spool weight subtracted automatically",
      "Stability detection filters out noise",
      "Live updates as filament is used",
    ],
    summary: "Know how much filament remains, to within about half a gram.",
  },
  {
    icon: <Nfc aria-hidden="true" />,
    title: "RFID / NFC identification",
    points: [
      "One NFC Type 5 tag per spool",
      "OpenPrintTag-compatible format",
      "Detected as soon as the spool is placed",
      "Stores brand, material, color and settings",
    ],
    summary: "Every spool identifies itself: no labels, no guessing.",
  },
  {
    icon: <PackageSearch aria-hidden="true" />,
    title: "Inventory management",
    points: [
      "Works with any spool (just add a tag)",
      "Search by material, brand, color or remaining amount",
      "Storage locations across your shop",
      "Run Out Check: which spools to use up first",
    ],
    summary: "Your whole filament inventory, searchable and up to date.",
  },
  {
    icon: <Gauge aria-hidden="true" />,
    title: "Web-based console",
    points: [
      "Served by the device itself",
      "Opens in any browser on your network",
      "Laid out for phones, tablets and computers",
      "No accounts to create",
    ],
    summary: "Manage your inventory and settings from any device.",
  },
  {
    icon: <ShieldCheck aria-hidden="true" />,
    title: "Fully local, fully yours",
    points: ["No cloud dependency", "Works completely offline", "Your data never leaves your network"],
    summary: "Your shop, your data, your control.",
  },
  {
    icon: <Cpu aria-hidden="true" />,
    title: "Technical specs",
    points: [
      "Arduino Nano ESP32 (ESP32-S3, dual-core, 240 MHz)",
      "Wi-Fi 802.11 b/g/n and Bluetooth LE",
      "Strain-gauge load cell with an NAU7802 ADC",
      "PN5180 NFC reader (ISO 15693, Type 5)",
      "OLED display, rotary encoder, Confirm and Back buttons",
    ],
    summary: "Open firmware built with PlatformIO, with the admin console built in.",
  },
];

const ROADMAP = [
  {
    title: "Printer integration",
    text: "MQTT support to talk directly to Klipper, OctoPrint and other printer firmware.",
  },
  {
    title: "Multi-unit dashboard",
    text: "Several TrakSpool devices in one view, for multi-printer setups.",
  },
  {
    title: "Print validation",
    text: "A warning when a print job needs more filament than the loaded spool holds.",
  },
];

export default function Features() {
  usePageMeta({
    title: "Features",
    description:
      "Precision weighing, NFC spool identification, a searchable inventory and a web console, all running locally on open-source hardware and firmware.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Features</p>
        <h1 className="pageTitle">Everything TrakSpool does</h1>
        <p className="lead">
          What TrakSpool does to take the guesswork out of filament, and what is planned next.
        </p>
      </header>

      <section className="grid grid-2" aria-label="Highlights">
        {SPOTLIGHTS.map(({ icon, eyebrow, title, text, points }) => (
          <div key={title} className="card spotlight">
            <div className="stack">
              <p className="eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p>{text}</p>
              <ul className="bulletList">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <span className="iconTile">{icon}</span>
          </div>
        ))}
      </section>

      <section className="section" aria-labelledby="all-features">
        <div className="sectionHead">
          <p className="eyebrow">In detail</p>
          <h2 id="all-features" className="sectionTitle">
            All features
          </h2>
        </div>
        <div className="grid grid-3">
          {FEATURES.map(({ icon, title, points, summary }) => (
            <div key={title} className="card featureCard">
              <span className="iconTile">{icon}</span>
              <h3>{title}</h3>
              <ul className="bulletList">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="cardFoot">
                <strong>Why it matters:</strong> {summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="roadmap">
        <div className="sectionHead">
          <p className="eyebrow">Roadmap</p>
          <h2 id="roadmap" className="sectionTitle">
            On the roadmap
          </h2>
          <p className="sectionText">
            TrakSpool is designed to grow, and it is open source: help with any of these is
            welcome.
          </p>
        </div>
        <div className="grid grid-3">
          {ROADMAP.map(({ title, text }) => (
            <div key={title} className="card featureCard">
              <span className="badge t-info">Planned</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel ctaBand" aria-labelledby="features-cta">
        <div className="sectionHead">
          <h2 id="features-cta" className="sectionTitle">
            Build your own TrakSpool
          </h2>
          <p className="sectionText">
            Follow the Build it guide, from printed parts to a working scale. Every file is open.
          </p>
        </div>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/build">
            Build it
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/files">
            Get the files
          </Link>
        </div>
      </section>
    </>
  );
}
