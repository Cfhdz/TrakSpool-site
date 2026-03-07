# TrakSpool User Manual

**Firmware Version:** 0.1.1
**Last Updated:** 2025-02-11

Complete reference for all TrakSpool features, settings, and workflows. For first-time setup, see the **Quick Start Guide**.

---

## Table of Contents

1. [Device Overview](#1-device-overview)
2. [Navigation](#2-navigation)
3. [Home Screen](#3-home-screen)
4. [Tags Menu](#4-tags-menu)
5. [Presets Menu](#5-presets-menu)
6. [Network Menu](#6-network-menu)
7. [Scale Menu](#7-scale-menu)
8. [System Menu](#8-system-menu)
9. [Admin Console](#9-admin-console)
10. [Autotag System](#10-autotag-system)

---

## 1. Device Overview

TrakSpool is a filament inventory tracking device built on the Arduino Nano ESP32-S3. It combines:

- **OLED display** (128x64) for menus, status, and weight readouts
- **Rotary encoder** with push button for navigation and input
- **Back button** for returning to previous screens
- **PN5180 NFC reader** for reading and writing ISO 15693 Type 5 RFID tags
- **NAU7802 scale sensor** (24-bit ADC) for precision weight measurement
- **WiFi** (2.4 GHz) for admin console access
- **BLE** for initial WiFi provisioning

---

## 2. Navigation

### Rotary Encoder
- **Rotate** — scroll through menu items or change values in input fields
- **Press** — select the highlighted item, confirm an action, or toggle a setting

### Back Button
- **Press** — return to the previous menu or cancel the current operation

### Screen Types
- **Idle/Home** — default display showing weight and spool info
- **Menu** — scrollable list of items (submenus, actions, toggles, info)
- **Wizard** — multi-field form for creating presets or tagging spools
- **Input Editor** — character-by-character text entry or number input
- **Dialog** — confirmation prompt or information display
- **Picker** — list of options for selecting a catalog item or enum value

Press the encoder from the idle screen to open the main menu. Press Back from the main menu to return to the idle screen.

---

## 3. Home Screen

The idle/home screen displays real-time information:

### With a Tagged Spool on the Scale

```
Prusament                    722.5g
PETG CF #FF0000              72% / 1000g
                    STABLE
```

- **Line 1:** Brand name (left), net remaining weight in grams (right)
- **Line 2:** Material type and name (e.g. "PETG CF") and color hex (left), remaining percentage and nominal weight (right)
- **Line 3:** Stability indicator (STABLE when readings are settled)

Net weight is calculated as: `scale_weight - empty_container_weight`

### Without a Tagged Spool

```
                             245.3g
                              Gross
                    STABLE
```

Shows the gross (raw) scale weight with no material calculations.

### Uncalibrated Scale

Shows raw ADC count values. Calibrate the scale first (see [Scale Menu](#7-scale-menu)).

---

## 4. Tags Menu

**Main Menu > Tags**

Manages NFC tag operations and autotag settings.

### Auto-tag (Toggle)

Enables or disables the autotag system. When on, the device automatically:
- Detects tagged spools placed on the scale
- Monitors weight changes
- Updates consumed weight on the physical NFC tag
- Syncs updates to the local mirror

The setting persists across reboots.

### Tag From Preset

Creates a new NFC tag using data from a saved preset.

1. Select a preset from the list
2. A wizard shows 5 key fields pre-filled from the preset:
   - Material class (required)
   - Primary color
   - Nominal net weight (full spool in grams)
   - Actual net weight (if different from nominal)
   - Empty container weight (empty spool in grams)
3. Edit any fields as needed using the encoder
4. Select **[ Save ]**
5. Place the NFC tag on the reader when prompted
6. Confirm the tag write in the dialog
7. The device writes OPT data to the tag and saves a local mirror

### Tag Manual

Creates an NFC tag by entering all fields manually (up to 15 fields). This is the same wizard as Tag From Preset but without pre-filled values. Includes brand name, material type, material name (optional derivative), temperatures, weights, and color.

### Manage Tags

Submenu for viewing and deleting tag records:

- **View Tags** — lists all stored tags showing "Brand Material NN%" for each. Select a tag to see details: brand, material type, material name (if set), remaining weight, nominal weight, and location (if assigned).
- **Delete Tag** — lists tags for deletion. Select a tag to see a confirmation dialog before removing it from the device inventory. Note: deleting a tag record does not erase the physical NFC tag.

### Refill Threshold

Configures the autotag refill detection sensitivity.

- **Current value** displayed as "Refill: XXg"
- **Set Refill Threshold** — enter a new value (5-500 grams)
- **Apply Threshold** — saves the new value

When the difference between the tag's recorded consumed weight and the scale-calculated consumed weight exceeds this threshold, a refill dialog appears. Default: 50g.

---

## 5. Presets Menu

**Main Menu > Presets**

Manages reusable filament templates. Presets store brand, material type, material name (optional derivative like CF, Matte, Silk), color, temperatures, and weight information that can be quickly applied when tagging new spools.

### Create Preset

Opens the preset creation wizard with all available fields. Fill in the fields you want and select **[ Save ]** to store the preset.

### Edit Preset

Select an existing preset from the list to modify it. The wizard opens with the preset's current values pre-filled. Edit fields and save.

### Delete Preset

Select a preset from the list. A confirmation dialog asks before permanently removing it.

### Clear All

Destructive action that deletes all presets. Shows a warning dialog: "Delete ALL presets? This cannot be undone!" Requires confirmation.

---

## 6. Network Menu

**Main Menu > Network**

Manages WiFi connectivity, BLE provisioning, and HTTP server settings.

### Status Display (Top of Menu)

Three info lines showing current network state:
- **mDNS hostname** — e.g. `trakspool-013c.local`
- **SSID** — connected network name, or "not connected"
- **IP** — device IP address, or blank if not connected

These update automatically when WiFi state changes.

### WiFi (Toggle)

Enables or disables the WiFi radio. Disabling WiFi also stops the HTTP server.

### AutoJoin (Toggle)

When enabled, the device automatically connects to the last known WiFi network on boot. Up to 2 retry attempts before giving up.

### Connect...

Submenu for manual WiFi connection:

1. **Scan Networks** — scans for available 2.4 GHz networks (up to 10 seconds). Displays results with signal strength: "SSID [-XXdB]". Select a network to set it as the target.
2. **Enter SSID** — manually type an SSID using the character picker (for hidden networks)
3. **Apply SSID** — sets the manually entered SSID as the target
4. **Enter Password** — type the WiFi password using the character picker
5. **Connect!** — connects using the selected SSID and entered password. On success, navigates to the home screen.

### Quick Connect

Attempts to connect using previously stored WiFi credentials without going through the Connect submenu. Useful for reconnecting after a disconnection.

### BLE Provision

Starts Bluetooth Low Energy provisioning mode:

1. The device begins advertising as "TrakSpool-XXXX"
2. The OLED shows the service name and a 6-digit PIN
3. Use the **ESP BLE Prov** app on your phone to connect
4. Select your WiFi network and enter the password in the app
5. On success, the device connects to WiFi and shows the connection details

BLE provisioning automatically enables WiFi and AutoJoin on success.

### Disconnect

Disconnects from the current WiFi network.

### Clear Creds

Erases stored WiFi credentials. The device will not auto-connect on next boot until new credentials are provided.

---

## 7. Scale Menu

**Main Menu > Scale**

Calibrates and manages the weight sensor.

### Tare Scale

Sets the current weight reading as zero. Make sure the scale platform is empty (or has only the container you want to zero out) before taring.

### Calibration...

Opens the calibration wizard:

1. Place a known weight on the tared scale
2. Enter the weight value in grams
3. Confirm to apply calibration

The device calculates a grams-per-count ratio and stores the calibration data in non-volatile storage. Calibration persists across reboots.

### Clear Cal

Erases calibration data. The scale reverts to showing raw ADC values. You'll need to tare and recalibrate.

---

## 8. System Menu

**Main Menu > System**

### Firmware Version

Displays the current firmware version (e.g. "FW: 0.1.1"). This is an info-only display.

### Reboot

Restarts the device. Shows "Rebooting..." briefly on the OLED before resetting. All settings and data are preserved.

---

## 9. Admin Console

The admin console is a web-based interface for managing TrakSpool from your browser. It connects to the device's HTTP server over WiFi.

### Accessing the Console

Open a browser and navigate to:
- `http://trakspool-XXXX.local` (mDNS, replace XXXX with your device suffix)
- Or the device's IP address directly (shown in the Network menu)

The console requires the device to be connected to WiFi with the HTTP server enabled.

### Dashboard

The main page showing system overview and live data:

**Stats:** Active spool count, saved preset count, total filament remaining (kg), low stock alerts, refill threshold, and device status (online/offline, firmware version, IP, uptime, calibration state).

**Live Scale:** Real-time weight display updated every second. When a tagged spool is present, shows brand, material type and name, remaining weight with progress bar, and consumption metrics.

**Scale Controls:**
- **Tare** — zero the scale
- **Calibrate** — enter a known weight and calibrate (waits for stability)
- **Autotag ON/OFF** — toggle consumption tracking
- **Tag Spool** — opens a dialog to write a new NFC tag

**Configuration:** Adjustable low stock alert threshold and refill detection threshold (synced to device in real-time).

**Quick Links:** Navigate to Spools, Presets, or Catalogs pages.

### Spools

Filament inventory displayed as a shelf-style grid. Each spool card shows brand, material type and name, and remaining/nominal weight.

**Filtering:** Filter by brand, material type, color, location, or remaining weight range.

**Detail Panel:** Click a spool to see full details:
- Identification (tag UID, instance UUID)
- Filament info (brand, material type, material name, color with hex swatch)
- Weight breakdown (nominal, empty, consumed, remaining with percentage)
- Print settings (temperatures)
- Storage location (editable — select from existing locations or create new ones)

**Actions:**
- **Tag Spool** — write a new NFC tag
- **Delete Tag** — remove the spool record (with confirmation). Does not erase the physical tag.
- **Set Location** — assign a storage location from the catalog

### Tag Spool Dialog

Available from both the Dashboard and Spools pages. Has two tabs:

- **From Preset** — select a saved preset from a searchable dropdown, review the preview, and write. The NFC tag status indicator at the top shows whether a tag is detected on the reader (polls every 2 seconds).
- **Manual Entry** — fill in all fields directly (brand, material type, material name, color, weights, temperatures) without a preset.

Place the NFC tag on the reader before clicking **Write Tag**. Keep the tag on the reader until the write completes (about half a second).

> **Note:** If the device OLED is in a menu or wizard, the write will fail with "Device is busy". Finish or cancel the OLED operation first.

### Presets

Library of filament templates displayed as a shelf grid.

**Filtering:** Filter by brand, material type, or color.

**Detail Panel:** Click a preset to see brand, material type, material name, color, weights, temperatures, and record metadata (filename, schema version, creation date).

**Actions:**
- **Create** — opens a form for a new preset. The display name auto-generates from "Brand + Material Type + Material Name" but can be edited manually.
- **Edit** — opens the selected preset in a form for modification. Use **Save as New** to create a copy with your changes, leaving the original intact.
- **Delete** — removes the preset (with confirmation)

**Auto-populate:** When you select a manufacturer, the empty spool weight fills in automatically from the manufacturers catalog. When you select a material type, all four temperature fields fill in from the temperature profiles catalog. You can always override auto-filled values.

### Catalogs

Manage reference data used across the system. Select a catalog from the dropdown:

**Colors:** Name, hex color code (with RGB inputs and live preview swatch). Used when selecting colors in presets and tags.

**Locations:** Name and optional note. Used for organizing spool storage (e.g. "Dry Box 1", "Shelf A").

**Manufacturers:** Name and empty spool weights (cardboard and plastic variants). Used for quick weight entry when tagging.

**Temperature Profiles:** Material type, min/max print temperature, min/max bed temperature. Used to pre-fill temperature fields in presets.

Each catalog supports add, edit, and delete operations with inline editing directly in the table.

---

## 10. Autotag System

Autotag is the core intelligence of TrakSpool — it automatically monitors spool weight and updates NFC tags with consumption data.

### How It Works

When autotag is enabled and a tagged spool sits on the scale:

1. **Tag Detection:** The device polls for NFC tags every 250ms. A tag is confirmed present after 300ms of stable detection.

2. **Tag Reading:** The OPT payload is read from the tag, extracting brand, material type, material name, nominal weight, actual weight, empty container weight, and current consumed weight.

3. **Weight Monitoring:** The device continuously reads the scale and calculates net material weight: `remaining = scale_weight - empty_container_weight`.

4. **Consumption Tracking:** Consumed weight is calculated as: `consumed = baseline - remaining`, where `baseline` is the actual weight (if set at tagging time) or the nominal weight (if actual is not available). This ensures compatibility with the Prusa App, which calculates remaining material as `actual - consumed`. When consumption increases by at least 1g, the scale is stable, and at least 60 seconds have passed since the last update:
   - The new consumed weight is written to the tag's auxiliary region
   - The write is verified by reading back the tag
   - If verification passes, the local mirror is updated
   - If verification fails, the update is retried

5. **Display:** The OLED shows net material weight (not gross weight) along with brand, material type and name, and remaining percentage.

### Refill Detection

If the scale indicates the spool has *more* material than the tag records (e.g. after a refill), the device detects this when the discrepancy exceeds the refill threshold (default: 50g).

A dialog appears showing:
- Tag consumed weight
- Scale-calculated consumed weight
- Options: update the tag (accept the refill) or ignore

### Tag Removal

When a tag is removed (no detection for 500ms), autotag returns to the scanning state. The last known data remains in the local mirror.

### Auto-Import

When autotag encounters a tagged spool that is not yet in the device's inventory, it automatically imports it. Pre-tagged spools (e.g. tagged on another TrakSpool device, or Prusament spools) are picked up without a manual import step.

### Incomplete Tag Warning

If a tag is missing the nominal weight or empty container weight fields, autotag cannot calculate consumed material. A warning appears on the OLED indicating which fields are missing and advising you to retag the spool with complete data. You'll still see gross weight on the display, but consumed tracking is paused until the tag is updated.

### Autotag and the Mirror

Every tagged spool has a local mirror stored on the device's filesystem. The mirror is the authoritative copy of the spool data:

- **First encounter:** The device reads the physical tag and creates a mirror
- **Steady state:** Consumption updates go to both the mirror and the physical tag
- **The mirror is truth** — if the physical tag disagrees, the mirror wins

### Settings

| Setting | Range | Default | Where to Change |
|---------|-------|---------|-----------------|
| Autotag enabled | On/Off | Off | OLED: Tags > Auto-tag / Console: Dashboard |
| Refill threshold | 5-500g | 50g | OLED: Tags > Refill Threshold / Console: Dashboard |

---

## Appendix: Menu Tree Reference

```
TrakSpool (Main Menu)
├── Tags
│   ├── Auto-tag [Toggle]
│   ├── Tag From Preset
│   ├── Tag Manual
│   ├── Manage Tags
│   │   ├── View Tags
│   │   ├── Delete Tag
│   │   └── Back
│   ├── Refill Threshold
│   │   ├── Refill: XXg [Info]
│   │   ├── Set Refill Threshold
│   │   ├── Apply Threshold
│   │   └── Back
│   └── Back
├── Presets
│   ├── Create Preset
│   ├── Edit Preset
│   ├── Delete Preset
│   ├── Clear All
│   └── Back
├── Network
│   ├── trakspool-XXXX.local [Info]
│   ├── SSID: <network> [Info]
│   ├── IP: <address> [Info]
│   ├── WiFi [Toggle]
│   ├── AutoJoin [Toggle]
│   ├── Connect...
│   │   ├── Scan Networks
│   │   ├── SSID: <selected> [Info]
│   │   ├── Enter SSID
│   │   ├── Apply SSID
│   │   ├── Enter Password
│   │   ├── Connect!
│   │   └── Back
│   ├── Quick Connect
│   ├── BLE Provision
│   ├── Disconnect
│   ├── Clear Creds
│   └── Back
├── Scale
│   ├── Tare Scale
│   ├── Calibration...
│   ├── Clear Cal
│   └── Back
└── System
    ├── FW: 0.1.1 [Info]
    ├── Reboot
    └── Back
```
