// File: src/hooks/usePageMeta.js
// Lightweight per-page meta tag management for React 19
// Sets document title, meta description, and og tags on route change

import { useEffect } from "react";

const BASE_TITLE = "TrakSpool";
const DEFAULT_DESCRIPTION =
  "TrakSpool is an open-source filament inventory system for 3D printing: a spool scale with an NFC tag reader that identifies every spool and tracks what is left. Open firmware, apps, enclosure and PCB files. No cloud, no subscription.";

export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    // Set document title
    document.title = title
      ? `${title} — ${BASE_TITLE}`
      : `${BASE_TITLE} — Open-Source Filament Inventory System`;

    // Set meta description
    const desc = description || DEFAULT_DESCRIPTION;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", desc);

    // Set og:title and og:description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", desc);

    // Set twitter:title and twitter:description
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", document.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", desc);
  }, [title, description]);
}
