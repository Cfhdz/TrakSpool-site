// File: src/pages/Contact.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description: "Get in touch with the TrakSpool team — general inquiries, technical support, or pre-order questions.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Contact</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have a question or feedback? Reach out using the email that best matches your needs.
        </p>
      </section>

      <section className="panel section">
        <div className="grid grid-2 contactGrid">
          <a href="mailto:hello@trakspool.com" className="card cardLink contactCard">
            <div className="contactCardIcon">💬</div>
            <div className="cardH">General</div>
            <p className="cardP">Questions, feedback, partnerships, or just saying hello</p>
            <span className="contactEmail">hello@trakspool.com</span>
          </a>

          <a href="mailto:support@trakspool.com" className="card cardLink contactCard">
            <div className="contactCardIcon">🛠</div>
            <div className="cardH">Support</div>
            <p className="cardP">Technical help, troubleshooting, or product issues</p>
            <span className="contactEmail">support@trakspool.com</span>
          </a>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
          We'll do our best to get back to you quickly. For urgent issues, include "URGENT" in your subject line.
        </p>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Looking for answers?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          Many common questions are already answered in our FAQ.
        </p>
        <div className="ctaRow">
          <Link 
            className="btn btn--primary btn--lg" 
            to="/support"
            style={{ minWidth: '180px' }}
          >
            View FAQ
          </Link>
        </div>
      </section>
    </>
  );
}