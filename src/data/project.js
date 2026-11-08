// File: src/data/project.js
// Where TrakSpool's open-source files live. Every link the site shows to source code, CAD, PCB
// or documentation files comes from this file, so publishing something is an edit here and
// nowhere else:
//
//   1. Make the repository (or folder, or release) public.
//   2. Set its `href` below if it is empty, and set `published: true`.
//
// An entry with `published: false` renders as a dashed placeholder card with "Coming soon" and
// no link, because a private GitHub repository answers 404 to visitors. `href: null` means the
// location is not decided yet; the card then says "Location to be announced".

// The GitHub account that will host the public repositories (header icon, footer, Contact).
export const GITHUB = {
  href: "https://github.com/Cfhdz",
  published: false,
};

// Shown on the Build page and in the FAQ. Fill in when the licenses are chosen; each
// repository carries its own LICENSE file, so hardware and software may differ.
export const LICENSE = {
  summary: null, // e.g. "Software under MIT, hardware under CERN-OHL-S"
  href: null,
};

export const SOURCE_GROUPS = [
  { id: "hardware", title: "Hardware" },
  { id: "software", title: "Software" },
  { id: "docs", title: "Documentation" },
];

export const SOURCES = [
  {
    id: "cad",
    group: "hardware",
    icon: "cad",
    title: "Enclosure CAD",
    description: "The printed housing and spool holder: the source model and print-ready parts.",
    formats: ["STEP", "STL", "3MF"],
    href: null,
    published: false,
  },
  {
    id: "pcb",
    group: "hardware",
    icon: "pcb",
    title: "PCB",
    description: "Schematic, board layout and fabrication files for the TrakSpool board.",
    formats: ["KiCad", "Gerber", "PDF"],
    href: null,
    published: false,
  },
  {
    id: "bom",
    group: "hardware",
    icon: "bom",
    title: "Bill of materials",
    description: "Every part with quantity, value and supplier part numbers.",
    formats: ["CSV"],
    href: null,
    published: false,
  },
  {
    id: "firmware",
    group: "software",
    icon: "firmware",
    title: "Firmware",
    description:
      "ESP32-S3 firmware: scale, NFC tags, OLED menus, Wi-Fi and the web server that hosts the admin console.",
    formats: ["C++", "PlatformIO"],
    href: "https://github.com/Cfhdz/TrakSpool-firmware",
    published: false,
  },
  {
    id: "console",
    group: "software",
    icon: "console",
    title: "Admin console",
    description:
      "The web app the device serves on your network: inventory, presets, tagging and Run Out Check.",
    formats: ["React", "Vite"],
    href: "https://github.com/Cfhdz/TrakSpool-admin-console",
    published: false,
  },
  {
    id: "desktop",
    group: "software",
    icon: "desktop",
    title: "Desktop app",
    description: "Wraps the admin console in a desktop window and keeps an offline copy of your inventory.",
    formats: ["Electron", "SQLite"],
    href: "https://github.com/Cfhdz/TrakSpool-desktop",
    published: false,
  },
  {
    id: "docs",
    group: "docs",
    icon: "docs",
    title: "Documentation",
    description: "User manual, quick start, tag guide and troubleshooting, as Markdown and PDF.",
    formats: ["Markdown", "PDF"],
    href: "https://github.com/Cfhdz/TrakSpool-docs",
    published: false,
  },
];
