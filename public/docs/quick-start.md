# TrakSpool Quick Start Guide

**Firmware Version:** 2.0.1
**Last Updated:** 2026-11-07

Get your TrakSpool up and running in minutes. This guide walks you through first-time setup: powering on, connecting to WiFi, calibrating the scale, creating a filament preset, and tagging your first spool.

It starts from a finished TrakSpool. TrakSpool is an open-source, build-it-yourself project: to make one, follow the **Build it** guide at [trakspool.com/build](https://trakspool.com/build), and install the firmware with the updater at [trakspool.com/flasher](https://trakspool.com/flasher).

---

## 1. What You Need

- A finished TrakSpool with the firmware installed
- NFC tags: NXP ICODE SLIX2 (ISO 15693, NFC Type 5), one per spool. See the **RFID Tag Guide**.
- A USB-C cable and a 5 V USB power supply
- A 2.4 GHz WiFi network (5 GHz is not supported)
- A known calibration weight (any object with a known weight, e.g. a 100g calibration weight)
- A computer or phone on the same WiFi network (for the admin console)

### The Controls

- **Rotary encoder** — turn it to move through menus or change a value; press it to select. In text and number entry, pressing it moves to the next character.
- **Confirm (OK) button** — finishes text and number entry.
- **Back button** — goes back, cancels, or deletes a character in text entry.

When the screen has dimmed or turned off, the first press or turn only wakes it.

---

## 2. Power On

Plug in the USB-C cable. The OLED display shows the TrakSpool boot screen, then the home screen. The scale takes a few seconds to start ("Scale initializing...").

Until the scale is calibrated, the home screen says **Tare + Calibrate needed**. Calibrating is step 5.

---

## 3. Connect to WiFi

You have two options. BLE provisioning is recommended for first-time setup.

### Option A: BLE Provisioning (Recommended)

This uses your phone to send WiFi credentials to the device over Bluetooth.

1. On your phone, install the **ESP BLE Prov** app ([Android](https://play.google.com/store/apps/details?id=com.espressif.provble) / [iOS](https://apps.apple.com/app/esp-ble-provisioning/id1473590141))
2. On the TrakSpool, press the encoder to open the menu and go to **Network > BLE Provision**
3. The OLED shows **Use ESP BLE Prov** with the device name (e.g. `trakspool-013c`) and a 6-digit PIN. The PIN is the same every time for your device.
4. In the ESP BLE Prov app:
   - Tap **Provision New Device**, then choose to continue without a QR code
   - Select **trakspool-XXXX** from the list. If it does not appear, change the device name filter in the app's settings (by default it only lists names starting with "PROV_").
   - Enter the 6-digit PIN shown on the OLED
   - Select your WiFi network and enter the password
5. On success, the OLED shows **WiFi Connected!** with your network name, IP address and `.local` name. If joining fails, the OLED shows the reason for a few seconds and you can try again from the app.

> **Note:** Starting BLE Provision erases the WiFi network saved on the device. If you back out without finishing, set up WiFi again.

### Option B: Manual WiFi (via OLED menu)

1. Go to **Network > Connect...**
2. Select **Scan Networks**. The device lists up to 10 networks with their signal strength (hidden networks are not listed; for those, use **Enter SSID** and **Apply SSID**).
3. Select your network
4. Select **Enter Password** and type your WiFi password: turn the encoder to pick a character, press it to move to the next one, press **Back** to delete, and press **Confirm** when done
5. Select **Connect!**

The device saves the network, shows "Connecting..." and returns to the home screen while it joins. Saving a network also turns on WiFi, AutoJoin and the admin console.

When it is connected, the Network menu shows your `.local` name, the network name (SSID) and the IP address. If it cannot join, the SSID line shows why (for example "Wrong password?" or "Network not found"). The device keeps retrying on its own.

---

## 4. Access the Admin Console

Once connected to WiFi, open a browser on any device on the same network and go to:

```
Admin Console via mDNS hostname:
http://trakspool-XXXX.local
or
Admin Console via IP Address:
http://192.168.x.x
```

Replace `XXXX` with your device's suffix (shown on the Network menu). If `.local` doesn't resolve, use the IP address directly (also shown on the Network menu).

The admin console gives you a dashboard with real-time scale readings, spool management, preset editing, catalogs, backups and Run Out Check — all from your browser.

---

## 5. Calibrate the Scale

The scale needs a one-time calibration before it can weigh. You need a known weight (e.g. a 100 g calibration weight).

### On the Device

1. Go to **Scale > Calibration...**
2. **Step 1 of 2:** the screen says "Remove all weights from the scale". Empty the scale and press the encoder. The device waits for a steady reading, sets zero and shows "Tared!".
3. **Step 2 of 2:** place the known weight on the scale, enter its weight in grams (**Known weight (g)**, 0.1 to 9999.9) and press **Confirm**
4. The device waits for a steady reading ("Waiting for stable to CAL...") and shows "Calibrated!"

The home screen now shows the weight in grams.

**Tare Scale** (in the Scale menu) sets zero again later: select it, remove everything from the scale, and the device tares as soon as the reading is steady.

### In the Admin Console

On the **Dashboard**, use **Tare Scale** with the scale empty, then **Calibrate**: place the known weight, type its weight in grams and click **Apply**.

---

## 6. Create Your First Preset

A preset is a reusable filament template (brand, material type, color, temperatures, weights). You create presets once, then use them to tag multiple spools.

### Via the Admin Console (Easier)

1. Open the admin console in your browser
2. Go to the **Presets** page
3. Click **Create**
4. Fill in the fields:
   - **Brand** (e.g. "Prusament") — choosing a brand fills in its empty spool weight
   - **Material Type** (e.g. PLA, PETG, TPU) — choosing a type fills in its temperatures
   - **Material Name** (optional) — derivative or variant (e.g. CF, Matte, Silk, High-Speed)
   - **Color** — select from your color catalog, or enter HEX, RGB or RGBA
   - **Nominal Full (g)** — filament weight of a full spool (e.g. 1000)
   - **Empty Container (g)** — weight of the empty spool (e.g. 250), cardboard or plastic
   - **Print/Bed Temperatures** (optional but recommended)
   - **Display Name** fills itself in from brand, type and name
5. Click **Create Preset**

### Via the OLED Menu

1. Go to **Presets > Create Preset**
2. The wizard asks for each field in turn: material class, material type, brand, material name, color, full spool weight, then empty spool weight
   - Brand and material name can be picked from a list, or entered with **Other** / **Custom** (the device then offers to save the new entry)
   - Temperatures are filled in from the material's temperature profile
3. Confirm the last field. The device shows "Saved!"

---

## 7. Tag Your First Spool

Now let's write an NFC tag with your filament data.

### On the Device

1. **Place the NFC tag on the reader first.** The device writes as soon as you confirm the last field.
2. Go to **Tags > Tag From Preset** and select the preset you just created
3. The wizard shows four fields filled in from the preset; change any you need:
   - Material class
   - Primary color
   - Full spool weight when new
   - Empty spool weight
4. Before the empty spool weight, if the scale is calibrated, the device asks **New spool?** With a new, full spool on the scale, answer **Yes** and it calculates the empty spool weight for you (scale reading minus full weight).
5. Confirm the last field. The device shows "Writing tag...", then "Tag written!"

If there is no tag on the reader, it shows "No tag found!" and you start again.

The tag now holds your filament data in OpenPrintTag format, and the device keeps a copy in its inventory.

### In the Admin Console

Click **Tag Spool** on the Dashboard or the Spools page, choose the **From Preset** tab, place the tag on the device's reader and click **Write Tag**.

> **Even faster:** put a new spool with a blank tag on the scale. With autotag on, the device asks **Tag this spool now?** and can write it from a preset in one step, working out the empty spool weight from the scale. See **New Spool Detection** in the User Manual.

---

## 8. Verify It Works

1. Stick the NFC tag to your filament spool (near the center hub works best)
2. Place the spool on the TrakSpool scale with the tag facing the reader
3. The OLED home screen shows:

```
Prusament                    722.5g
PETG CF                   Remaining
                    STABLE
```

Line 1 is the brand and the filament remaining (net weight). Line 2 is the material type and name.

---

## 9. Autotag Tracking

Autotag automatically follows the weight of a tagged spool and writes the consumed material to its NFC tag. It is **on** by default; you can switch it under **Tags > Auto-tag** or with the **Autotag** button on the admin console Dashboard.

When a tagged spool is on a calibrated scale:
- Once the reading settles after you place the spool, the device brings the tag up to date if it differs by more than 5 g
- After that, it writes again when at least 1 g more has been used and at least 60 seconds have passed since the last write, with the reading steady
- Each update is read back from the tag before the device's copy is updated
- If the spool suddenly has much *more* material than the tag says (you refilled it), a **Refill Detected** prompt asks whether to update the tag
- If the spool weighs less than the empty weight on its tag, an **Update tag?** prompt offers to correct the empty weight

---

## 10. Before You Update the Firmware

Firmware updates from [trakspool.com/flasher](https://trakspool.com/flasher) replace the data stored on the device: spools, presets, unopened inventory, locations and catalog changes. WiFi settings and calibration are kept.

**Before every update,** open the admin console, go to **Spools** and click **Export**. After the update, click **Import** and choose that file.

---

## What's Next?

- **User Manual** — Complete documentation of all features and settings
- **RFID Tag Guide** — Compatible tags, where to buy them, and placement tips
- **Troubleshooting** — Common issues and solutions
- **Backups** — Export your spools, presets and catalogs from the Spools page (see User Manual §9 and §14)
- **Unopened Inventory** — Track sealed spools before you open and tag them (see User Manual §11)
- **Run Out Check (ROC)** — Verify you have enough filament before printing (see User Manual §12)
- **Desktop Application** — Browse your inventory even when the device is off (see User Manual §13)
