// File: src/data/buildGuide.js
// Content of the Build it page (/build): parts, tools and the step-by-step guide. The page renders
// whatever is here and shows a placeholder for anything still empty, so the guide can be filled
// in one step at a time:
//
//   images        [{ src: "/build/01-print-parts.jpg", alt: "What the photo shows", caption: "Optional" }]
//                 Put the files in public/build/ (lowercase names, a-z 0-9 - _ .).
//   photoSlots    How many empty "Photo coming soon" frames to show while `images` is empty.
//   instructions  ["One sub-step per string.", "Shown as a numbered list."]
//   tip           An optional note shown under the instructions.
//   links         [{ to: "/flasher", label: "Open the firmware updater" }] (site pages only)
//
// A `null` value in FACTS shows "To be confirmed".

export const FACTS = [
  { label: "Time", value: null },
  { label: "Difficulty", value: null },
  { label: "Skills", value: null },
];

export const PARTS = [
  { part: "Arduino Nano ESP32", role: "Main board: ESP32-S3, Wi-Fi and Bluetooth LE" },
  { part: "Load cell and NAU7802 24-bit ADC board", role: "The scale" },
  { part: "PN5180 NFC reader", role: "Reads and writes ISO 15693 (Type 5) tags" },
  { part: "128 × 64 OLED display (I²C)", role: "The on-device screen" },
  { part: "Rotary encoder, Confirm and Back buttons", role: "On-device controls" },
  { part: "TrakSpool PCB", role: "Connects the parts (see Files)" },
  { part: "3D-printed enclosure and spool holder", role: "Printed from the CAD files (see Files)" },
  { part: "NFC Type 5 tags, such as ICODE SLIX", role: "One per spool" },
  { part: "USB-C cable and a 5 V USB supply", role: "Power" },
];

export const TOOLS = [
  "A 3D printer, for the enclosure and spool holder",
  "A known reference weight, for calibration",
  "A computer with Chrome or Edge, to install the firmware",
];

export const STEPS = [
  {
    id: "print-parts",
    title: "Print the parts",
    summary: "Print the enclosure and the spool holder from the CAD files.",
    images: [],
    photoSlots: 2,
    instructions: [],
    links: [{ to: "/files", label: "Enclosure CAD files" }],
  },
  {
    id: "assemble-electronics",
    title: "Assemble the electronics",
    summary: "Fit the Arduino Nano ESP32 and the modules to the TrakSpool PCB.",
    images: [],
    photoSlots: 3,
    instructions: [],
    links: [{ to: "/files", label: "PCB files and bill of materials" }],
  },
  {
    id: "install-load-cell",
    title: "Install the load cell",
    summary: "Mount the load cell and connect it to the NAU7802 board.",
    images: [],
    photoSlots: 2,
    instructions: [],
  },
  {
    id: "fit-reader-display",
    title: "Fit the NFC reader, display and controls",
    summary: "Mount the PN5180 NFC reader, the OLED display, the rotary encoder and the buttons.",
    images: [],
    photoSlots: 2,
    instructions: [],
  },
  {
    id: "close-enclosure",
    title: "Close the enclosure",
    summary: "Route the cables, close the case and fit the spool holder.",
    images: [],
    photoSlots: 2,
    instructions: [],
  },
  {
    id: "flash-firmware",
    title: "Flash the firmware",
    summary: "Install the firmware from your browser over USB. No tools to install.",
    images: [],
    photoSlots: 1,
    instructions: [
      "Open the firmware updater in Chrome or Edge on a desktop computer.",
      "Connect TrakSpool to the computer with a USB-C cable.",
      "Click Update Firmware and pick your device from the list.",
      "Wait about 30 seconds without unplugging it. TrakSpool restarts with the new firmware.",
    ],
    tip: "Device not in the list? Double-press the reset button to put the board into bootloader mode, then try again.",
    links: [{ to: "/flasher", label: "Open the firmware updater" }],
  },
  {
    id: "wifi-calibrate",
    title: "Join Wi-Fi and calibrate",
    summary: "Connect TrakSpool to your network, then calibrate the scale with a known weight.",
    images: [],
    photoSlots: 1,
    instructions: [],
    links: [{ to: "/resources/quick-start", label: "Quick Start Guide" }],
  },
  {
    id: "tag-first-spool",
    title: "Tag your first spool",
    summary: "Stick an NFC tag on a spool, put it on TrakSpool and enter its details, or pick a preset.",
    images: [],
    photoSlots: 1,
    instructions: [],
    links: [{ to: "/resources/rfid-tag-guide", label: "RFID Tag Guide" }],
  },
];
