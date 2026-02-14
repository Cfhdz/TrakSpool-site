// File: src/pages/Privacy.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "TrakSpool's privacy policy — no cookies, no tracking, no user profiles. Your data stays yours.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          The shortest privacy policy you'll read today.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
          Last updated: January 2026
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>The short version</h2>
        
        <div className="card card--centered" style={{ maxWidth: '600px', margin: '0 auto var(--space-5)' }}>
          <p className="cardP" style={{ fontSize: 'var(--text-md)' }}>
            We don't track you. We don't store your data. We can't sell what we don't have.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
          That's it. That's the policy. But if you want the details...
        </p>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>What we collect</h2>
        
        <div className="grid grid-3">
          <div className="card card--centered">
            <div className="cardH">Cookies</div>
            <p className="cardP">None. Zero. We don't use them.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Tracking</div>
            <p className="cardP">Nope. No pixels, no fingerprinting, no following you around.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">User profiles</div>
            <p className="cardP">We don't build them. We don't know who you are. That's intentional.</p>
          </div>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Email signup</h2>
        
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP" style={{ marginBottom: 'var(--space-3)' }}>
            If you join the waitlist, we collect exactly one thing: your email address. That's it.
          </p>
          <ul className="cardList">
            <li>Handled by Mailchimp (not stored by us directly)</li>
            <li>Used only for TrakSpool updates</li>
            <li>Never sold, traded, or shared</li>
            <li>Unsubscribe anytime — we'll miss you, but we'll cope</li>
          </ul>
          <p className="cardP" style={{ marginTop: 'var(--space-3)', color: 'var(--text-tertiary)' }}>
            Don't sign up? Then we don't have your email. Problem solved.
          </p>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Analytics</h2>
        
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP" style={{ marginBottom: 'var(--space-3)' }}>
            We may use privacy-friendly analytics to see if anyone's actually reading this. 
            If we do, it's the boring kind:
          </p>
          <ul className="cardList">
            <li>No cookies</li>
            <li>No personal data</li>
            <li>No way to identify you</li>
          </ul>
          <p className="cardP" style={{ marginTop: 'var(--space-3)', color: 'var(--text-tertiary)' }}>
            Just page counts. Like a website guest book, but less awkward.
          </p>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Data sharing</h2>
        
        <div className="grid grid-3">
          <div className="card card--centered">
            <div className="cardH">Ad networks</div>
            <p className="cardP">No.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Data brokers</div>
            <p className="cardP">Also no.</p>
          </div>
          <div className="card card--centered">
            <div className="cardH">Third parties</div>
            <p className="cardP">Still no. Hard to share what doesn't exist.</p>
          </div>
        </div>
      </section>

      <section className="panel section">
        <h2 className="sectionTitle" style={{ textAlign: 'center' }}>Changes</h2>
        
        <div className="card card--centered" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="cardP">
            If TrakSpool ever needs to collect more data (accounts, purchases, etc.), 
            we'll update this policy first. No surprises, no fine print, no "we reserve the right" nonsense.
          </p>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Questions?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          If you have privacy concerns — or just want to say hi — reach out anytime.
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