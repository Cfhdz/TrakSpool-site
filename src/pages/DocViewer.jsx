// File: src/pages/DocViewer.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import "./DocViewer.css";

const DOCS = {
  "quick-start": {
    title: "Quick Start Guide",
    icon: "\u{1F680}",
    description: "Step-by-step setup instructions to get your TrakSpool running in minutes.",
    pdf: "quick-start.pdf",
  },
  "user-manual": {
    title: "User Manual",
    icon: "\u{1F4D6}",
    description: "Complete documentation covering all features, settings, and workflows.",
    pdf: "user-manual.pdf",
  },
  "rfid-tag-guide": {
    title: "RFID Tag Guide",
    icon: "\u{1F4E1}",
    description: "Recommended tags, placement tips, and OpenPrintTag compatibility info.",
    pdf: "rfid-tag-guide.pdf",
  },
  troubleshooting: {
    title: "Troubleshooting",
    icon: "\u{1F527}",
    description: "Solutions for common issues and calibration guidance.",
    pdf: "troubleshooting.pdf",
  },
};

export { DOCS };

export default function DocViewer() {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doc = DOCS[slug];

  useEffect(() => {
    if (!doc) return;

    setLoading(true);
    setError(null);

    fetch(`/docs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load document");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug, doc]);

  // Unknown slug
  if (!doc) {
    return (
      <>
        <section className="panel section sectionCentered">
          <h1 className="pageTitle">Document Not Found</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-5)" }}>
            The document you're looking for doesn't exist.
          </p>
          <Link className="btn btn--primary" to="/resources">
            Back to Resources
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Header bar */}
      <section className="panel section">
        <div className="docHeader">
          <Link to="/resources" className="docBackLink">
            &larr; Resources
          </Link>

          <div className="docTitleRow">
            <span className="docIcon">{doc.icon}</span>
            <h1 className="docTitle">{doc.title}</h1>
          </div>

          <a
            href={`/docs/${doc.pdf}`}
            download
            className="btn btn--sm"
          >
            Download PDF
          </a>
        </div>
      </section>

      {/* Document content */}
      <section className="panel section">
        <div className="docContent">
          {loading && (
            <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "var(--space-6) 0" }}>
              Loading document...
            </p>
          )}

          {error && (
            <p style={{ color: "var(--accent-red, #f87171)", textAlign: "center", padding: "var(--space-6) 0" }}>
              {error}
            </p>
          )}

          {!loading && !error && (
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{markdown}</Markdown>
          )}
        </div>
      </section>

      {/* Related docs */}
      <section className="panel section">
        <div className="docRelated">
          <h2 className="docRelatedHeading">Other Documentation</h2>
          <div className="docRelatedGrid">
            {Object.entries(DOCS)
              .filter(([key]) => key !== slug)
              .map(([key, d]) => (
                <Link key={key} to={`/resources/${key}`} className="docRelatedCard">
                  <span className="docRelatedIcon">{d.icon}</span>
                  <div>
                    <span className="docRelatedTitle">{d.title}</span>
                    <span className="docRelatedDesc">{d.description}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="panel section sectionCentered">
        <div className="actions" style={{ justifyContent: "center" }}>
          <Link className="btn btn--ghost" to="/resources">
            &larr; Back to Resources
          </Link>
          <a href={`/docs/${doc.pdf}`} download className="btn btn--primary">
            Download PDF
          </a>
        </div>
      </section>
    </>
  );
}
