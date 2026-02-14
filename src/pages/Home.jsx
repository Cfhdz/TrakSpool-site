// File: src/pages/Home.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";
import { ScrollToElementById } from "../components/ScrollToElementById.jsx";
import { FeatureIcon } from "../components/FeatureIcon";
import Timeline from "../components/Timeline.jsx";

function Hero() {
  return (
    <section className="hero">
      {/* LEFT */}
      <div className="panel heroLeft">

        <span className="heroKicker">Filament Inventory Management System</span>

        <h1 className="pageTitle">
          Smart spools. Zero guesswork.
        </h1>

        <p className="lead">
          TrakSpool combines RFID tagging with precision weighing to manage
          your filament inventory — so you always know exactly what's loaded
          and whether you have enough for your next print.
        </p>

        <div className="heroCtas">
          <button
            className="btn btn--primary btn--lg"
            type="button"
            onClick={() => ScrollToElementById("newsletterEmail")}
          >
            Join the Waitlist
          </button>
          <Link to="/features" className="btn">
            See All Features
          </Link>
        </div>

        <div className="trustBadges">
          <span>✓ No cloud required</span>
          <span>✓ No subscription</span>
          <span>✓ Your data stays yours</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="panel heroRight">
        <div className="mock">
          <div className="mockInner">
            <div>
              <div className="mockTitle">Prusament PLA</div>
              <div className="mockLine">Galaxy Black • 1.75mm</div>
              <div className="mockLine" style={{ marginTop: 'var(--space-3)' }}>
                <strong style={{ fontSize: 'var(--text-xl)', color: 'var(--accent-cyan)' }}>847g</strong>
                <span style={{ opacity: 0.6 }}> remaining</span>
              </div>
              <div className="mockLine">Last used: 2 days ago</div>
            </div>
            <div className="mockLine mockLineNote">Preview — design in progress</div>
          </div>
        </div>
        <div className="badges">
          <span className="badge">RFID / NFC</span>
          <span className="badge">Precision Scale</span>
          <span className="badge">Offline-First</span>
          <span className="badge">OpenPrintTag</span>
        </div>
      </div>
    </section>
  );
}

function TheProblem() {
  return (
    <section className="panel section sectionCentered">
      <h2 className="sectionTitle">Sound familiar?</h2>

      <div className="statCallouts">
        <div className="statCallout">
          <div className="statCalloutIcon">🛑</div>
          <div className="statCalloutTitle">The mid-print runout</div>
          <p className="statCalloutDesc">
            12-hour print, walk away, come back to a failed job — the
            spool ran dry at 80%.
          </p>
        </div>

        <div className="statCallout">
          <div className="statCalloutIcon">❓</div>
          <div className="statCalloutTitle">The mystery spool</div>
          <p className="statCalloutDesc">
            Half-used spools pile up. Which is PETG? Which PLA is the
            good brand? No one knows.
          </p>
        </div>

        <div className="statCallout">
          <div className="statCalloutIcon">⚖️</div>
          <div className="statCalloutTitle">The guessing game</div>
          <p className="statCalloutDesc">
            Slicer says 340g. The spool feels... maybe half full? Time
            to pull out the kitchen scale.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Tag it",
      description: "Stick an NFC tag on any spool. Enter the details once — or use a preset — and TrakSpool encodes the tag with everything: brand, material, color, temperatures, and weight."
    },
    {
      title: "Weigh it",
      description: "Place the spool on TrakSpool. The precision load cell reads the weight, subtracts the empty spool, and shows you exactly how much filament remains."
    },
    {
      title: "Print with confidence",
      description: "Leave it on TrakSpool while you print. The remaining weight updates automatically as filament is used — accurate to within half a gram."
    }
  ];

  return (
    <section className="panel section sectionCentered">
      <h2 className="sectionTitle">How it works</h2>
      <Timeline steps={steps} />
    </section>
  );
}

function WhatYouGet() {
  return (
    <section className="panel section sectionCentered">
      <h2 className="sectionTitle">More than a smart scale</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
        TrakSpool is a complete filament inventory management system.
      </p>

      <div className="splitRows">
        <div className="splitRow">
          <div className="splitRowVisual">
            <FeatureIcon name="tag" size={56} />
          </div>
          <div className="splitRowContent">
            <span className="splitRowTag">Universal</span>
            <h3 className="splitRowTitle">Tag any spool</h3>
            <p className="splitRowDesc">
              TrakSpool works with standard NFC Type 5 tags. Stick one on any
              spool you own — even spools from manufacturers that don't support
              RFID. Ten tags are included with every unit.
            </p>
          </div>
        </div>

        <div className="splitRow">
          <div className="splitRowVisual">
            <FeatureIcon name="inventory" size={56} />
          </div>
          <div className="splitRowContent">
            <span className="splitRowTag">Core Feature</span>
            <h3 className="splitRowTitle">Inventory management</h3>
            <p className="splitRowDesc">
              Every tagged spool is tracked in a searchable inventory. Filter by
              color, material, brand, or remaining amount. Always know what you
              have and where to find it — before you start your next print.
            </p>
          </div>
        </div>

        <div className="splitRow">
          <div className="splitRowVisual">
            <FeatureIcon name="presets" size={56} />
          </div>
          <div className="splitRowContent">
            <span className="splitRowTag">Portable</span>
            <h3 className="splitRowTitle">Presets that travel</h3>
            <p className="splitRowDesc">
              Save your print settings as presets. When you tag a spool, that
              data lives on the tag itself — temperatures, speeds, and notes
              move with the spool, not stuck on one device.
            </p>
          </div>
        </div>

        <div className="splitRow">
          <div className="splitRowVisual">
            <FeatureIcon name="dashboard" size={56} />
          </div>
          <div className="splitRowContent">
            <span className="splitRowTag">Flexible</span>
            <h3 className="splitRowTitle">Control it your way</h3>
            <p className="splitRowDesc">
              Use the built-in OLED screen and rotary dial for quick access, or
              open the web-based admin console from any browser on your network.
              No app download required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuiltDifferent() {
  return (
    <section className="panel section sectionCentered">
      <div className="highlightBand">
        <h2 className="highlightBandTitle">No cloud. No subscription. No tracking.</h2>
        <p className="highlightBandDesc">
          TrakSpool runs entirely on-device. Your filament inventory never
          leaves your network — and it never will.
        </p>
        <div className="highlightPills">
          <span className="highlightPill">
            <span className="highlightPillIcon">✓</span> Works fully offline
          </span>
          <span className="highlightPill">
            <span className="highlightPillIcon">✓</span> No accounts or sign-ups
          </span>
          <span className="highlightPill">
            <span className="highlightPillIcon">✓</span> No recurring fees
          </span>
          <span className="highlightPill">
            <span className="highlightPillIcon">✓</span> Buy once, own it forever
          </span>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="panel section sectionCentered">
      <h2 className="sectionTitle">Be first in line</h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
        TrakSpool is in active development. Join the waitlist for build updates, 
        early access opportunities, and launch pricing.
      </p>

      <div className="ctaRow">
        <button
          className="btn btn--primary btn--lg"
          type="button"
          onClick={() => ScrollToElementById("newsletterEmail")}
        >
          Join the Waitlist
        </button>
      </div>

      <div className="trustBadges trustBadges--muted">
        <span>✓ No spam — just milestones</span>
        <span>✓ Unsubscribe anytime</span>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(); // Uses defaults — homepage title and description

  return (
    <>
      <Hero />
      <TheProblem />
      <HowItWorks />
      <WhatYouGet />
      <BuiltDifferent />
      <FinalCTA />
    </>
  );
}