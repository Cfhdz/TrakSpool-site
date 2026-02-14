// File: src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

function LostSpoolIllustration() {
  return (
    <svg 
      className="notFoundIllustration" 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Spool outer ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="45" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeDasharray="8 4"
        opacity="0.3"
      />
      {/* Spool inner ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="20" 
        stroke="currentColor" 
        strokeWidth="2.5"
        opacity="0.5"
      />
      {/* Center hole */}
      <circle 
        cx="60" 
        cy="60" 
        r="8" 
        fill="currentColor"
        opacity="0.2"
      />
      {/* Question mark */}
      <text 
        x="60" 
        y="68" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="bold"
        fill="currentColor"
        opacity="0.6"
      >
        ?
      </text>
    </svg>
  );
}

export default function NotFound() {
  usePageMeta({ title: "Page Not Found" });

  return (
    <section className="panel section notFoundSection">
      <div className="notFoundContent">
        <LostSpoolIllustration />
        <div className="notFoundCode">404</div>
        <h1 className="pageTitle">Page not found</h1>
        <p className="notFoundMessage">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="notFoundActions">
          <Link to="/" className="btn btn--primary">
            Go to homepage
          </Link>
          <Link to="/support" className="btn">
            Visit support
          </Link>
        </div>
      </div>
    </section>
  );
}
