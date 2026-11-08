// File: src/pages/Support.jsx
// FAQ. The same data feeds the page and the FAQPage structured data for search engines.
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

const FAQ_GROUPS = [
  {
    id: "about",
    title: "About TrakSpool",
    items: [
      {
        q: "What is TrakSpool?",
        a: "TrakSpool is an open-source filament inventory system for 3D printing. It combines an NFC tag reader with a precision scale: put a tagged spool on it and it shows the material, exactly how much remains, and whether there is enough for your next print. Every spool you tag joins a searchable inventory you can filter by material, brand, color or remaining weight.",
      },
      {
        q: "How is this different from slicer estimates?",
        a: "Slicers estimate usage from the model and assumptions about the material. TrakSpool weighs the actual spool, so partial spools, failed prints and real-world variation are all accounted for. You get a measurement, not a guess.",
      },
      {
        q: "Can I use my existing spools?",
        a: "Yes. TrakSpool works with any spool from any manufacturer. Stick an NFC tag on it, enter the material details (or pick a preset), and it is part of your inventory. Prusament spools that already carry a tag are read automatically.",
      },
    ],
  },
  {
    id: "open-source",
    title: "Open source and building",
    items: [
      {
        q: "Is TrakSpool open source?",
        a: "Yes. The firmware, the admin console, the desktop app, the documentation, and the enclosure and PCB design files are all part of the open-source project. The Files page lists each one; files marked “Coming soon” are still being prepared for release.",
      },
      {
        q: "Can I buy a TrakSpool?",
        a: "TrakSpool is released as a do-it-yourself project. The Build it page lists the parts you need and walks through making one, and the Files page has the design files and source code.",
      },
      {
        q: "What do I need to build one?",
        a: "An Arduino Nano ESP32, a load cell with an NAU7802 ADC board, a PN5180 NFC reader, a 128 × 64 OLED display, a rotary encoder and two buttons, the TrakSpool PCB and a 3D-printed enclosure. The full bill of materials will be published with the hardware files.",
      },
      {
        q: "What license is it under?",
        a: "The license will be published with the source files. Each repository will carry its own LICENSE file saying what you may use, change and share; the hardware files and the software may use different licenses.",
      },
      {
        q: "How can I contribute?",
        a: "Bug reports, ideas and pull requests will be welcome on GitHub once the repositories are public. Until then, write to hello@trakspool.com.",
      },
    ],
  },
  {
    id: "compatibility",
    title: "Compatibility",
    items: [
      {
        q: "What printers does it work with?",
        a: "Any. TrakSpool tracks the spool itself rather than talking to printer firmware, so it works alongside any FDM printer, whatever the brand or model.",
      },
      {
        q: "Does it work with Prusament RFID spools?",
        a: "Yes. TrakSpool reads Prusament spools that already have NFC tags, with no extra tagging. Bambu Lab uses a proprietary RFID system that is not compatible; for Bambu Lab spools, or any other untagged spool, just add an NFC tag.",
      },
      {
        q: "Can I reuse NFC tags?",
        a: "Yes. Tags are rewritable. When a spool is empty, peel the tag off and stick it on a new spool, or leave it on if you refill the spool. TrakSpool lets you update the tag with the new material details.",
      },
      {
        q: "What RFID tags are compatible?",
        a: "TrakSpool uses NXP ICODE SLIX2 tags (ISO 15693, NFC Type 5, 320 bytes), the same chip Prusament spools carry, and follows the OpenPrintTag standard. Smaller ISO 15693 tags, such as the original ICODE SLIX, cannot hold the data. The RFID Tag Guide lists what to buy.",
      },
      {
        q: "What size spools does it fit?",
        a: "TrakSpool is designed for standard 200 mm (1 kg) spools, which covers most desktop FDM filament. Exact dimensions will be listed with the enclosure files.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy and ownership",
    items: [
      {
        q: "Does TrakSpool need internet access?",
        a: "No. TrakSpool works entirely offline. Wi-Fi is optional: it lets you open the admin console from a browser on your local network, but weighing, tagging and the inventory work without any network connection.",
      },
      {
        q: "Is my data stored in the cloud?",
        a: "No. Everything stays on the device: spool records, weight history, presets and settings. Nothing is sent to outside servers.",
      },
      {
        q: "Is there a subscription?",
        a: "No. There are no accounts and no recurring fees, and firmware updates are free.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    items: [
      {
        q: "How accurate is the weight measurement?",
        a: "TrakSpool uses a load cell with a 24-bit ADC and stability detection that filters out vibration and noise. In normal conditions readings are accurate to within about half a gram, which is plenty to know whether you have enough filament for your next print.",
      },
      {
        q: "Do I need to calibrate it?",
        a: "Yes, once after you build it: the guided calibration on the device uses a known reference weight. Calibrate again if you move TrakSpool to a different surface.",
      },
      {
        q: "How do I control it?",
        a: "On the device with the OLED screen and rotary encoder, through the admin console in any browser on your local network, or with the desktop app. No accounts to create.",
      },
      {
        q: "Will TrakSpool integrate with my printer?",
        a: "Direct printer integration over MQTT is on the roadmap. It would let TrakSpool send material data and remaining weight to firmware such as Klipper and OctoPrint, including a warning when a print job needs more filament than the loaded spool holds.",
      },
      {
        q: "How is it powered?",
        a: "Over USB-C. Any standard 5 V USB power source works: a phone charger, a USB port on your printer, or a powered hub.",
      },
    ],
  },
];

function FaqJsonLd() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      }))
    ),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />;
}

export default function Support() {
  usePageMeta({
    title: "FAQ",
    description:
      "Frequently asked questions about TrakSpool: open source and building one, compatibility, privacy and technical details.",
  });

  return (
    <>
      <FaqJsonLd />
      <header className="pageHead">
        <p className="eyebrow">FAQ</p>
        <h1 className="pageTitle">Questions and answers</h1>
        <p className="lead">Common questions about TrakSpool. Something missing? Get in touch.</p>
      </header>

      <div className="faqGroups">
        {FAQ_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="faqGroup" aria-labelledby={`${group.id}-title`}>
            <h2 id={`${group.id}-title`}>{group.title}</h2>
            <div className="faqList">
              {group.items.map(({ q, a }) => (
                <details key={q} className="faqItem">
                  <summary className="faqQuestion">{q}</summary>
                  <div className="faqAnswer">{a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="panel ctaBand" aria-labelledby="faq-cta">
        <div className="sectionHead">
          <h2 id="faq-cta" className="sectionTitle">
            Still have questions?
          </h2>
          <p className="sectionText">If you cannot find the answer here, we are happy to help.</p>
        </div>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/contact">
            Contact
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/resources">
            Read the docs
          </Link>
        </div>
      </section>
    </>
  );
}
