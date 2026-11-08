// File: src/pages/Privacy.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "TrakSpool's privacy policy: no cookies, no tracking, no user profiles. Your data stays yours.",
  });

  return (
    <>
      <header className="pageHead">
        <p className="eyebrow">Legal</p>
        <h1 className="pageTitle">Privacy Policy</h1>
        <p className="lead">The shortest privacy policy you will read today.</p>
        <p className="meta">Last updated: November 2026</p>
      </header>

      <article className="prose">
        <h2>The short version</h2>
        <p>
          <strong>We don't track you. We don't store your data. We can't sell what we don't have.</strong>
        </p>
        <p>That's it. That's the policy. But if you want the details…</p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Cookies:</strong> none. Zero. We don't use them.
          </li>
          <li>
            <strong>Tracking:</strong> nope. No pixels, no fingerprinting, no following you around.
          </li>
          <li>
            <strong>User profiles:</strong> we don't build them. We don't know who you are. That's
            intentional.
          </li>
        </ul>

        <h2>Analytics</h2>
        <p>
          We may use privacy-friendly analytics to see if anyone's actually reading this. If we do,
          it's the boring kind:
        </p>
        <ul>
          <li>No cookies</li>
          <li>No personal data</li>
          <li>No way to identify you</li>
        </ul>
        <p>Just page counts. Like a website guest book, but less awkward.</p>

        <h2>Data sharing</h2>
        <ul>
          <li>
            <strong>Ad networks:</strong> no.
          </li>
          <li>
            <strong>Data brokers:</strong> also no.
          </li>
          <li>
            <strong>Third parties:</strong> still no. Hard to share what doesn't exist.
          </li>
        </ul>

        <h2>Changes</h2>
        <p>
          If TrakSpool ever needs to collect more data (accounts, purchases, etc.), we'll update
          this policy first. No surprises, no fine print, no “we reserve the right” nonsense.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have privacy concerns, or just want to say hi, <Link to="/contact">get in touch</Link>.
        </p>
      </article>
    </>
  );
}
