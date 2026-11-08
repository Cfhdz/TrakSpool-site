// File: src/pages/Home.jsx
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Gauge,
  Hammer,
  NotebookPen,
  PackageSearch,
  SlidersHorizontal,
  Tag,
  TriangleAlert,
} from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import Steps from "../components/Steps.jsx";
import SourceCard from "../components/SourceCard.jsx";
import { SOURCES } from "../data/project.js";
import flasherManifest from "../../public/flasher/manifest.json";

// A copy of the admin console's Live Scale card, drawn with the same kit. Decorative: the
// caption under it says what it shows.
function DeviceCard() {
  return (
    <figure className="deviceFigure">
      <div className="panel" aria-hidden="true">
        <div className="deviceCardHead">
          <span className="deviceCardTitle">Live Scale</span>
          <span className="badge t-success">Stable</span>
        </div>
        <div className="deviceCardBody">
          <div className="readout">
            <div className="eyebrow">Grams net</div>
            <div className="readoutValue">618.6</div>
            <div className="readoutSub">Scale: 868.6g − Spool: 250g</div>
          </div>
          <div className="spoolRow">
            <span className="swatch" style={{ "--c": "#2b2c31" }} />
            <div>
              <div className="spoolName">Prusament PLA</div>
              <div className="spoolMeta">Galaxy Black · 1.75 mm</div>
            </div>
            <span className="badge t-accent">Tagged</span>
          </div>
          <div>
            <div className="meterRow">
              <span className="muted">Material remaining</span>
              <span className="num">619g / 1000g</span>
            </div>
            <div className="progress progress--accent">
              <span style={{ width: "62%" }} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="deviceCaption">
        The admin console, served by the device to any browser on your network.
      </figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="heroText">
        <div className="cluster">
          <span className="badge t-accent">Open source</span>
          <span className="badge">Firmware v{flasherManifest.version}</span>
        </div>
        <h1 id="hero-title" className="heroTitle">
          Smart spools. Zero guesswork.
        </h1>
        <p className="heroLead">
          TrakSpool is an open-source filament inventory system for 3D printing: a spool scale
          with an NFC tag reader that knows what is on every spool and how much is left. Build
          your own. The firmware, the admin console, the enclosure and the PCB are all open.
        </p>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/build">
            <Hammer aria-hidden="true" />
            Build your own
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/features">
            See the features
          </Link>
        </div>
        <ul className="checkList">
          <li>
            <Check aria-hidden="true" />
            Open source, hardware included
          </li>
          <li>
            <Check aria-hidden="true" />
            No cloud, no account
          </li>
          <li>
            <Check aria-hidden="true" />
            Works offline
          </li>
        </ul>
      </div>
      <DeviceCard />
    </section>
  );
}

const PROBLEMS = [
  {
    icon: <TriangleAlert aria-hidden="true" />,
    title: "The mid-print runout",
    text: "A 12-hour print, you walk away, and come back to a failed part: the spool ran out at 80%. The printer paused, but too late.",
  },
  {
    icon: <CircleHelp aria-hidden="true" />,
    title: "The mystery spool",
    text: "Half-used spools pile up. Is there enough on this one for the next print? Are you going to chance it?",
  },
  {
    icon: <NotebookPen aria-hidden="true" />,
    title: "The tracking game",
    text: "A notepad, a spreadsheet, a kitchen scale. There has to be a better way.",
  },
];

function TheProblem() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="sectionHead">
        <p className="eyebrow">The problem</p>
        <h2 id="problem-title" className="sectionTitle">
          Sound familiar?
        </h2>
      </div>
      <div className="grid grid-3">
        {PROBLEMS.map(({ icon, title, text }) => (
          <div key={title} className="card featureCard">
            <span className="iconTile t-warning">{icon}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const HOW_IT_WORKS = [
  { title: "Tag it", text: "Stick an NFC tag on any spool." },
  {
    title: "Track it",
    text: "Put the spool on TrakSpool. Enter the details once, or pick a preset, and TrakSpool writes them to the tag: brand, material, color, temperatures and remaining weight.",
  },
  {
    title: "Trust it",
    text: "Check what is left before you print, or leave the spool on TrakSpool while you print. The remaining weight updates as filament is used.",
  },
];

function HowItWorks() {
  return (
    <section className="section" aria-labelledby="how-title">
      <div className="sectionHead">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title" className="sectionTitle">
          Tag it. Track it. Trust it.
        </h2>
      </div>
      <Steps steps={HOW_IT_WORKS} />
    </section>
  );
}

const CAPABILITIES = [
  {
    icon: <Tag aria-hidden="true" />,
    eyebrow: "Universal",
    title: "Tag any spool",
    text: "TrakSpool uses standard NFC Type 5 tags. Stick one on any spool you own, even from brands that do not tag their spools.",
  },
  {
    icon: <PackageSearch aria-hidden="true" />,
    eyebrow: "Core",
    title: "Inventory management",
    text: "Every tagged spool, and every unopened spool you enter, is in one searchable inventory. Filter by color, material, brand or what is left. Run Out Check suggests which spools to use up first.",
  },
  {
    icon: <SlidersHorizontal aria-hidden="true" />,
    eyebrow: "Portable",
    title: "Presets that travel",
    text: "Save filament settings as presets. When you tag a spool the data lives on the tag itself, so temperatures and notes move with the spool, not with one device.",
  },
  {
    icon: <Gauge aria-hidden="true" />,
    eyebrow: "Flexible",
    title: "Control it your way",
    text: "Use the OLED screen and rotary dial on the device, or the admin console in any browser on your network. A phone app is planned.",
  },
];

function Capabilities() {
  return (
    <section className="section" aria-labelledby="capabilities-title">
      <div className="sectionHead">
        <p className="eyebrow">What it does</p>
        <h2 id="capabilities-title" className="sectionTitle">
          More than a smart scale
        </h2>
        <p className="sectionText">TrakSpool is a complete filament inventory system.</p>
      </div>
      <div className="grid grid-2">
        {CAPABILITIES.map(({ icon, eyebrow, title, text }) => (
          <div key={title} className="card featureCard">
            <span className="iconTile">{icon}</span>
            <p className="eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="section" aria-labelledby="open-title">
      <div className="sectionHead">
        <p className="eyebrow">Open source</p>
        <h2 id="open-title" className="sectionTitle">
          Open from the enclosure to the code
        </h2>
        <p className="sectionText">
          The printed parts, the circuit board, the firmware and the admin console are all part of the
          project. Build one, change it, or help improve it.
        </p>
      </div>
      <ul className="sourceGrid sourceGrid--compact">
        {SOURCES.map((source) => (
          <SourceCard key={source.id} source={source} compact />
        ))}
      </ul>
      <div className="sectionFoot">
        <Link className="btn btn--ghost" to="/files">
          All source files
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="panel band" aria-labelledby="principles-title">
      <h2 id="principles-title" className="sectionTitle">
        No cloud. No subscription. No tracking.
      </h2>
      <p className="sectionText">
        TrakSpool is as simple or as powerful as you need, wherever you are in your 3D printing
        journey. Set it up once and track your filament with confidence. Your data stays on your
        device.
      </p>
      <ul className="cluster">
        <li className="badge t-success">
          <Check aria-hidden="true" />
          Works fully offline
        </li>
        <li className="badge t-success">
          <Check aria-hidden="true" />
          No accounts or sign-ups
        </li>
        <li className="badge t-success">
          <Check aria-hidden="true" />
          No recurring fees
        </li>
        <li className="badge t-success">
          <Check aria-hidden="true" />
          Open source
        </li>
      </ul>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="panel ctaBand" aria-labelledby="cta-title">
      <div className="sectionHead">
        <h2 id="cta-title" className="sectionTitle">
          Build one, or help build it
        </h2>
        <p className="sectionText">
          The Build it guide goes from printed parts to a working scale. Questions, bug reports and
          ideas are welcome.
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
  );
}

export default function Home() {
  usePageMeta(); // homepage title and description

  return (
    <>
      <Hero />
      <TheProblem />
      <HowItWorks />
      <Capabilities />
      <OpenSource />
      <Principles />
      <FinalCta />
    </>
  );
}
