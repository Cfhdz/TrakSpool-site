// File: src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange.jsx";
import NewsletterSignup from "./components/NewsletterSignup.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";

import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import Store from "./pages/Store.jsx";
import Resources from "./pages/Resources.jsx";
import Support from "./pages/Support.jsx";
import Contact from "./pages/Contact.jsx";
import DocViewer from "./pages/DocViewer.jsx";
import NotFound from "./pages/NotFound.jsx";
import Privacy from "./pages/Privacy.jsx";
import ToS from "./pages/ToS.jsx";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="headerInner">
        {/* Brand (logo + name) */}
        <Link to="/" className="brand brandLink" aria-label="TrakSpool Home">
          <img className="logoImg" src="/logo.svg" alt="TrakSpool logo" />
          <div className="brandText">
            <div className="brandTitle">TrakSpool</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav navDesktop" aria-label="Primary">
          <NavLink to="/features" className={linkClass}>Features</NavLink>
          <NavLink to="/store" className={linkClass}>Store</NavLink>
          <NavLink to="/resources" className={linkClass}>Resources</NavLink>
          <NavLink to="/support" className={linkClass}>Support</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <ThemeToggle />
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="mobileHeaderActions">
          <ThemeToggle />
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span className={`hamburgerBar ${mobileMenuOpen ? "hamburgerBar--open" : ""}`} />
            <span className={`hamburgerBar ${mobileMenuOpen ? "hamburgerBar--open" : ""}`} />
            <span className={`hamburgerBar ${mobileMenuOpen ? "hamburgerBar--open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          <NavLink to="/features" className={linkClass}>Features</NavLink>
          <NavLink to="/store" className={linkClass}>Store</NavLink>
          <NavLink to="/resources" className={linkClass}>Resources</NavLink>
          <NavLink to="/support" className={linkClass}>Support</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Footer">
      <div className="footerInner">
        {/* Row 1: links */}
        <div className="footerTop">
          <div className="footerBrand">TrakSpool</div>
          <div className="footerLinks">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/store">Store</Link>
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Row 2: newsletter */}
        <div className="newsletter" aria-label="Product Updates signup">
          <div className="newsletterTitle">Product Updates</div>
          <NewsletterSignup />
        </div>

        {/* Row 3: copyright */}
        <div className="footerBottom">
          <span>© {year} TrakSpool. All rights reserved.</span>
          <span className="footerLegal">
            <Link to="/privacy">Privacy</Link>
            <span className="footerSeparator">·</span>
            <Link to="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="ambientGlow" />
      <Header />

      <div className="container">
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/store" element={<Store />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<DocViewer />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<ToS />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
      
      {/* Scroll to top button - appears after scrolling down */}
      <ScrollToTop />
      
      {/* Settings panel - floating button bottom-left */}
      <SettingsPanel />
    </>
  );
}
