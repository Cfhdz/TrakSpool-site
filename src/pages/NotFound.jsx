// File: src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

function LostSpoolIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" opacity="0.5" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
      <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.3" />
      <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="currentColor">
        ?
      </text>
    </svg>
  );
}

export default function NotFound() {
  usePageMeta({ title: "Page Not Found" });

  return (
    <section className="notFound" aria-labelledby="not-found-title">
      <LostSpoolIllustration />
      <p className="eyebrow">Error 404</p>
      <h1 id="not-found-title" className="pageTitle">
        Page not found
      </h1>
      <p className="lead">The page you are looking for doesn't exist or has been moved.</p>
      <div className="ctaRow">
        <Link to="/" className="btn">
          Go to the home page
        </Link>
        <Link to="/support" className="btn btn--ghost">
          Read the FAQ
        </Link>
      </div>
    </section>
  );
}
