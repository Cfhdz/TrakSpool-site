// File: src/pages/Support.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

function FaqItem({ q, a }) {
  return (
    <details className="faqItem">
      <summary className="faqQuestion">{q}</summary>
      <div className="faqAnswer">{a}</div>
    </details>
  );
}

// FAQ data used for both rendering and JSON-LD structured data
const FAQ_DATA = [
  // — About TrakSpool (0–2)
  { q: "What is TrakSpool?", a: "TrakSpool is a filament inventory management system for 3D printing. It combines RFID identification with precision weighing — place any tagged spool on it and instantly see what material it is, exactly how much remains, and whether you have enough for your next print. Every spool you tag becomes part of a searchable inventory you can filter by material, brand, color, or remaining weight." },
  { q: "How is this different from slicer estimates?", a: "Slicers estimate usage based on the model and material assumptions. TrakSpool measures actual spool weight — accounting for partial spools, failed prints, and real-world variation. You get a measurement, not a guess." },
  { q: "Can I use my existing spools?", a: "Yes. TrakSpool works with any spool from any manufacturer. Apply one of the included NFC tags, enter your material details (or use a preset), and it's part of your inventory. Prusament spools with existing RFID tags are detected automatically." },

  // — Compatibility (3–7)
  { q: "What printers does it work with?", a: "TrakSpool is printer-agnostic. It tracks the spool itself rather than integrating with printer firmware, so it works alongside any FDM printer regardless of brand or model." },
  { q: "Does it work with Prusament RFID spools?", a: "Yes. TrakSpool automatically detects Prusament spools that already have NFC tags — no additional tagging needed. Note that Bambu Lab uses a proprietary RFID system that is not compatible. For Bambu Lab spools (or any other untagged spool), just apply one of the included NFC tags and you're set." },
  { q: "Can I reuse NFC tags?", a: "Yes. Tags are rewritable. When a spool is empty, peel the tag off and apply it to a new spool — or leave it on if you're refilling. TrakSpool will let you update the tag data with the new material details." },
  { q: "What RFID tags are compatible?", a: "TrakSpool uses ISO 15693 (NFC Type-5) tags and follows the OpenPrintTag standard. Ten compatible tags are included with every unit, and additional tags are widely available online." },
  { q: "What size spools does it fit?", a: "TrakSpool is designed for standard 200mm (1kg) spools, which covers the vast majority of desktop FDM filament. Exact dimensional tolerances will be confirmed with the final hardware revision." },

  // — Privacy & Ownership (8–10)
  { q: "Does TrakSpool require internet access?", a: "No. TrakSpool works entirely offline. Wi-Fi is optional — it lets you access the web-based admin console from a browser on your local network, but the core functionality (weighing, tagging, inventory) works without any network connection." },
  { q: "Is my data stored in the cloud?", a: "No. All data stays on the device. Spool records, weight history, presets, and settings are stored locally. Nothing is sent to external servers, ever." },
  { q: "Is there a subscription?", a: "No. TrakSpool is a one-time purchase with no recurring fees. The hardware, the inventory system, and all future firmware updates are included." },

  // — Technical (11–15)
  { q: "How accurate is the weight measurement?", a: "TrakSpool uses a precision load cell with a 24-bit ADC and stability detection to filter out vibration and noise. Under normal conditions, measurements are accurate to within half a gram — more than enough to know if you have enough filament for your next print." },
  { q: "Do I need to calibrate it?", a: "TrakSpool comes factory-calibrated and ready to use out of the box. If you ever need to recalibrate — for example, after moving it to a different surface — a guided calibration option is available through the on-device menu." },
  { q: "How do I control it?", a: "Two ways: directly on the device using the OLED screen and rotary encoder, or through the web-based admin console accessible from any browser on your local network. No apps to install, no accounts to create." },
  { q: "Will TrakSpool integrate with my printer?", a: "Direct printer integration via MQTT is on the roadmap. This will allow TrakSpool to communicate material data and remaining weight to compatible firmware like Klipper and OctoPrint — including warnings when a print job needs more filament than the loaded spool contains." },
  { q: "How is it powered?", a: "USB-C. Any standard 5V USB power source works — a phone charger, a USB port on your printer, or a powered hub. No proprietary power bricks or adapters needed." },

  // — Getting Started (16–18)
  { q: "When will TrakSpool be available?", a: "TrakSpool is currently in active development. Final hardware revisions are in progress. Join the waitlist to get notified when pre-orders open." },
  { q: "How much will it cost?", a: "Pricing will be announced closer to launch once component costs and production quantities are finalized. Waitlist subscribers will be the first to know." },
  { q: "What's included in the box?", a: "The TrakSpool unit (with integrated scale, RFID reader, OLED display, and rotary control), ten NFC tags, and a USB-C power cable. No proprietary accessories required." },
];

function FaqJsonLd() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
    />
  );
}

export default function Support() {
  usePageMeta({
    title: "Support",
    description: "Frequently asked questions about TrakSpool — compatibility, privacy, technical specs, pricing, and availability.",
  });

  return (
    <>
      <FaqJsonLd />
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Support</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Find answers to common questions below, or reach out if you need more help.
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>

        <div className="faqCategory">
          <h3 className="faqCategoryTitle">About TrakSpool</h3>
          {FAQ_DATA.slice(0, 3).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="faqCategory">
          <h3 className="faqCategoryTitle">Compatibility</h3>
          {FAQ_DATA.slice(3, 8).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="faqCategory">
          <h3 className="faqCategoryTitle">Privacy & Ownership</h3>
          {FAQ_DATA.slice(8, 11).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="faqCategory">
          <h3 className="faqCategoryTitle">Technical</h3>
          {FAQ_DATA.slice(11, 16).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="faqCategory">
          <h3 className="faqCategoryTitle">Getting Started</h3>
          {FAQ_DATA.slice(16).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Still have questions?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          Can't find what you're looking for? We're happy to help.
        </p>
        <div className="ctaRow">
          <Link
            className="btn btn--primary btn--lg"
            to="/contact"
            style={{ minWidth: '180px' }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}