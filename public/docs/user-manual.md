# TrakSpool User Manual

**Firmware Version:** 2.0.1
**Last Updated:** 2026-11-07

Complete reference for all TrakSpool features, settings, and workflows. For first-time setup, see the **Quick Start Guide**. To build a TrakSpool, see the **Build it** guide at [trakspool.com/build](https://trakspool.com/build).

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
11. [Unopened Inventory](#11-unopened-inventory)
12. [Run Out Check (ROC)](#12-run-out-check-roc)
13. [Updating the Firmware](#13-updating-the-firmware)

---

## 1. Device Overview

TrakSpool is an open-source filament inventory device built on the Arduino Nano ESP32 (ESP32-S3). You build it yourself: see the **Build it** guide at [trakspool.com/build](https://trakspool.com/build). It combines:

- **OLED display** (128x64) for menus, status, and weight readouts
- **Rotary encoder** with push button for navigation and input
- **Confirm (OK) button** for finishing text and number entry
- **Back button** for returning to previous screens
- **PN5180 NFC reader** for reading and writing ISO 15693 (NFC Type 5) tags
- **NAU7802 scale sensor** (24-bit ADC) for precision weight measurement
- **WiFi** (2.4 GHz) for admin console access
- **BLE** for WiFi setup from a phone

---

## 2. Navigation

### Rotary Encoder
- **Rotate** — scroll through menu items or change values in input fields
- **Press** — select the highlighted item, confirm an action, or toggle a setting. In text and number entry, pressing moves to the next character.

### Confirm (OK) Button
- **Press** — finish text or number entry and use the value

### Back Button
- **Press** — return to the previous menu or cancel the current operation. In text entry, it deletes a character.

### Screen Types
- **Idle/Home** — default display showing weight and spool info
- **Menu** — scrollable list of items (submenus, actions, toggles, info). Toggles show their state, e.g. "WiFi: ON".
- **Wizard** — a series of fields for creating presets or tagging spools, shown as [1/4], [2/4]…
- **Input Editor** — character-by-character text entry or number input
- **Dialog** — confirmation prompt or information display
- **Picker** — list of options for selecting a catalog item or enum value

Press the encoder from the home screen to open the main menu. Press Back from the main menu to return to the home screen. Each menu ends with a **< Back** item.

### Screen Timeouts

- A menu left alone for 30 seconds returns to the home screen.
- The home screen dims after 60 seconds without use and turns off after 120 seconds. Press or turn the encoder to wake it (that first input only wakes the screen); a weight change of 10 g or more also wakes it.

---

## 3. Home Screen

The home screen displays real-time information:

### With a Tagged Spool on the Scale

```
Prusament                    722.5g
PETG CF                   Remaining
                    STABLE
```

- **Line 1:** Brand name (left), filament remaining in grams (right)
- **Line 2:** Material type and name (e.g. "PETG CF")
- **Line 3:** STABLE when the reading has settled, UNSTABLE while it moves

Filament remaining is the scale reading minus the empty spool weight on the tag.

While a tag is being read the screen shows **Reading Tag...**, and after each autotag update it briefly shows **Tag Updated**.

### Without a Tagged Spool

```
                            245.3 g
                              Gross
                    STABLE
```

Shows the gross scale weight with no material calculations.

### Before Calibration

The screen shows **Tare + Calibrate needed**, with "Push:Menu (Uncalibrated)" at the bottom. Calibrate the scale first (see [Scale Menu](#7-scale-menu)).

### While the Scale Starts

Just after power-on the screen shows **Scale initializing...**. If the scale sensor stops answering it shows **Scale recovering...**, **Scale fault** or **No scale reading**.

---

## 4. Tags Menu

**Main Menu > Tags**

Manages NFC tag operations and autotag settings.

### Auto-tag (Toggle)

Turns the autotag system on or off. It is **on** by default. When on, the device automatically:
- Detects tagged spools placed on the scale
- Monitors weight changes
- Updates consumed weight on the physical NFC tag
- Keeps its own copy of each spool up to date

The setting persists across reboots. See [Autotag System](#10-autotag-system).

### Tag From Preset

Writes a new NFC tag using data from a saved preset.

1. **Place the NFC tag on the reader first.** The device writes as soon as you confirm the last field.
2. Select a preset from the list
3. The wizard shows 4 fields filled in from the preset:
   - Material class (required)
   - Primary color
   - Full spool weight when new (the filament weight)
   - Empty spool weight
4. Change any fields you need. Before the empty spool weight, if the scale is calibrated, the device asks **New spool? Is this a new and full spool?** Answer **Yes** with a new, full spool on the scale to have the empty spool weight calculated (scale reading minus full weight).
5. Confirm the last field. The device shows "Writing tag...", then "Tag written!"

If no tag is on the reader, it shows "No tag found!" and nothing is written; start again. Temperatures and the brand, type and name come from the preset. A blank tag is formatted automatically on the first write.

### Tag Manual

Writes an NFC tag without a preset. The wizard asks for material class, material type, brand, material name, color, full spool weight and empty spool weight, like **Create Preset**. Temperatures are filled in from the material's temperature profile. As with Tag From Preset, place the tag on the reader before confirming the last field.

### Manage Tags

Submenu for viewing and deleting the device's spool records:

- **View Tags** — lists all stored spools as "Brand Material NN%". Select one to see its brand and material type, remaining and full weight, and location (if assigned).
- **Delete Tag** — lists the spools for deletion. Select one to see a confirmation dialog before removing it from the device inventory. Deleting a record does not erase the physical NFC tag; if autotag sees the tag again, the spool is imported again.

### Refill Threshold

Configures the autotag refill detection sensitivity.

- **Refill: XXg** — the current value
- **Set Refill Threshold** — enter a new value (5-500 grams)
- **Apply Threshold** — saves the new value

When the scale shows more filament than the tag by more than this amount, a refill prompt appears (see [Refill Detection](#refill-detection)). Default: 400g.

---

## 5. Presets Menu

**Main Menu > Presets**

Manages reusable filament templates. Presets store brand, material type, material name (a variant like CF, Matte, Silk), color, temperatures, and weight information that can be quickly applied when tagging new spools.

### Create Preset

The wizard asks for each field in turn:

1. Material class
2. Material type
3. Brand — from the list, or **Other** to type a new one (the device then asks **Save brand?** to add it to the list)
4. Material name — Custom, Standard, Plus+, Matte, Tough, Silk, CF (Carbon Fiber), High Speed / Hyper, Pro or Galaxy. **Custom** lets you type a name (the device then asks **Save name?**)
5. Primary color
6. Full spool weight when new (default 1000 g)
7. Empty spool weight — preceded by **New spool?** when the scale is calibrated (see [Tag From Preset](#tag-from-preset))

Temperatures are filled in from the material's temperature profile. Confirm the last field and the device shows "Saved!".

### Edit Preset

Select a preset from the list. On the device you can change its material class, color, full spool weight and empty spool weight. To change the brand, type or name, edit the preset in the admin console.

### Delete Preset

Select a preset from the list. A confirmation dialog asks before permanently removing it.

### Clear All

Destructive action that deletes all presets. Shows a warning dialog: "Delete ALL presets? This cannot be undone!" Requires confirmation.

---

## 6. Network Menu

**Main Menu > Network**

Manages WiFi connectivity, BLE provisioning, and the admin console's web server.

### Status Display (Top of Menu)

Three info lines showing current network state:
- **mDNS hostname** — e.g. `trakspool-013c.local`
- **SSID** — the connected network's name. When not connected it shows the state instead: "WiFi off", "Joining...", "BLE setup", "Not connected", or why the last attempt failed: "Wrong password?", "Network not found", "No reply from AP", "AP refused join", "Signal lost", "Disconnected", "No IP address" or "Join failed".
- **IP** — device IP address, or blank if not connected

These update automatically when WiFi state changes.

### WiFi (Toggle)

Turns the WiFi radio on or off. Turning WiFi off also stops the admin console and ends a BLE setup that is still waiting for the phone.

### AutoJoin (Toggle)

When on, the device joins the saved network on boot and whenever the connection drops. It keeps trying for as long as it is not connected: a dropped connection is retried after half a second, and a failed join is retried after 1, 2, 4, 8, 15, 30 and then every 60 seconds. Turning AutoJoin on starts the retries again straight away. Scanning for networks pauses joining while the scan runs.

### Connect...

Submenu for manual WiFi connection (screen title "WiFi Connect"):

1. **Scan Networks** — scans for 2.4 GHz networks and lists up to 10 as "SSID [-XXdB]". Select a network to set it as the target. Hidden networks are not listed.
2. **SSID: ...** — the selected network
3. **Enter SSID** — type an SSID by hand (for hidden networks)
4. **Apply SSID** — sets the typed SSID as the target
5. **Enter Password** — type the WiFi password (leave it empty for an open network)
6. **Connect!** — saves the network, shows "Connecting..." and returns to the home screen while the device joins in the background. Saving a network also turns on WiFi, AutoJoin and the admin console's web server.

### Quick Connect

Joins the saved network again, without going through the Connect submenu. It says "No network saved", "WiFi is off" or "BLE setup running" when it cannot.

### BLE Provision

Sets up WiFi from your phone over Bluetooth:

1. The OLED shows **Use ESP BLE Prov** with the device name (`trakspool-xxxx`) and a 6-digit PIN. The PIN is derived from the device and is the same every time.
2. In the **ESP BLE Prov** app, choose to continue without a QR code and select **trakspool-xxxx**. (If it does not appear, change the app's device name filter, which by default lists only names starting with "PROV_".)
3. Enter the PIN, then select your WiFi network and enter its password in the app
4. If joining fails, the OLED shows the reason for 3 seconds and the session stays open so you can try again
5. On success the OLED shows **WiFi Connected!** with the network name, IP address and `.local` name, and the admin console is turned on

> **Note:** Starting BLE Provision erases the saved WiFi network and stops the admin console until setup finishes. **Connect!**, **Quick Connect** or turning WiFi off ends a BLE session that is still waiting for the phone.

If the device does not have enough free memory for Bluetooth, it restarts into a Bluetooth-first mode and continues the setup; the PIN stays the same.

### Disconnect

Disconnects from the current WiFi network. AutoJoin stays paused until you use **Connect!** or **Quick Connect**, turn WiFi or AutoJoin on, or restart the device.

### Clear Creds

Erases the saved WiFi network immediately (there is no confirmation; the screen shows "Cleared!"). The device will not join a network until a new one is saved. It also ends a BLE setup session.

### Defaults

| Setting | Default |
|---------|---------|
| WiFi | Off until a network is saved |
| AutoJoin | On |
| Admin console (web server) | Off until a network is saved or BLE setup finishes |

---

## 7. Scale Menu

**Main Menu > Scale**

Calibrates and manages the weight sensor.

### Tare Scale

Sets zero. Select it, then remove everything from the scale ("Remove all items from the scale"): the device tares as soon as the reading is steady and shows "Tared!". Press Back to cancel. If the reading does not settle within 15 seconds it shows "Timeout - try again".

### Calibration...

A two-step wizard (you need a known weight):

1. **[1/2]** "Remove all weights from the scale". Empty the scale and press the encoder. The device waits for a steady reading, tares and shows "Tared!".
2. **[2/2]** Place the known weight on the scale, enter its weight in grams (**Known weight (g)**, 0.1 to 9999.9, default 100.0) and press **Confirm**. The device waits for a steady reading ("Waiting for stable to CAL...") and shows "Calibrated!".

Calibration is stored in non-volatile memory and survives reboots and firmware updates.

### Clear Cal

Erases the calibration immediately (no confirmation; the screen shows "Cal cleared"). The home screen goes back to **Tare + Calibrate needed** and autotag stops writing until you calibrate again.

---

## 8. System Menu

**Main Menu > System**

### Firmware Version

Displays the current firmware version (e.g. "FW: 2.0.1"). This is an info-only display.

### Updated

Displays the release date of the installed firmware (e.g. "Updated 2026-11-07"). This is an info-only display.

### Reboot

Restarts the device. Shows "Rebooting..." briefly on the OLED before resetting. All settings and data are preserved.

---

## 9. Admin Console

The admin console is the web app TrakSpool serves over Wi-Fi. Open it in any browser on the same network as the device.

### Accessing the Console

Open a browser and go to:
- `http://trakspool-XXXX.local` (replace XXXX with your device's suffix, shown in the Network menu)
- Or the device's IP address (also shown in the Network menu)

The console needs the device to be on Wi-Fi with its web server running.

### Layout

- **Computer:** a sidebar on the left with **Dashboard**, **Spools**, **Presets** and **Catalogs**; under **Tools**, **Run Out Check** and **Guide**; at the bottom, **Settings**, **Privacy** and **Terms**.
- **Tablet:** the same sidebar, narrowed to an icon rail.
- **Phone:** a tab bar at the bottom with **Dashboard**, **Spools**, **Presets**, **Catalogs** and **More**. **More** holds Run Out Check, Guide, Settings, the light/dark switch, Privacy and Terms.

The top bar shows the page name and a light/dark switch.

### Settings

**Settings** opens a dialog with:

- **Theme** — Dark or Light
- **Font Family** — System, Humanist, Geometric or Rounded (fonts already on your computer or phone; nothing is downloaded)
- **Font Size** — S, M, L or XL; scales the whole console
- **Reset to Defaults**

Settings are saved in the browser you use, not on the device.

### Dashboard

**Stat tiles:**
- **Active Spools**, **Saved Presets** and **Total Filament** (kg)
- **Low Stock (<50g)** — click it to see the spools with 50 g or less. The 50 g cutoff is fixed.
- **Refill Threshold** — click it to change the refill detection threshold (5–500 g, saved to the device; default 400 g). See [Refill Detection](#refill-detection).

**Live Scale** (updated every second): the weight in grams, or the net weight with a tagged spool on the scale ("Scale: 868.6g − Spool: 250g"), the spool name, a **Material Remaining** bar, and **Consumed (tag)**, **Consumed (calc)**, **Empty Spool** and **Mirror** (Synced or Pending sync). If the device stops answering, the card says its data may be stale.

Buttons:
- **Tare Scale** — sets the current reading as zero (empty the scale first)
- **Calibrate** — place a known weight on the scale, type its weight in grams and click **Apply**. The console waits up to 15 seconds for the reading to settle, then applies the calibration and shows "Calibration applied". If the scale does not settle it shows "Timed out waiting for stability — keep the scale still and try again". **Cancel** before it is applied changes nothing.
- **Autotag ON / Autotag OFF** — turns consumption tracking on or off (see [Autotag System](#10-autotag-system))
- **Tag Spool** — opens the [Tag Spool dialog](#tag-spool-dialog)

**Other cards:**
- **Recent Spools** — the five most recently updated spools, with **View all**
- **Total Inventory** — tagged and unopened spools per material, and the total in kg
- **Device Status** — Online or Offline, firmware version, device IP, scale (Calibrated or Needs Calibration) and uptime. When the device is offline, **Retry Connection** tries again.
- **Quick Actions** — Manage Spools, Manage Presets, Catalogs

### Spools

**Toolbar:** **Tag Spool**, **Refresh**, **List View** / **Image View**, **Filter**, **Export** and **Import** (see [Backups](#backups-export-and-import)).

The page has two sections:

**Unopened Inventory** (top, collapsed until you open it) — sealed spools you have not tagged yet. Open the section to see the boxes and the **Add Unopened** button. See [Unopened Inventory](#11-unopened-inventory).

**Tagged spools** (main section) — a grid of spool cards, or a list in List View. Each spool shows brand, material type and name, color and remaining weight. Spools with less than 50 g left show a **Low** badge and a red bar.

**Filtering:** **Scope** (Tagged Only, All Spools or Unopened Only), brand, material type, color, location, and a remaining-weight range.

**Detail panel:** click a spool to see:
- Identification (tag UID, instance UUID)
- Filament (brand, material type, material name, color with swatch)
- Weights (nominal, empty, consumed, remaining with percentage)
- Print settings (temperatures)
- Storage — click the location to choose one, add a new one (**+ Add "…"**) or clear it

**Delete Tag** removes the spool record from the device (it asks first). It does not erase the physical tag; if autotag later sees the tag again, it imports the spool again.

### Backups (Export and Import)

**Export** (Spools toolbar) downloads a backup file named `trakspool-library-YYYY-MM-DD.json`. It contains:

- Tagged spools and their storage locations
- Unopened spools with their quantities and locations
- The list of locations
- Saved presets
- Custom material types
- Brands and colors you added to the catalogs

If any part cannot be read from the device, nothing is downloaded and the message says which part failed.

**Import** (Spools toolbar) takes a backup file. The **Import Spool Library** dialog shows what the file contains and when it was made. When you confirm:

- Only records missing from the device are added. Records already on the device are kept as they are.
- Spools keep their storage locations.
- If an unopened spool's quantity differs between the device and the backup, a second dialog, **Unopened quantities differ**, lists them and asks: **Keep device quantities** or **Use backup quantities**.
- Importing the same file twice does not create duplicates.

An unopened spool is matched together with its location, so a box you moved after making the backup is added again at its old location.

> **Back up before every firmware update.** Updating replaces the data stored on the device. See [Updating the Firmware](#13-updating-the-firmware).

### Tag Spool Dialog

The **Tag a Spool** dialog opens from **Tag Spool** on the Dashboard or the Spools page. It has three tabs:

- **From Preset** — choose a saved preset, review the values, and write.
- **From Inventory** — choose an unopened spool. After a successful write its quantity goes down by one, and the entry is removed when it reaches zero. The unopened entry needs an empty spool weight.
- **Manual Entry** — enter everything yourself. Brand, material type, material name and color are required.

**Use Scale** fills in the actual filament weight from the scale (the reading minus the empty spool weight).

The status line at the top shows whether a tag is on the reader: "Checking for NFC tag…", "NFC tag detected — ready to write" (with the tag UID) or "No NFC tag detected — place a tag on the reader". It checks every 2 seconds.

Place the tag on the device's reader before clicking **Write Tag**, and keep it there until the write finishes. The dialog cannot be closed while it is writing, and it closes by itself 2 seconds after a successful write.

While the dialog is open, autotag is paused, so it cannot write to the tag at the same time. It resumes when the dialog closes. Your Autotag On/Off setting does not change.

If the device is busy, for example with a tagging wizard open on the device screen, the dialog shows "Device is busy, try again" and keeps what you entered. Finish or cancel the operation on the device, then write again.

> **Note:** Material types you added yourself (in **Catalogs > Temperature Profiles**) cannot be written to a tag yet.

### Presets

Presets are filament templates, shown as a grid.

**Toolbar:** **Create**, **Refresh** and **Filter** (brand, material type, color).

**Detail panel:** click a preset to see its brand, material type, material name, color, weights, temperatures and record information (file name, schema version, created and updated dates), with **Edit** and **Delete** (asks first).

**The preset form** has:
- **Display Name** — fills itself in as "Brand Type Name" until you type in it
- **Brand**, **Material Type** and **Material Name** (optional — a variant such as CF, Matte, Silk or High-Speed)
- **Color** — from your colors catalog, or as HEX, RGB or RGBA
- **Nominal Full (g)** — filament weight of a full spool (default 1000)
- **Empty Container (g)** — weight of the empty spool, with a **Cardboard / Plastic** switch (default 240)
- **Min/Max Print** and **Min/Max Bed** temperatures (°C)

Buttons: **Cancel**, **Create Preset** (or **Save Changes** when editing), and, when editing, **Save as New** to keep the original and save your changes as a new preset.

**Auto-fill:** choosing a brand fills the empty container weight from the manufacturers catalog (cardboard or plastic, as the switch says). Choosing a material type fills all four temperatures from the temperature profiles catalog. You can change any filled value.

### Catalogs

Reference data used across the console. Choose a catalog from the dropdown:

- **Colors** — name, hex code (6 or 8 digits), RGB, alpha and a preview swatch
- **Locations** — name and an optional note (e.g. "Dry Box 1", "Shelf A")
- **Manufacturers** — name and empty spool weights (cardboard and plastic)
- **Temperature Profiles** — material type, min/max print temperature and min/max bed temperature

**+ Add Entry** adds a row. Edit rows in place (✓ to save, ✕ to cancel); deleting asks first. Adding a temperature profile for a material type that does not exist yet creates a custom material type.

Each catalog can hold up to 16 KB of data on the device.

### Guide

A short built-in guide to the console.

---

## 10. Autotag System

Autotag is the core intelligence of TrakSpool — it automatically monitors spool weight and updates NFC tags with consumption data. It is on by default.

### How It Works

When autotag is on and a tagged spool sits on the scale:

1. **Tag Detection:** The device checks for NFC tags every 250ms. A tag counts as present after 300ms of steady detection.

2. **Tag Reading:** The OpenPrintTag data is read from the tag: brand, material type, material name, nominal weight, actual weight, empty container weight, and current consumed weight. The screen shows "Reading Tag...".

3. **Weight Monitoring:** The device reads the scale and calculates the filament remaining: `remaining = scale_weight - empty_container_weight`.

4. **Consumption Tracking:** Consumed weight is `consumed = baseline - remaining`, where `baseline` is the actual weight (if set at tagging time) or the nominal weight. This matches the Prusa App, which calculates remaining material as `actual - consumed`.

   The device writes the consumed weight to the tag only when:
   - the scale is calibrated,
   - the reading has stayed within ±2 g for 2 seconds, and
   - the reading is not below the empty spool weight on the tag.

   The **first** steady reading after you place a spool is written straight away if it differs from the tag by more than 5 g. After that, the device writes when at least 1 g more has been used **and** at least 60 seconds have passed since the last write.

   Each update is read back from the tag. If it matches, the device's copy is updated and the screen shows "Tag Updated" for a second. If it does not, the device tries again after the 60-second wait.

5. **Display:** The home screen shows the filament remaining (not the gross weight) with the brand and material.

Autotag does nothing while the scale is uncalibrated: no writes and no prompts.

### Refill Detection

If the scale shows more filament than the tag records (e.g. after a refill) by more than the refill threshold (default: 400g) for 3 seconds, a **Refill Detected** dialog appears:

- **Tag:** the consumed weight on the tag
- **Scale:** the consumed weight the scale works out
- **Update tag?** — **Yes** writes the scale's value to the tag; **No** (the default) leaves it. After No, the device does not ask again until the difference goes away or the tag is read again.

### Empty Weight Correction

If a tagged spool weighs at least 5 g **less** than the empty spool weight on its tag for 5 seconds (with at least 30 g on the scale and a steady reading), the empty weight on the tag is too high, usually because the spool is empty and lighter than recorded. The device asks:

**Tag: Xg  Now: Yg — Update tag?**

- **Yes** saves the current reading as the spool's empty weight, marks the filament as used up, and shows "Empty weight saved!". If the reading moved more than 5 g since the question appeared, it shows "Empty update failed" instead; try again with the spool still.
- **No** (the default) leaves the tag alone. The device does not ask again until the tag is read again.

### Tag Removal

When a tag is removed (no detection for 500ms), autotag goes back to scanning. The device keeps its copy of the spool's data.

### Auto-Import

When autotag sees a tagged spool that is not yet in the device's inventory, it imports it automatically. Spools tagged on another TrakSpool, Prusament spools, or spools whose records were deleted or lost are picked up without a manual import step.

### New Spool Detection (Blank Tag)

When autotag finds an NFC Type 5 tag it cannot read as OpenPrintTag (a **blank** tag, a tag in another format, or a damaged tag), the device offers to tag the spool on the spot:

1. A dialog asks **"Tag this spool now?"** Declining returns to the home screen.
2. Accepting asks a second question: **"Tag from a saved preset?"**
   - **No** — opens the manual tagging wizard (as in **Tags > Tag Manual**).
   - **Yes** — opens a preset picker. Selecting a preset writes the tag **immediately**, with no wizard steps:
     - All tag fields (brand, material, color, temperatures, weights) come from the preset.
     - The **empty container weight is calculated automatically** as the current gross scale reading minus the preset's nominal filament weight. This works because a brand-new spool on the scale weighs `full filament + empty spool`.
     - Actual filament weight is set to the preset's nominal weight.

For the automatic calculation to produce a correct empty container weight, the **full, unused spool should be sitting on the scale** when you pick the preset.

Answering Yes to "Tag this spool now?" overwrites the tag. If it belongs to something else (for example a tag from another system), decline.

**Fallbacks:**
- If no presets are saved, a "No presets saved" message appears briefly and the manual tagging wizard opens instead.
- If the scale is not calibrated, there is no weight reading, or the preset has no nominal weight, the **Tag From Preset** wizard opens so you can enter or adjust the empty container weight yourself.

### Incomplete Tag Warning

If a tag is missing the nominal weight or empty container weight, autotag cannot calculate consumed material. A warning on the OLED says which fields are missing and advises you to retag the spool with complete data. You'll still see the gross weight, but tracking is paused until the tag is updated.

### Prompts While a Wizard Is Open

While a wizard is open on the device (tagging or a preset), refill and empty-weight prompts are answered No automatically, and the blank-tag and incomplete-tag notices are skipped.

### The Tag and the Device's Copy

The device keeps a copy (mirror) of every tagged spool in its inventory:

- **First encounter:** the device reads the physical tag and creates the copy
- **Updates:** the device writes the tag first, then its copy
- **The tag is the source of truth:** autotag takes its values from the physical tag, and a lost copy is rebuilt from the tag

### Settings

| Setting | Range | Default | Where to Change |
|---------|-------|---------|-----------------|
| Autotag enabled | On/Off | On | OLED: Tags > Auto-tag / Console: Dashboard |
| Refill threshold | 5-500g | 400g | OLED: Tags > Refill Threshold / Console: Dashboard |

The admin console's Tag Spool dialog pauses autotag while it is open (see [Tag Spool Dialog](#tag-spool-dialog)). Switching Auto-tag on the device ends that pause.

---

## 11. Unopened Inventory

Unopened inventory tracks filament spools that are still sealed in their packaging, before you open and tag them.

### Why Track Unopened Spools?

A tag only makes sense once a spool is open and in use, but knowing what is on your shelf matters too. Unopened inventory gives you one view of all your filament, open and sealed. It also feeds [Run Out Check](#12-run-out-check-roc), which can suggest an unopened spool when no open spool has enough.

### Adding an Unopened Spool

1. Go to the **Spools** page in the admin console
2. Open the **Unopened Inventory** section and click **Add Unopened**
3. Fill in the **Add Unopened Spool** form:
   - **Brand** (required) — choose from your manufacturers catalog, or type a new brand (you can save it to the catalog)
   - **Material Type** (required) — e.g. PLA, PETG, ABS, TPU
   - **Material Name** (optional) — a variant such as CF, Matte, Silk or High-Speed
   - **Color** — from your colors catalog
   - **Nominal Full Weight (g)** — the filament weight. Fill it in: a blank weight is saved as 0 g, and Run Out Check then never suggests that box.
   - **Empty Spool Weight (g)** — with a **Cardboard / Plastic** switch
   - **Print** and **Bed** temperatures — minimum and maximum, in °C
   - **How many identical spools?** — 1 to 999 (e.g. 3 for a 3-pack)
   - **Location** (optional) — where the spools are stored
4. Click **Add to Inventory**

The name is made automatically from brand, material type and material name. The box preview at the top of the form takes the color you choose.

### Viewing and Managing Unopened Spools

Unopened spools appear as colored boxes in the **Unopened Inventory** section. Each box shows the brand, material type and name, color name, nominal weight and, if there is more than one, a quantity badge (e.g. "x3").

Click a box to open its detail panel. There you can:

- **Change the quantity** — click it to edit (minimum 1)
- **Change the location**
- **Remove from Inventory** — asks you to confirm with **Yes, Remove**

### From Unopened to Tagged

When you open a sealed spool, tag it from the **From Inventory** tab of the [Tag Spool dialog](#tag-spool-dialog). After a successful write the unopened quantity goes down by one, and the entry is removed when it reaches zero.

Tagging from a preset, by manual entry or on the device does not change the unopened count; reduce the quantity yourself.

---

## 12. Run Out Check (ROC)

Run Out Check tells you whether you have enough filament before you start a print. Load your sliced print file and ROC works out how much of each filament it needs, then searches your whole inventory, open and unopened spools, for spools that have enough.

ROC is in the admin console under **Tools > Run Out Check** (on phones, under **More**).

### What Problem Does It Solve?

Running out of filament mid-print wastes time, material and electricity. ROC checks your inventory against the slicer's numbers before you print, and suggests nearly-empty spools first to cut waste.

### Workflow

#### Step 1: Configure

- **Buffer** — a safety margin added to the amount each filament needs:
  - **5g Default** — recommended for most prints
  - **1g Feeling Lucky** — the smallest margin, for when material is scarce
  - **Custom** — any number of grams
- **Priority Locations** — optionally choose storage locations (e.g. "AMS1", "Dry Box 2") whose spools are suggested first. Leave empty to treat all locations the same.

#### Step 2: Upload

Drag and drop (or click to browse) a sliced `.3mf` file from **BambuStudio** or **OrcaSlicer** (a `.gcode.3mf` that contains the slicing data). Only the first plate in the file is read.

ROC shows a table of what the print needs: material type, color and grams for each filament slot, plus the plate total, print time and number of objects. Check it, then click **Check Inventory**.

#### Step 3: Results

Each filament gets a card:

- **Match Found** (green) — a spool has enough, with more than 10 g to spare after the buffer
- **Tight Fit** (yellow) — a spool has enough, with 10 g or less to spare after the buffer
- **No Match** (red) — no spool of that material type in that exact color has enough

A card shows the suggested spool: spool or box icon (open or unopened), brand and material, color name, remaining weight, what is left after the print and buffer, and storage location.

- **Alternates** — other spools of the same type and color that also have enough
- **Swap color…** — choose a different color of the same material type from your inventory. A No Match card also lists the colors of that material you do have under **Available in other colors**.

Click **View Summary** when you are done.

#### Step 4: Summary

- **Ready to Print**, or how many filament slots are still unmatched (**Not Ready**)
- The file, the total filament and the print time
- The spool for each filament, grouped by storage location so you can collect them in one trip

**Back to Results** returns to the cards; **Start Over** begins again with a new file.

### How Matching Works

ROC searches tagged (open) spools and unopened inventory:

1. **Material type** must match (upper or lower case does not matter).
2. **Remaining weight** must be at least the amount needed plus the buffer. For a tagged spool, remaining is its full weight (the actual weight if one was set when tagging, otherwise the nominal weight) minus what has been consumed. For an unopened spool it is the nominal full weight.
3. **Color** must be the exact same hex color. Color names are shown for reading only and are not used for matching.
4. **Order:** spools in priority locations first, then the spool that would have the least left over, so nearly-empty spools get used up.

### ROC and Unopened Spools

Unopened spools appear with a box icon and an "Unopened" label, with the quantity if there is more than one (e.g. "Unopened ×3"). ROC only reads your inventory; it never changes it.

---

## 13. Updating the Firmware

Install new firmware from your browser at [trakspool.com/flasher](https://trakspool.com/flasher), using Chrome or Edge on a desktop computer and a USB-C cable. The page shows the latest version and its release notes.

### What an Update Replaces

An update installs the firmware **and** the device's file system, which holds the admin console and your data. These are **replaced**:

- The list of tagged spools and their locations
- Presets
- Unopened inventory
- Locations, and changes you made to the catalogs (brands, colors, manufacturers, temperature profiles)

These are **kept**:

- WiFi network and settings
- Scale calibration
- The Auto-tag setting and the refill threshold
- The data on your spools' NFC tags

### Steps

1. **Back up.** In the admin console, open **Spools** and click **Export**. Keep the downloaded `trakspool-library-YYYY-MM-DD.json` file.
2. Plug TrakSpool into the computer and open [trakspool.com/flasher](https://trakspool.com/flasher)
3. Click **Update Firmware**, pick the device from the list, and wait about 30 seconds without unplugging it. The device restarts with the new firmware.
4. **Restore.** Reload the admin console (it was updated too), open **Spools**, click **Import** and choose your backup file. See [Backups](#backups-export-and-import).

If you have no backup, tagged spools come back on their own: with autotag on, each one is imported again the next time it sits on the scale. Presets, unopened spools, locations and catalog changes have to be entered again.

If the device does not show up in the updater's list, double-press its reset button to put the board into bootloader mode (the RGB LED pulses green) and try again.

### Building From Source

The firmware is open source and built with PlatformIO. You can build it and upload it yourself instead of using the updater; see the firmware's source files on the **Files** page at [trakspool.com/files](https://trakspool.com/files).

---

## Appendix: Menu Tree Reference

```
TrakSpool (Main Menu)
├── Tags
│   ├── Auto-tag: ON|OFF
│   ├── Tag From Preset
│   ├── Tag Manual
│   ├── Manage Tags
│   │   ├── View Tags
│   │   ├── Delete Tag
│   │   └── < Back
│   ├── Refill Threshold
│   │   ├── Refill: XXg [Info]
│   │   ├── Set Refill Threshold
│   │   ├── Apply Threshold
│   │   └── < Back
│   └── < Back
├── Presets
│   ├── Create Preset
│   ├── Edit Preset
│   ├── Delete Preset
│   ├── Clear All
│   └── < Back
├── Network
│   ├── trakspool-XXXX.local [Info]
│   ├── SSID: <network or status> [Info]
│   ├── IP: <address> [Info]
│   ├── WiFi: ON|OFF
│   ├── AutoJoin: ON|OFF
│   ├── Connect...
│   │   ├── Scan Networks
│   │   ├── SSID: <selected> [Info]
│   │   ├── Enter SSID
│   │   ├── Apply SSID
│   │   ├── Enter Password
│   │   ├── Connect!
│   │   └── < Back
│   ├── Quick Connect
│   ├── BLE Provision
│   ├── Disconnect
│   ├── Clear Creds
│   └── < Back
├── Scale
│   ├── Tare Scale
│   ├── Calibration...
│   ├── Clear Cal
│   └── < Back
└── System
    ├── FW: 2.0.1 [Info]
    ├── Updated 2026-11-07 [Info]
    ├── Reboot
    └── < Back
```

Press Back on the main menu to return to the home screen.
