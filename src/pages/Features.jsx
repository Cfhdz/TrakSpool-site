// File: src/pages/Features.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";
import { ScrollToElementById } from "../components/ScrollToElementById.jsx";
import { FeatureIcon } from "../components/FeatureIcon";

function FeatureCard({ icon, title, features, summary }) {
  return (
    <div className="card featureCard">
      <div className="featureCardHeader">
        <FeatureIcon name={icon} className="featureIcon" />
        <div className="cardH">{title}</div>
      </div>

      <ul className="cardList">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <p className="cardP featureCardSummary">
        <strong>Why it matters:</strong>
        <br />
        {summary}
      </p>
    </div>
  );
}

export default function Features() {
  usePageMeta({
    title: "Features",
    description: "Precision weighing, RFID identification, searchable inventory, and a web-based console — all running locally with no cloud or subscriptions.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Features</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Everything TrakSpool does to take the guesswork out of filament management.
        </p>
      </section>

      <section className="panel section">
        <div className="spotlight spotlight--cyan">
          <div className="spotlightInner">
            <div className="spotlightContent">
              <span className="spotlightLabel spotlightLabel--cyan">Precision Hardware</span>
              <h2 className="spotlightTitle">Know exactly what's left</h2>
              <p className="spotlightDesc">
                A high-resolution load cell with 24-bit ADC reads your spool
                weight in real time — accurate, No more
                guessing, no more kitchen scales, no more spreadsheets.
              </p>
              <ul className="spotlightList">
                <li>Automatic empty spool weight subtraction</li>
                <li>Live weight updates as filament is consumed</li>
                <li>Stability detection filters out vibration and noise</li>
              </ul>
            </div>
            <div className="spotlightVisual">
              <FeatureIcon name="scale" size={80} />
            </div>
          </div>
        </div>

        <hr className="spotlightDivider" />

        <div className="spotlight spotlight--purple">
          <div className="spotlightInner">
            <div className="spotlightContent">
              <span className="spotlightLabel spotlightLabel--purple">Inventory Management</span>
              <h2 className="spotlightTitle">Every spool, tracked and searchable</h2>
              <p className="spotlightDesc">
                Tag any spool with NFC, and TrakSpool adds it to your inventory
                automatically. Search by material, brand, color, or remaining
                amount — your entire filament collection, organized.
              </p>
              <ul className="spotlightList">
                <li>Works with any spool — just add a tag</li>
                <li>Filter and search across your entire collection</li>
                <li>Track storage locations across your shop</li>
                <li>Track unopened spools too</li>
              </ul>
            </div>
            <div className="spotlightVisual">
              <FeatureIcon name="inventory" size={80} />
            </div>
          </div>
        </div>
      </section>

      <section className="panel section">
        <div className="grid grid-2 featureGrid">
          <FeatureCard
            icon="scale"
            title="Precision weighing"
            features={[
              "High-resolution load cell with 24-bit ADC",
              "Automatic empty spool weight subtraction",
              "Stability detection filters out noise",
              "Live updates as filament is consumed",
            ]}
            summary="Know exactly how much filament remains, within about half a gram."
          />

          <FeatureCard
            icon="rfid"
            title="RFID / NFC identification"
            features={[
              "Unique Type-5 tag per spool",
              "OpenPrintTag-compatible format",
              "Auto-detected when placed on holder",
              "Encodes brand, material, color, and settings",
            ]}
            summary="Every spool identifies itself instantly — no labels, no guessing."
          />

          <FeatureCard
            icon="inventory"
            title="Inventory management"
            features={[
              "Works with any spool (just add a tag)",
              "Search by material, brand, color, or remaining amount",
              "Track storage locations across your shop",
              "Full history of every tagged spool",
            ]}
            summary="Your complete filament inventory — searchable, organized, and always up to date."
          />

          <FeatureCard
            icon="dashboard"
            title="Web-based console"
            features={[
              "Hosted locally on the device",
              "Accessible from any browser on your network",
              "Mobile-friendly responsive layout",
              "No accounts to create, app if you want it. (app coming soon)",
            ]}
            summary="Manage your inventory and settings from any device."
          />

          <FeatureCard
            icon="local"
            title="Fully local, fully yours"
            features={[
              "No cloud dependency",
              "Works completely offline",
              "Your data never leaves your network",
            ]}
            summary="Your shop, your data, your control — forever."
          />

          <div className="card featureCard">
            <div className="featureCardHeader">
              <FeatureIcon name="tech" className="featureIcon" />
              <div className="cardH">Technical specs</div>
            </div>

            <ul className="cardList">
              <li>ESP32-S3 (dual-core, 240MHz) Architecture</li>
              <li>Wi-Fi 802.11 b/g/n + Bluetooth LE</li>
              <li>Precision strain gauge load cell</li>
              <li>NFC/RFID reader (ISO 15693 Type-5)</li>
              <li>OLED display - Rotary encoder - Confirm+Back Buttons</li>
            </ul>

            <p className="cardP featureCardSummary">
              <strong>Firmware</strong>
              <br />
              Event-driven architecture with a built-in admin console.
            </p>
          </div>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">On the roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          TrakSpool is designed to grow. Here's what's planned for future updates.
        </p>

        <div className="grid grid-3">
          <div className="card card--centered" style={{ opacity: 0.85 }}>
            <div className="cardH">Printer integration</div>
            <p className="cardP">
              MQTT support for direct communication with Klipper, OctoPrint, 
              and other printer firmware.
            </p>
            <span className="cardBadge">Planned</span>
          </div>

          <div className="card card--centered" style={{ opacity: 0.85 }}>
            <div className="cardH">Multi-unit dashboard</div>
            <p className="cardP">
              Track multiple TrakSpool devices from a single interface for 
              multi-printer setups.
            </p>
            <span className="cardBadge">Planned</span>
          </div>

          <div className="card card--centered" style={{ opacity: 0.85 }}>
            <div className="cardH">Print validation</div>
            <p className="cardP">
              Automatic warnings when a print job requires more filament 
              than the loaded spool contains.
            </p>
            <span className="cardBadge">Planned</span>
          </div>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Get TrakSpool</h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          TrakSpool is in active development. Join the waitlist to get notified 
          when units are available.
        </p>

        <div className="ctaRow">
          <button
            className="btn btn--primary btn--lg"
            type="button"
            style={{ minWidth: '180px' }}
            onClick={() => ScrollToElementById("newsletterEmail")}
          >
            Join the Waitlist
          </button>
          <Link
            className="btn btn--lg"
            to="/store"
            style={{ minWidth: '180px' }}
          >
            What's Included
          </Link>
        </div>
      </section>
    </>
  );
}