// File: src/pages/Files.jsx
// The open-source files (from src/data/project.js) and the license.
import { Link } from "react-router-dom";
import { Info, Scale } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import SourceCard from "../components/SourceCard.jsx";
import { LICENSE, SOURCE_GROUPS, SOURCES } from "../data/project.js";

export default function Files() {
  usePageMeta({
    title: "Source files",
    description:
      "TrakSpool's open-source files: enclosure CAD, PCB, bill of materials, firmware, admin console and documentation.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Source files</p>
        <h1 className="pageTitle">Every file to make one</h1>
        <p className="lead">
          Design files for the hardware, source code for the firmware and the admin console, and the
          documentation. Files marked “Coming soon” are being prepared for release.
        </p>
      </header>

      <section className="section" aria-label="Files">
        <div className="sourceGroups">
          {SOURCE_GROUPS.map((group) => (
            <div key={group.id} className="sourceGroup">
              <h2 className="eyebrow">{group.title}</h2>
              <ul className="sourceGrid">
                {SOURCES.filter((source) => source.group === group.id).map((source) => (
                  <SourceCard key={source.id} source={source} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="alert t-info">
          <Info aria-hidden="true" />
          <span>
            Prebuilt firmware is available now: the <Link to="/flasher">firmware updater</Link>{" "}
            installs the latest release from your browser.
          </span>
        </div>
      </section>

      <section className="section" aria-labelledby="license">
        <div className="sectionHead">
          <p className="eyebrow">License</p>
          <h2 id="license" className="sectionTitle">
            What you can do with the files
          </h2>
        </div>
        <div className={`card featureCard${LICENSE.summary ? "" : " sourceCard--pending"}`}>
          <span className="iconTile t-neutral">
            <Scale aria-hidden="true" />
          </span>
          {LICENSE.summary ? (
            <>
              <h3>{LICENSE.summary}</h3>
              {LICENSE.href && (
                <a href={LICENSE.href} target="_blank" rel="noopener noreferrer">
                  Read the license
                </a>
              )}
            </>
          ) : (
            <>
              <h3>
                License to be announced <span className="badge">Coming soon</span>
              </h3>
              <p>
                Each repository will carry its own LICENSE file saying what you may use, change and
                share. The hardware files and the software may use different licenses.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="panel ctaBand" aria-labelledby="files-cta">
        <div className="sectionHead">
          <h2 id="files-cta" className="sectionTitle">
            Ready to build?
          </h2>
          <p className="sectionText">The Build it guide goes from printed parts to a working scale.</p>
        </div>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/build">
            Build it
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/support">
            Read the FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
