// File: src/pages/Store.jsx
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta.js";
import { ScrollToElementById } from "../components/ScrollToElementById.jsx";

export default function Store() {
  usePageMeta({
    title: "Store",
    description: "What ships in the box: the TrakSpool unit, 10 NFC tags, and a USB-C cable. No subscriptions, no hidden costs — one purchase, full functionality.",
  });

  return (
    <>
      <section className="panel section sectionCentered">
        <h1 className="pageTitle">Store</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Pricing and availability information for TrakSpool.
        </p>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">What ships in the box</h2>
        <div className="grid grid-3">
          <div className="card card--centered">
            <div className="cardH">TrakSpool unit</div>
            <p className="cardP">
              Spool holder with integrated load cell, RFID reader, 
              OLED display, and rotary control.
            </p>
          </div>
          <div className="card card--centered">
            <div className="cardH">10× NFC tags</div>
            <p className="cardP">
              Pre-cut Type-5 ICODE SLIX tags ready to apply to your existing spools.
            </p>
          </div>
          <div className="card card--centered">
            <div className="cardH">USB-C power cable</div>
            <p className="cardP">
              Standard USB-C cable for power. No proprietary connectors or power bricks.
            </p>
          </div>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">What to expect</h2>
        <div className="accentBlocks">
          <div className="accentBlock">
            <div className="accentBlockTitle">Transparent pricing</div>
            <p className="accentBlockDesc">
              No subscriptions, no cloud fees, no hidden costs. One purchase
              gets you the hardware, the inventory management system, and all
              future firmware updates.
            </p>
          </div>
          <div className="accentBlock accentBlock--purple">
            <div className="accentBlockTitle">Launch timeline</div>
            <p className="accentBlockDesc">
              Final pricing depends on component costs and production minimums.
              Waitlist subscribers will be the first to know when details are finalized.
            </p>
          </div>
        </div>
      </section>

      <section className="panel section sectionCentered">
        <h2 className="sectionTitle">Get notified at launch</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
          Join the waitlist for pricing announcements, pre-order windows, and early access opportunities.
        </p>

        <div className="ctaRow">
          <button
            className="btn btn--primary btn--lg"
            type="button"
            style={{ minWidth: '180px' }}
            onClick={() => ScrollToElementById("newsletterEmail")}
          >
            Join the Waitlist
          </button>
          <Link 
            className="btn btn--lg" 
            to="/features"
            style={{ minWidth: '180px' }}
          >
            View Features
          </Link>
        </div>

        <div className="trustBadges trustBadges--muted">
          <span>✓ No spam — just milestones</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </section>
    </>
  );
}