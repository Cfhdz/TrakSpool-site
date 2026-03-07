// File: src/pages/Flasher.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";
import "./Flasher.css";

const FIRMWARE_VERSION = "0.1.1";

function StepCard({ number, title, description }) {
  return (
    <div className="flasher-step card card--centered">
      <div className="flasher-stepNumber">{number}</div>
      <div className="cardH">{title}</div>
      <p className="cardP">{description}</p>
    </div>
  );
}

export default function Flasher() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  usePageMeta({
    title: "Firmware Updater",
    description:
      "Update your TrakSpool firmware directly from your browser. No software to install — just plug in USB and click update.",
  });

  // Load ESP Web Tools script
  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="esp-web-tools"]'
    );
    if (existing) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module";
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Script stays loaded — no cleanup needed
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="panel section sectionCentered">
        <div className="flasher-badge">
          <span className="flasher-badgeDot" />
          Beta Program
        </div>
        <h1 className="pageTitle">Firmware Updater</h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto" }}>
          Update your TrakSpool directly from your browser.
          No software to install — just connect USB and click.
        </p>
      </section>

      {/* Current version */}
      <section className="panel section sectionCentered">
        <div className="flasher-versionCard">
          <div className="flasher-versionLabel">Latest Firmware</div>
          <div className="flasher-versionNumber">v{FIRMWARE_VERSION}</div>
        </div>
      </section>

      {/* Steps */}
      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: "center" }}>
          How It Works
        </h2>
        <div className="grid grid-2">
          <StepCard
            number="1"
            title="Connect"
            description="Plug your TrakSpool into this computer using a USB-C cable."
          />
          <StepCard
            number="2"
            title="Update"
            description="Click the Update Firmware button below and select your device from the list."
          />
          <StepCard
            number="3"
            title="Wait"
            description="The update takes about 30 seconds. Don't disconnect the device during this time."
          />
          <StepCard
            number="4"
            title="Done"
            description="Your TrakSpool will restart automatically with the latest firmware."
          />
        </div>
      </section>

      {/* Flash button */}
      <section className="panel section sectionCentered">
        <div className="flasher-installArea">
          {/* eslint-disable-next-line react/no-unknown-property */}
          <esp-web-install-button manifest="/flasher/manifest.json">
            <button
              slot="activate"
              className="btn btn--primary btn--lg flasher-installBtn"
            >
              Update Firmware
            </button>
          </esp-web-install-button>

          {!scriptLoaded && (
            <p className="flasher-hint">Loading updater…</p>
          )}

          <p className="flasher-hint">
            Requires{" "}
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>{" "}
            or{" "}
            <a
              href="https://www.microsoft.com/edge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>{" "}
            on a desktop computer.
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: "center" }}>
          Troubleshooting
        </h2>
        <div className="flasher-troubleshooting">
          <details className="faqItem">
            <summary className="faqQuestion">
              Device not showing up in the list?
            </summary>
            <div className="faqAnswer">
              Try putting the board into bootloader mode by quickly
              double-pressing the reset button on the device. The RGB LED
              will pulse green when it's ready. Then click Update Firmware
              again.
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              Update failed or device won't boot?
            </summary>
            <div className="faqAnswer">
              Don't worry — TrakSpool has a built-in safe mode. If the
              firmware fails to boot three times, it will automatically
              enter recovery mode. Double-press the reset button to enter
              bootloader mode and try the update again.
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              I'm not using Chrome or Edge
            </summary>
            <div className="faqAnswer">
              The browser-based updater requires the Web Serial API, which
              is only available in Chrome and Edge on desktop. Firefox and
              Safari do not support it. If you can't use Chrome or Edge,
              contact us for an alternative update method.
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              Do I need to update the filesystem too?
            </summary>
            <div className="faqAnswer">
              Most updates only require a firmware update, which is what
              this tool does. If a specific update requires a filesystem
              update, we'll provide separate instructions alongside the
              release notes.
            </div>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Need Help?</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--space-5)",
          }}
        >
          Having trouble with the update? We're happy to help.
        </p>
        <div className="ctaRow">
          <Link
            className="btn btn--primary btn--lg"
            to="/support"
            style={{ minWidth: "180px" }}
          >
            View FAQ
          </Link>
          <Link
            className="btn btn--ghost btn--lg"
            to="/contact"
            style={{ minWidth: "180px" }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
