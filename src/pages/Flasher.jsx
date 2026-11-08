// File: src/pages/Flasher.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert, Usb } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import Steps from "../components/Steps.jsx";
import "./Flasher.css";
import flasherManifest from "../../public/flasher/manifest.json";

// Single source of truth: the flasher manifest that ships the binaries.
// Keeps this page from drifting out of sync with the actual firmware.
const FIRMWARE_VERSION = flasherManifest.version;
const FIRMWARE_RELEASED = flasherManifest.released;
const FIRMWARE_CHANGES = flasherManifest.changes ?? [];

const INSTALL_TAG = "esp-web-install-button";
const INSTALL_SCRIPT = "https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module";

const STEPS = [
  {
    title: "Back up",
    text: "In the admin console, open Spools and click Export. Keep the file: the update replaces the spools, presets and catalogs stored on the device.",
  },
  { title: "Connect", text: "Plug your TrakSpool into this computer with a USB-C cable." },
  { title: "Update", text: "Click Update Firmware and pick your device from the list." },
  { title: "Wait", text: "The update takes about 30 seconds. Don't unplug the device while it runs." },
  {
    title: "Restore",
    text: "TrakSpool restarts with the new firmware. Reload the admin console, open Spools, click Import and choose your backup.",
  },
];

const TROUBLESHOOTING = [
  {
    q: "Device not showing up in the list?",
    a: "Put the board into bootloader mode by quickly double-pressing the reset button on the device. The RGB LED pulses green when it is ready. Then click Update Firmware again.",
  },
  {
    q: "Update failed or device won't boot?",
    a: "Unplug the device and plug it back in. If it still won't start, double-press the reset button to put the board into bootloader mode (the RGB LED pulses green), then click Update Firmware and run the update again.",
  },
  {
    q: "I'm not using Chrome or Edge",
    a: "The browser updater needs the Web Serial API, which only Chrome and Edge on desktop have; Firefox and Safari do not. Without them, you can build the firmware from source and upload it with PlatformIO (see the Files page), or contact us for help.",
  },
  {
    q: "Does updating erase my data?",
    a: "Partly. The update installs the firmware and the device's file system, which holds the admin console and your data: the spool list, presets, unopened inventory, locations and catalog changes. That data is replaced. Wi-Fi settings, scale calibration, the autotag setting and the refill threshold are kept. Export a backup before you update and import it afterwards. Your spools' tags keep their own data: with autotag on, a tagged spool is imported again when it next sits on the scale.",
  },
];

export default function Flasher() {
  const [scriptLoaded, setScriptLoaded] = useState(() => Boolean(window.customElements?.get(INSTALL_TAG)));

  usePageMeta({
    title: "Firmware Updater",
    description:
      "Update your TrakSpool firmware directly from your browser. No software to install: plug in USB and click update.",
  });

  // Load ESP Web Tools once; the page is ready when its custom element is defined.
  useEffect(() => {
    let cancelled = false;
    if (!document.querySelector('script[src*="esp-web-tools"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = INSTALL_SCRIPT;
      document.head.appendChild(script);
    }
    window.customElements.whenDefined(INSTALL_TAG).then(() => {
      if (!cancelled) setScriptLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Firmware updater</p>
        <h1 className="pageTitle">Update your TrakSpool</h1>
        <p className="lead">
          Install the latest firmware from your browser. Nothing to install: connect USB and click.
        </p>
      </header>

      <section className="release" aria-label="Latest firmware">
        <div className="panel installCard">
          <p className="eyebrow">Latest firmware</p>
          <div className="versionNumber">v{FIRMWARE_VERSION}</div>
          <div className="versionDate">Released {FIRMWARE_RELEASED}</div>
          <p className="alert t-warning">
            <TriangleAlert aria-hidden="true" />
            <span>
              <strong>Back up first.</strong> Updating replaces the spools, presets and catalogs stored
              on the device. In the admin console, open Spools and click Export; afterwards, Import
              the file.
            </span>
          </p>
          <esp-web-install-button manifest="/flasher/manifest.json">
            <button slot="activate" className="btn btn--lg" type="button">
              <Usb aria-hidden="true" />
              Update Firmware
            </button>
          </esp-web-install-button>
          {!scriptLoaded && <p className="installHint">Loading the updater…</p>}
          <p className="installHint">
            Needs{" "}
            <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
              Chrome
            </a>{" "}
            or{" "}
            <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer">
              Edge
            </a>{" "}
            on a desktop computer.
          </p>
        </div>

        {FIRMWARE_CHANGES.length > 0 && (
          <div className="card releaseNotes">
            <h2 className="eyebrow">What&apos;s new in v{FIRMWARE_VERSION}</h2>
            <ul className="bulletList">
              {FIRMWARE_CHANGES.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="section" aria-labelledby="flasher-how">
        <div className="sectionHead">
          <h2 id="flasher-how" className="sectionTitle">
            How it works
          </h2>
        </div>
        <Steps steps={STEPS} />
      </section>

      <section className="section" aria-labelledby="flasher-help">
        <div className="sectionHead">
          <h2 id="flasher-help" className="sectionTitle">
            Troubleshooting
          </h2>
        </div>
        <div className="faqList">
          {TROUBLESHOOTING.map(({ q, a }) => (
            <details key={q} className="faqItem">
              <summary className="faqQuestion">{q}</summary>
              <div className="faqAnswer">{a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="panel ctaBand" aria-labelledby="flasher-cta">
        <div className="sectionHead">
          <h2 id="flasher-cta" className="sectionTitle">
            Need help?
          </h2>
          <p className="sectionText">Having trouble with the update? We are happy to help.</p>
        </div>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/support">
            Read the FAQ
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/contact">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
