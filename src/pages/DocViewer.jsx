// File: src/pages/DocViewer.jsx
// Renders a user guide from public/docs/<slug>.md, with its PDF for download.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import usePageMeta from "../hooks/usePageMeta.js";
import { DOCS } from "../data/docs.js";
import "./DocViewer.css";

export default function DocViewer() {
  const { slug } = useParams();
  const doc = DOCS[slug];
  // The loaded document and which slug it belongs to: a mismatch means "still loading".
  const [result, setResult] = useState({ slug: null, text: "", error: null });

  usePageMeta({ title: doc ? doc.title : "Document Not Found", description: doc?.description });

  useEffect(() => {
    if (!doc) return undefined;
    let cancelled = false;
    fetch(`/docs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("This document could not be loaded. Try the PDF instead.");
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setResult({ slug, text, error: null });
      })
      .catch((err) => {
        if (!cancelled) setResult({ slug, text: "", error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [slug, doc]);

  const backLink = (
    <Link to="/resources" className="backLink">
      <ArrowLeft aria-hidden="true" />
      Docs
    </Link>
  );

  if (!doc) {
    return (
      <header className="pageHead">
        {backLink}
        <h1 className="pageTitle">Document not found</h1>
        <p className="lead">The document you are looking for doesn't exist.</p>
        <Link className="btn" to="/resources">
          Back to the docs
        </Link>
      </header>
    );
  }

  const loading = result.slug !== slug;

  return (
    <>
      <header className="pageHead">
        {backLink}
        <h1 className="pageTitle">{doc.title}</h1>
        <p className="lead">{doc.description}</p>
        <a href={`/docs/${doc.pdf}`} download className="btn btn--ghost">
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </header>

      <article className="panel docBody" aria-busy={loading}>
        {loading && (
          <p className="docStatus">
            <span className="spinner" aria-hidden="true" /> Loading the document…
          </p>
        )}
        {!loading && result.error && (
          <p className="alert t-danger" role="alert">
            {result.error}
          </p>
        )}
        {!loading && !result.error && (
          <div className="docContent">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {result.text}
            </Markdown>
          </div>
        )}
      </article>

      <section className="section" aria-labelledby="other-docs">
        <div className="sectionHead">
          <h2 id="other-docs" className="sectionTitle">
            Other guides
          </h2>
        </div>
        <div className="grid grid-3">
          {Object.entries(DOCS)
            .filter(([key]) => key !== slug)
            .map(([key, other]) => {
              const Icon = other.icon;
              return (
                <Link key={key} to={`/resources/${key}`} className="card linkCard">
                  <span className="iconTile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{other.title}</h3>
                  <p>{other.description}</p>
                  <span className="linkCardFoot">
                    Read
                    <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
}
