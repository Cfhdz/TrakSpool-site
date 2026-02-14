// File: src/pages/ToS.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function ToS() {
  usePageMeta({
    title: "Terms of Service",
    description: "TrakSpool terms of service — written like humans actually read it.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          The "please don't sue us" page, written like humans actually read it.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
          Last updated: January 2026
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>The gist</h2>
        
        <div className="card card--centered" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP" style={{ fontSize: 'var(--text-md)' }}>
            TrakSpool is a work in progress. We're building something we think is cool, 
            sharing it openly, and asking you to be reasonable in return.
          </p>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>What this covers</h2>
        
        <div className="grid grid-2">
          <div className="card card--centered">
            <div className="cardH">Today</div>
            <p className="cardP">This website and any content on it.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Eventually</div>
            <p className="cardP">Any future firmware, software, hardware, or services we release.</p>
          </div>
        </div>
        
        <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', marginTop: 'var(--space-4)' }}>
          Not everything exists yet, but these terms are written for TrakSpool as it grows.
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>No promises</h2>
        
        <div className="grid grid-3">
          <div className="card card--centered">
            <div className="cardH">Features</div>
            <p className="cardP">Plans may change. Timelines may slip. That's how building things works.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Accuracy</div>
            <p className="cardP">We try to be right, but we're not perfect. Info is provided as-is.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Compatibility</div>
            <p className="cardP">We can't guarantee it works with every printer, spool, or setup imaginable.</p>
          </div>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Use at your own risk</h2>
        
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP" style={{ marginBottom: 'var(--space-3)' }}>
            If you use TrakSpool — now or in the future — you're responsible for:
          </p>
          <ul className="cardList">
            <li>Setting it up correctly</li>
            <li>Using it sensibly</li>
            <li>Any outcomes, good or bad</li>
          </ul>
          <p className="cardP" style={{ marginTop: 'var(--space-3)', color: 'var(--text-tertiary)' }}>
            This is especially true for hardware and electronics. 
            We're not liable if something goes sideways.
          </p>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Our stuff is ours</h2>
        
        <div className="grid grid-3">
          <div className="card card--centered">
            <div className="cardH">Don't steal it</div>
            <p className="cardP">Content, branding, and materials belong to TrakSpool.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Don't fake it</div>
            <p className="cardP">Don't claim you're affiliated with us if you're not.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Don't resell it</div>
            <p className="cardP">Ask first if you want to redistribute anything.</p>
          </div>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Changes</h2>
        
        <div className="card card--centered" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP">
            These terms may evolve as TrakSpool does. Updates will be posted here. 
            If you keep using the site or products, you're agreeing to the latest version. 
            No sneaky edits — we'll update the date at the top like civilized people.
          </p>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Questions?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          If anything here is confusing — or you just want to chat — reach out.
        </p>
        <div className="ctaRow">
          <Link 
            className="btn btn--primary btn--lg" 
            to="/contact"
            style={{ minWidth: '180px' }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}