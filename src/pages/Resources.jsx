// File: src/pages/Resources.jsx
// Docs: the user guides (src/data/docs.js), build and developer docs, and outside links.
import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp, Download, ExternalLink, FileCode, GitPullRequest, Hammer, Tag } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import { DOCS } from "../data/docs.js";

const PLANNED = [
  {
    icon: <FileCode aria-hidden="true" />,
    title: "API reference",
    text: "The device's REST API, for integrating TrakSpool with other tools.",
  },
  {
    icon: <GitPullRequest aria-hidden="true" />,
    title: "Contributing guide",
    text: "How to build the code, report a bug and send a change.",
  },
];

export default function Resources() {
  usePageMeta({
    title: "Docs",
    description:
      "TrakSpool documentation: quick start, user manual, RFID tag guide, troubleshooting, the firmware updater, and build and developer guides.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Docs</p>
        <h1 className="pageTitle">Documentation</h1>
        <p className="lead">Guides for using TrakSpool, building one, and working on the code.</p>
      </header>

      <section className="section" aria-labelledby="user-guides">
        <div className="sectionHead">
          <h2 id="user-guides" className="sectionTitle">
            User guides
          </h2>
        </div>
        <div className="grid grid-4">
          {Object.entries(DOCS).map(([slug, doc]) => {
            const Icon = doc.icon;
            return (
              <Link key={slug} to={`/resources/${slug}`} className="card linkCard">
                <span className="iconTile">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <span className="linkCardFoot">
                  Read
                  <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="build-docs">
        <div className="sectionHead">
          <h2 id="build-docs" className="sectionTitle">
            Build and develop
          </h2>
        </div>
        <div className="grid grid-4">
          <Link to="/build" className="card linkCard">
            <span className="iconTile">
              <Hammer aria-hidden="true" />
            </span>
            <h3>Build it</h3>
            <p>Make a TrakSpool at home, from printed parts to a working scale.</p>
            <span className="linkCardFoot">
              Open
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
          <Link to="/flasher" className="card linkCard">
            <span className="iconTile">
              <Download aria-hidden="true" />
            </span>
            <h3>Firmware updater</h3>
            <p>Install the latest firmware from your browser, with release notes.</p>
            <span className="linkCardFoot">
              Open
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
          {PLANNED.map(({ icon, title, text }) => (
            <div key={title} className="card linkCard linkCard--pending">
              <span className="iconTile t-neutral">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="badge">Coming soon</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="elsewhere">
        <div className="sectionHead">
          <h2 id="elsewhere" className="sectionTitle">
            Elsewhere
          </h2>
        </div>
        <div className="grid grid-2">
          <a href="https://openprinttag.com" target="_blank" rel="noopener noreferrer" className="card linkCard">
            <span className="iconTile">
              <Tag aria-hidden="true" />
            </span>
            <h3>OpenPrintTag standard</h3>
            <p>The open NFC tag format for 3D printing filament that TrakSpool reads and writes.</p>
            <span className="linkCardFoot">
              openprinttag.com
              <ExternalLink aria-hidden="true" />
            </span>
          </a>
          <Link to="/support" className="card linkCard">
            <span className="iconTile">
              <CircleHelp aria-hidden="true" />
            </span>
            <h3>FAQ</h3>
            <p>Answers to common questions about parts, tags, calibration and privacy.</p>
            <span className="linkCardFoot">
              Read
              <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
