// File: src/pages/ToS.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function ToS() {
  usePageMeta({
    title: "Terms of Service",
    description: "TrakSpool terms of service, written like humans actually read it.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Legal</p>
        <h1 className="pageTitle">Terms of Service</h1>
        <p className="lead">The “please don't sue us” page, written like humans actually read it.</p>
        <p className="meta">Last updated: November 2026</p>
      </header>

      <article className="prose">
        <h2>The gist</h2>
        <p>
          TrakSpool is a work in progress. We're building something we think is cool, sharing it
          openly, and asking you to be reasonable in return.
        </p>

        <h2>What this covers</h2>
        <ul>
          <li>
            <strong>Today:</strong> this website and any content on it.
          </li>
          <li>
            <strong>Eventually:</strong> any future firmware, software, hardware designs or services
            we release.
          </li>
        </ul>
        <p>Not everything exists yet, but these terms are written for TrakSpool as it grows.</p>

        <h2>No promises</h2>
        <ul>
          <li>
            <strong>Features:</strong> plans may change. Timelines may slip. That's how building
            things works.
          </li>
          <li>
            <strong>Accuracy:</strong> we try to be right, but we're not perfect. Info is provided
            as-is.
          </li>
          <li>
            <strong>Compatibility:</strong> we can't guarantee it works with every printer, spool or
            setup imaginable.
          </li>
        </ul>

        <h2>Use at your own risk</h2>
        <p>If you use TrakSpool, now or in the future, you're responsible for:</p>
        <ul>
          <li>Building and setting it up correctly</li>
          <li>Using it sensibly</li>
          <li>Any outcomes, good or bad</li>
        </ul>
        <p>
          This is especially true for hardware and electronics, and for a device you assemble
          yourself. We're not liable if something goes sideways.
        </p>

        <h2>Open-source files, and our name</h2>
        <ul>
          <li>
            <strong>Source and design files:</strong> the firmware, apps, CAD and PCB files are
            published under the licenses in their repositories. Those licenses say what you may use,
            change and share.
          </li>
          <li>
            <strong>Don't fake it:</strong> the TrakSpool name and logo are not part of those
            licenses. Don't use them in a way that suggests you're us or that we endorse you.
          </li>
          <li>
            <strong>This website:</strong> its text and images belong to TrakSpool. Ask first if you
            want to republish them.
          </li>
        </ul>

        <h2>Changes</h2>
        <p>
          These terms may evolve as TrakSpool does. Updates will be posted here. If you keep using
          the site or the project, you're agreeing to the latest version. No sneaky edits: we'll
          update the date at the top like civilized people.
        </p>

        <h2>Questions?</h2>
        <p>
          If anything here is confusing, or you just want to chat, <Link to="/contact">get in touch</Link>.
        </p>
      </article>
    </>
  );
}
