# TrakSpool Quick Start Guide

**Firmware Version:** 0.1.1
**Last Updated:** 2025-02-11

Get your TrakSpool up and running in minutes. This guide walks you through first-time setup: powering on, connecting to WiFi, calibrating the scale, creating a filament preset, and tagging your first spool.

---

## 1. What's in the Box

- TrakSpool device (Arduino Nano ESP32-S3 based)
- NFC RFID tags (NXP ICODE SLIX2, Type 5)
- USB-C cable for power

You will also need:

- A 2.4 GHz WiFi network (5 GHz is not supported)
- A known calibration weight (any object with a known weight, e.g. a 100g calibration weight)
- A computer or phone on the same WiFi network (for the admin console)

---

## 2. Power On

Plug in the USB-C cable. The OLED display will show the TrakSpool boot screen followed by the home/idle screen.

The home screen displays the current scale weight (if calibrated) or a raw ADC reading (if not yet calibrated).

---

## 3. Connect to WiFi

You have two options. BLE provisioning is recommended for first-time setup.

### Option A: BLE Provisioning (Recommended)

This uses your phone to send WiFi credentials to the device over Bluetooth.

1. On your phone, install the **ESP BLE Prov** app ([Android](https://play.google.com/store/apps/details?id=com.espressif.provble) / [iOS](https://apps.apple.com/app/esp-ble-provisioning/id1473590141))
2. On the TrakSpool, navigate to **Network > BLE Provision** using the rotary encoder
3. Press the encoder to confirm
4. The device will display its name (e.g. `trakspool-013c`) and a 6-digit PIN
5. In the ESP BLE Prov app:
   - Tap **Provision New Device**
   - Select **TrakSpool-XXXX** from the list
   - Enter the 6-digit PIN shown on the OLED
   - Select your WiFi network and enter the password
6. The device will connect. On success, the OLED shows your SSID, IP address, and `.local` hostname

> If the device doesn't have enough free RAM for BLE, it will automatically reboot into a BLE-first mode and retry.

### Option B: Manual WiFi (via OLED menu)

1. Navigate to **Network > Connect...**
2. Select **Scan Networks** — the device scans for available networks (up to 10 seconds)
3. Select your network from the list
4. Go to **Enter Password** and type your WiFi password using the rotary encoder character picker
5. Select **Connect!**

After connecting, the Network menu shows your mDNS hostname, SSID, and IP address.

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

The admin console gives you a dashboard with real-time scale readings, spool management, preset editing, and catalog management — all from your browser.

---

## 5. Calibrate the Scale

The scale needs a one-time tare and calibration before it can display weights in grams.

### Tare (Set Zero Point)

1. Make sure the scale platform is empty
2. Navigate to **Scale > Tare Scale** and confirm
3. The display shows "Tared!"

### Calibrate (Set Weight Reference)

1. Place a known weight on the scale (e.g. a 100g calibration weight)
2. Navigate to **Scale > Calibration...**
3. The calibration wizard asks for the known weight value — enter it using the encoder
4. Confirm, and the device calculates the grams-per-count ratio
5. The display now shows weight in grams instead of raw values

You can also tare and calibrate from the admin console Dashboard page.

---

## 6. Create Your First Preset

A preset is a reusable filament template (brand, material type, color, temperatures, weights). You create presets once, then use them to tag multiple spools.

### Via the Admin Console (Easier)

1. Open the admin console in your browser
2. Go to the **Presets** page
3. Click **Create Preset**
4. Fill in the fields:
   - **Brand Name** (e.g. "Prusament")
   - **Material Type** (e.g. PLA, PETG, TPU)
   - **Material Name** (optional) — derivative or variant (e.g. CF, Matte, Silk, High-Speed)
   - **Color** — select from your color catalog or enter custom RGB
   - **Nominal Net Weight** — full spool weight in grams (e.g. 1000)
   - **Empty Container Weight** — weight of the empty spool (e.g. 250)
   - **Print/Bed Temperatures** (optional but recommended)
5. Save

### Via the OLED Menu

1. Navigate to **Presets > Create Preset**
2. The wizard walks through each field using the rotary encoder
3. Select values from catalogs or type numbers/text
4. Select **[ Save ]** when done

---

## 7. Tag Your First Spool

Now let's write an NFC tag with your filament data.

1. Navigate to **Tags > Tag From Preset** on the OLED (or use the admin console)
2. Select the preset you just created
3. A wizard shows 5 key fields pre-filled from the preset. Adjust if needed:
   - Material class
   - Primary color
   - Nominal net weight
   - Actual net weight (if different from nominal)
   - Empty container weight
4. Select **[ Save ]**
5. The device checks for a tag on the reader — **place your NFC tag on the reader now**
6. A confirmation dialog shows the tag UID. Confirm to write.
7. "Tag written!" — the tag now contains your filament data in OpenPrintTag format

The tag data is also saved as a local mirror in the device's inventory.

---

## 8. Verify It Works

1. Stick the NFC tag to your filament spool (near the center hub works best)
2. Place the spool on the TrakSpool scale with the tag facing the reader
3. The OLED home screen should now show:

```
Prusament                    722.5g
PETG CF #FF0000              72% / 1000g
                    STABLE
```

The display shows the brand, material type and name (e.g. "PETG CF"), color hex, net remaining weight, percentage, and stability indicator.

As you use filament, the device automatically tracks consumption and updates the tag when it detects that material has been used (at least 1g consumed, scale stable, 60-second cooldown between updates).

---

## 9. Enable Auto-Tag Tracking

Auto-tag is the system that automatically monitors weight and updates consumed material on your NFC tags.

1. Navigate to **Tags > Auto-tag** and toggle it **On**
2. Or enable it from the admin console Dashboard

When auto-tag is enabled and a tagged spool is on the scale:
- The device continuously monitors the net weight
- When it detects that you've used at least 1g of material, it writes the updated consumed weight to the physical tag
- It verifies the write was successful before updating the local mirror
- If the spool suddenly has *more* material than expected (you refilled it), a refill dialog appears so you can choose to update or ignore

---

## What's Next?

- **User Manual** — Complete documentation of all features and settings
- **RFID Tag Guide** — Compatible tags, where to buy them, and placement tips
- **Troubleshooting** — Common issues and solutions
