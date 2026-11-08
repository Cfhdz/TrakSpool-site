// File: src/pages/Contact.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Bug, Github, LifeBuoy, Mail } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import { GITHUB } from "../data/project.js";

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description:
      "Get in touch with TrakSpool: general questions, help with a build or the firmware, bug reports and contributions.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Contact</p>
        <h1 className="pageTitle">Get in touch</h1>
        <p className="lead">Questions, feedback or a bug to report? Pick the channel that fits.</p>
      </header>

      <section className="section" aria-label="Ways to get in touch">
        <div className="grid grid-3">
          <a href="mailto:hello@trakspool.com" className="card linkCard">
            <span className="iconTile">
              <Mail aria-hidden="true" />
            </span>
            <h2>General</h2>
            <p>Questions, feedback, partnerships, or just saying hello.</p>
            <span className="linkCardFoot">hello@trakspool.com</span>
          </a>

          <a href="mailto:support@trakspool.com" className="card linkCard">
            <span className="iconTile">
              <LifeBuoy aria-hidden="true" />
            </span>
            <h2>Help</h2>
            <p>Help with a build, the firmware updater, or a device that misbehaves.</p>
            <span className="linkCardFoot">support@trakspool.com</span>
          </a>

          {GITHUB.published ? (
            <a href={GITHUB.href} target="_blank" rel="noopener noreferrer" className="card linkCard">
              <span className="iconTile">
                <Github aria-hidden="true" />
              </span>
              <h2>GitHub</h2>
              <p>Bug reports, feature ideas and pull requests.</p>
              <span className="linkCardFoot">
                Open GitHub
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          ) : (
            <div className="card linkCard linkCard--pending">
              <span className="iconTile t-neutral">
                <Bug aria-hidden="true" />
              </span>
              <h2>GitHub</h2>
              <p>Bug reports, feature ideas and pull requests, once the repositories are public.</p>
              <span className="badge">Coming soon</span>
            </div>
          )}
        </div>
        <p className="meta">
          We do our best to answer quickly. For something urgent, put “URGENT” in the subject line.
        </p>
      </section>

      <section className="panel ctaBand" aria-labelledby="contact-cta">
        <div className="sectionHead">
          <h2 id="contact-cta" className="sectionTitle">
            Looking for answers?
          </h2>
          <p className="sectionText">Many common questions are already answered in the FAQ.</p>
        </div>
        <div className="ctaRow">
          <Link className="btn btn--lg" to="/support">
            Read the FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
