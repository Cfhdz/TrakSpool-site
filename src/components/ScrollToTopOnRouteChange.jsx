// File: src/components/ScrollToTopOnRouteChange.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// A new page starts at the top, unless the URL names a section (/build#flash-firmware):
// then that section is shown, so a step of the Build it guide can be linked directly.
export default function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
