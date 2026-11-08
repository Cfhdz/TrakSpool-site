// File: src/data/docs.js
// The user guides served from public/docs/ (Markdown + PDF, copied from TrakSpool-docs).
// Resources lists them and DocViewer renders them at /resources/:slug.
import { BookOpen, Nfc, Rocket, Wrench } from "lucide-react";

export const DOCS = {
  "quick-start": {
    title: "Quick Start Guide",
    icon: Rocket,
    description: "Set up a finished TrakSpool, join it to Wi-Fi and tag your first spool.",
    pdf: "quick-start.pdf",
  },
  "user-manual": {
    title: "User Manual",
    icon: BookOpen,
    description: "Every feature, setting and workflow, on the device and in the admin console.",
    pdf: "user-manual.pdf",
  },
  "rfid-tag-guide": {
    title: "RFID Tag Guide",
    icon: Nfc,
    description: "Which tags to buy, where to stick them, and OpenPrintTag compatibility.",
    pdf: "rfid-tag-guide.pdf",
  },
  troubleshooting: {
    title: "Troubleshooting",
    icon: Wrench,
    description: "Fixes for common problems, and calibration guidance.",
    pdf: "troubleshooting.pdf",
  },
};
