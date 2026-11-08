// File: src/pages/Build.jsx
// Build it: the step-by-step guide to making a TrakSpool at home. All content comes from
// src/data/buildGuide.js; empty photos and instructions render as placeholders.
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon, Lightbulb } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import { FACTS, PARTS, STEPS, TOOLS } from "../data/buildGuide.js";

function StepMedia({ step }) {
  if (step.images?.length) {
    return (
      <div className="guideMedia">
        {step.images.map((image) => (
          <figure key={image.src} className="guideFigure">
            <img src={image.src} alt={image.alt} loading="lazy" />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }

  const slots = Array.from({ length: step.photoSlots ?? 1 }, (_, i) => i);
  return (
    <div className="guideMedia" aria-label="Photos coming soon">
      {slots.map((slot) => (
        <div key={slot} className="photoSlot" aria-hidden="true">
          <ImageIcon />
          Photo coming soon
        </div>
      ))}
    </div>
  );
}

function GuideStep({ step, number }) {
  const pending = !step.instructions?.length || !step.images?.length;

  return (
    <section id={step.id} className="card guideStep" aria-labelledby={`${step.id}-title`}>
      <div className="guideStepHead">
        <span className="stepNumber" aria-hidden="true">
          {number}
        </span>
        <h2 id={`${step.id}-title`}>
          <span className="visually-hidden">Step {number}: </span>
          {step.title}
        </h2>
        {pending && <span className="badge">In progress</span>}
      </div>

      <p className="guideSummary">{step.summary}</p>

      <StepMedia step={step} />

      {step.instructions?.length ? (
        <ol className="guideInstructions">
          {step.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      ) : (
        <p className="placeholderNote">Detailed instructions coming soon.</p>
      )}

      {step.tip && (
        <p className="alert t-accent">
          <Lightbulb aria-hidden="true" />
          <span>{step.tip}</span>
        </p>
      )}

      {step.links?.length > 0 && (
        <div className="cluster">
          {step.links.map((link) => (
            <Link key={link.to + link.label} className="btn btn--ghost btn--sm" to={link.to}>
              {link.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Build() {
  usePageMeta({
    title: "Build it",
    description:
      "Make a TrakSpool at home: the parts, the tools and a step-by-step guide from printed parts to a working filament scale.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Build it</p>
        <h1 className="pageTitle">Make a TrakSpool at home</h1>
        <p className="lead">
          A step-by-step guide from printed parts to a working scale. Photos and detailed
          instructions are being added; steps marked “In progress” are still to come.
        </p>
      </header>

      <section className="section" aria-labelledby="before">
        <div className="sectionHead">
          <p className="eyebrow">Before you start</p>
          <h2 id="before" className="sectionTitle">
            What you need
          </h2>
        </div>

        <div className="guideOverview">
          <div className="card guideFacts">
            <h3>At a glance</h3>
            <dl className="kv">
              {FACTS.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className={value ? undefined : "subtle"}>{value ?? "To be confirmed"}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card guideFacts">
            <h3>Tools</h3>
            <ul className="bulletList">
              {TOOLS.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p className="placeholderNote">The full tool list comes with the guide.</p>
          </div>
        </div>

        <div className="card partsCard">
          <dl className="kv">
            {PARTS.map(({ part, role }) => (
              <div key={part}>
                <dt>{part}</dt>
                <dd>{role}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="meta">
          Quantities and part numbers are in the bill of materials on the{" "}
          <Link to="/files">Files</Link> page.
        </p>
      </section>

      <section className="section" aria-labelledby="guide">
        <div className="sectionHead">
          <p className="eyebrow">The guide</p>
          <h2 id="guide" className="sectionTitle">
            Step by step
          </h2>
        </div>

        <nav aria-label="Steps">
          <ol className="toc">
            {STEPS.map((step, index) => (
              <li key={step.id}>
                <a href={`#${step.id}`}>
                  <span className="tocNum">{index + 1}</span>
                  {step.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="guideSteps">
          {STEPS.map((step, index) => (
            <GuideStep key={step.id} step={step} number={index + 1} />
          ))}
        </div>
      </section>

      <section className="panel ctaBand" aria-labelledby="build-cta">
        <div className="sectionHead">
          <h2 id="build-cta" className="sectionTitle">
            Stuck on a step?
          </h2>
          <p className="sectionText">The FAQ covers parts, tags and calibration. Or get in touch.</p>
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
