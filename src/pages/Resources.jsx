// File: src/pages/Resources.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function Resources() {
  usePageMeta({
    title: "Resources",
    description: "Documentation, firmware downloads, RFID tag guides, and technical resources for TrakSpool — coming at launch.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Resources</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Documentation, guides, and technical resources for TrakSpool.
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Documentation</h2>

        <div className="grid grid-3">
          <Link to="/resources/quick-start" className="card cardLink">
            <div className="cardHeader">
              <div className="cardIcon">🚀</div>
              <div className="cardH">Quick Start Guide</div>
            </div>
            <p className="cardP">
              Step-by-step setup instructions to get your TrakSpool running in minutes.
            </p>
            <span className="cardLinkArrow">→</span>
          </Link>

          <Link to="/resources/user-manual" className="card cardLink">
            <div className="cardHeader">
              <div className="cardIcon">📖</div>
              <div className="cardH">User Manual</div>
            </div>
            <p className="cardP">
              Complete documentation covering all features, settings, and workflows.
            </p>
            <span className="cardLinkArrow">→</span>
          </Link>

          <Link to="/resources/rfid-tag-guide" className="card cardLink">
            <div className="cardHeader">
              <div className="cardIcon">📡</div>
              <div className="cardH">RFID Tag Guide</div>
            </div>
            <p className="cardP">
              Recommended tags, placement tips, and OpenPrintTag compatibility info.
            </p>
            <span className="cardLinkArrow">→</span>
          </Link>

          <Link to="/resources/troubleshooting" className="card cardLink">
            <div className="cardHeader">
              <div className="cardIcon">🔧</div>
              <div className="cardH">Troubleshooting</div>
            </div>
            <p className="cardP">
              Solutions for common issues and calibration guidance.
            </p>
            <span className="cardLinkArrow">→</span>
          </Link>

          <div className="card cardMuted">
            <div className="cardHeader">
              <div className="cardIcon">⬇️</div>
              <div className="cardH">Firmware Downloads</div>
            </div>
            <p className="cardP">
              Latest firmware releases, changelogs, and update instructions.
            </p>
            <span className="cardBadge">Coming soon</span>
          </div>

          <div className="card cardMuted">
            <div className="cardHeader">
              <div className="cardIcon">🔌</div>
              <div className="cardH">API Documentation</div>
            </div>
            <p className="cardP">
              Technical reference for integrating TrakSpool with other tools and systems.
            </p>
            <span className="cardBadge">Coming soon</span>
          </div>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>External resources</h2>

        <div className="grid grid-2">
          <a
            href="https://openprinttag.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card cardLink"
          >
            <div className="cardHeader">
              <div className="cardIcon">🏷️</div>
              <div className="cardH">OpenPrintTag Standard</div>
            </div>
            <p className="cardP">
              Learn about the open RFID standard for 3D printing that TrakSpool supports.
            </p>
            <span className="cardLinkArrow">→</span>
          </a>

          <Link to="/support" className="card cardLink">
            <div className="cardHeader">
              <div className="cardIcon">💬</div>
              <div className="cardH">FAQ & Support</div>
            </div>
            <p className="cardP">
              Find answers to common questions or get in touch with our team.
            </p>
            <span className="cardLinkArrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
