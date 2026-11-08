// File: src/App.jsx
import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
  BookOpen,
  CircleHelp,
  Download,
  FolderOpen,
  Github,
  Hammer,
  House,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange.jsx";
import { GITHUB } from "./data/project.js";
import flasherManifest from "../public/flasher/manifest.json";

import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import Build from "./pages/Build.jsx";
import Files from "./pages/Files.jsx";
import Resources from "./pages/Resources.jsx";
import Support from "./pages/Support.jsx";
import Contact from "./pages/Contact.jsx";
import DocViewer from "./pages/DocViewer.jsx";
import NotFound from "./pages/NotFound.jsx";
import Privacy from "./pages/Privacy.jsx";
import ToS from "./pages/ToS.jsx";
import Flasher from "./pages/Flasher.jsx";

const NAV = [
  { to: "/features", label: "Features", icon: <Sparkles aria-hidden="true" /> },
  { to: "/build", label: "Build it", icon: <Hammer aria-hidden="true" /> },
  { to: "/files", label: "Files", icon: <FolderOpen aria-hidden="true" /> },
  { to: "/resources", label: "Docs", icon: <BookOpen aria-hidden="true" /> },
  { to: "/flasher", label: "Firmware", icon: <Download aria-hidden="true" /> },
  { to: "/support", label: "FAQ", icon: <CircleHelp aria-hidden="true" /> },
  { to: "/contact", label: "Contact", icon: <Mail aria-hidden="true" /> },
];

const navClass = ({ isActive }) => (isActive ? "navItem active" : "navItem");

function Brand({ onClick }) {
  return (
    <Link to="/" className="brandLink" aria-label="TrakSpool home" onClick={onClick}>
      <img className="logoImg" src="/spool-logo.svg" alt="" width="32" height="32" />
      <span className="brandTitle">TrakSpool</span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Escape closes the phone menu
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="headerInner">
        <Brand onClick={closeMenu} />

        <nav className="primaryNav" aria-label="Primary">
          {NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="headerActions">
          {GITHUB.published && (
            <a
              className="btn btn--quiet btn--icon"
              href={GITHUB.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TrakSpool on GitHub"
              title="TrakSpool on GitHub"
            >
              <Github aria-hidden="true" />
            </a>
          )}
          <ThemeToggle />
          <button
            className="btn btn--quiet btn--icon menuButton"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="menuSheet"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="menuScrim" onClick={closeMenu} aria-hidden="true" />
          <nav id="menuSheet" className="menuSheet" aria-label="Menu">
            <NavLink to="/" end className={navClass} onClick={closeMenu}>
              <House aria-hidden="true" />
              Home
            </NavLink>
            {NAV.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} className={navClass} onClick={closeMenu}>
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerBrand">
          <Brand />
          <p className="footerTagline">
            Open-source filament inventory for 3D printing: a spool scale with an NFC tag reader,
            and the web console to run it.
          </p>
        </div>

        <nav className="footerCol" aria-labelledby="footer-project">
          <h2 id="footer-project" className="eyebrow">
            Project
          </h2>
          <ul className="footerLinks">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/build">Build it</Link></li>
            <li><Link to="/files">Source files</Link></li>
            <li><Link to="/resources">Docs</Link></li>
            <li><Link to="/flasher">Firmware updater</Link></li>
          </ul>
        </nav>

        <nav className="footerCol" aria-labelledby="footer-community">
          <h2 id="footer-community" className="eyebrow">
            Community
          </h2>
          <ul className="footerLinks">
            <li>
              {GITHUB.published ? (
                <a href={GITHUB.href} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              ) : (
                <span className="footerPending">
                  GitHub <span className="badge">Soon</span>
                </span>
              )}
            </li>
            <li><Link to="/support">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <nav className="footerCol" aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="eyebrow">
            Legal
          </h2>
          <ul className="footerLinks">
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </nav>

        <div className="footerBottom">
          <span>© {year} TrakSpool</span>
          <span className="num">Firmware v{flasherManifest.version}</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Header />
      <ScrollToTopOnRouteChange />

      <main id="main" className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/build" element={<Build />} />
          <Route path="/files" element={<Files />} />
          <Route path="/store" element={<Navigate to="/build" replace />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<DocViewer />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/flasher" element={<Flasher />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<ToS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />

      {/* Vercel Web Analytics: cookieless page views */}
      <Analytics />
    </>
  );
}
