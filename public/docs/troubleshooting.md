# TrakSpool Troubleshooting

**Firmware Version:** 0.1.0
**Last Updated:** 2025-02-11

Solutions for common issues. If your problem isn't listed here, check the **User Manual** for detailed feature documentation.

---

## WiFi and Network Issues

### Device won't connect to WiFi

- **Check your network frequency.** TrakSpool only supports **2.4 GHz** WiFi. 5 GHz networks will not appear in the scan.
- **Verify the password.** Re-enter it via Network > Connect > Enter Password. The character picker is case-sensitive.
- **Try BLE provisioning.** If manual entry keeps failing, use the ESP BLE Prov app on your phone — it's often more reliable for entering complex passwords.
- **Check signal strength.** Move the device closer to your router if the signal is weak (below -80 dBm in the scan results).
- **Router compatibility.** Some mesh routers or enterprise networks block mDNS or have client isolation enabled. Try connecting directly via IP address instead.

### Admin console not loading in browser

- **Confirm WiFi is connected.** Check the OLED Network menu — it should show an SSID and IP address.
- **Try the IP address directly.** If `http://trakspool-XXXX.local` doesn't resolve, use `http://<ip-address>` from the Network menu. mDNS resolution can be unreliable on some networks.
- **Same network required.** Your browser device must be on the same WiFi network as TrakSpool.
- **Check HTTP server.** WiFi must be enabled for the HTTP server to run. If you disabled WiFi and re-enabled it, the HTTP server restarts automatically.

### mDNS hostname not resolving

mDNS (`.local` addresses) can be unreliable depending on your network setup. Common causes:

- Windows may not have mDNS support enabled (install Bonjour Print Services)
- Some routers block mDNS traffic between clients
- Android devices may not resolve `.local` addresses natively

**Workaround:** Use the device's IP address directly. It's shown on the OLED in the Network menu.

### Device goes offline after a while

- **AutoJoin setting.** Make sure AutoJoin is enabled (Network > AutoJoin toggle). This makes the device reconnect automatically on boot and after disconnections.
- **Router DHCP lease.** Some routers expire DHCP leases and assign new IPs. The mDNS hostname still works, but if you bookmarked the IP, it may have changed.

---

## Scale Issues

### Scale shows raw numbers instead of grams

The scale is not calibrated. Follow these steps:

1. Navigate to **Scale > Tare Scale** with nothing on the platform
2. Navigate to **Scale > Calibration** and place a known weight on the scale
3. Enter the known weight value and confirm

See the **Quick Start Guide** for detailed instructions.

### Scale readings are inaccurate

- **Re-tare.** The zero point may have drifted. Tare with an empty platform.
- **Re-calibrate.** Use an accurate reference weight. Kitchen scales or dedicated calibration weights work well.
- **Surface stability.** The device must be on a flat, stable surface. Vibrations, uneven surfaces, and drafts can affect readings.
- **Temperature changes.** The load cell can drift with temperature. If the ambient temperature changed significantly, re-tare.

### Weight display doesn't update or shows "---"

- **Scale sensor initialization.** Wait 5 seconds after boot for the NAU7802 ADC to initialize.
- **Check calibration status.** The Dashboard device status card shows whether the scale is calibrated.
- **Stability indicator.** The weight display uses a lock to prevent jitter. If you placed something on the scale, wait a moment for readings to settle. A large weight change will unlock the display immediately.

### Calibration times out (admin console)

The admin console calibration waits up to 15 seconds for the scale to reach stability. If it times out:

- Make sure the reference weight is placed firmly and not moving
- Ensure the surface is stable (no vibrations)
- Try again — sometimes the first attempt needs a few seconds for the reading to settle

---

## NFC / RFID Tag Issues

### Tag not detected

- **Tag type.** TrakSpool only supports ISO 15693 / NFC Type 5 tags. NTAG, MIFARE, and other tag types will not be detected. See the **RFID Tag Guide** for compatible tags.
- **Tag placement.** Move the tag closer to the reader antenna. The read range is about 2-3 cm.
- **Tag orientation.** The tag should be parallel to the reader surface, not edge-on.
- **Multiple tags.** If multiple NFC tags are in range, the reader may have difficulty. Remove other tags from the vicinity.

### Tag write failed

- **Keep the tag still.** The tag must stay on the reader for the entire write operation (about 0.5 seconds). Don't move it during the write.
- **Tag memory.** The tag must have at least 312 bytes of usable memory (320 bytes total). Smaller tags cannot hold the OpenPrintTag payload.
- **Tag is write-protected.** Some manufacturer-tagged spools may have write-protected blocks. TrakSpool cannot override hardware write protection.
- **Device busy.** If you're using the admin console to write a tag while the OLED is in a menu or wizard, the write will fail. Finish or cancel the OLED operation first.

### Tag not recognized by Prusa printer

- **Tag format.** TrakSpool writes OpenPrintTag format, which Prusa printers support. Make sure the tag was written by TrakSpool (not just detected).
- **Tag position.** The tag must be readable by the Prusa printer's NFC reader. Placement on the spool hub (center) works best.
- **Firmware version.** Check that your Prusa printer firmware supports OpenPrintTag NFC reading.

---

## Autotag Issues

### "No spool on scale" even though a spool is present

- **Autotag must be enabled.** Check Tags > Auto-tag on the OLED, or the Autotag toggle on the Dashboard.
- **Tag detection.** The NFC tag on the spool must be within reader range. Move the spool so the tag is closer to the reader.
- **Tag detection timing.** It takes about 300ms for a tag to be confirmed as present. Wait a moment after placing the spool.

### Consumed weight not updating

Autotag requires several conditions before writing to the tag:

- **Minimum change.** At least 1g of material must be consumed.
- **Scale stability.** The scale must show stable readings (STABLE indicator).
- **Cooldown period.** At least 60 seconds must pass between tag updates.
- **Tag must remain on reader.** If the tag moves out of range during the update, it will fail and retry next cycle.
- **Complete tag data.** Both nominal weight and empty container weight must be present. If either is missing, you'll see an incomplete tag warning.

### Unexpected refill detection

A refill is detected when the scale shows significantly more material than the tag's consumed weight indicates. This can happen when:

- **Spool repositioned.** If the spool shifts on the scale and the tag briefly loses contact, the next reading may differ enough to trigger refill detection.
- **Different spool.** If you swap spools without removing the first one cleanly, the system may interpret the weight change as a refill.
- **Threshold too low.** Increase the refill threshold (default 50g) if you're getting false positives. Change it via Tags > Refill Threshold on the OLED, or via the Dashboard.

### Incomplete tag warning on OLED

This means the tag is missing required fields (nominal weight or empty container weight). Without these, autotag cannot calculate consumed material.

**Fix:** Re-tag the spool using Tag From Preset or Tag Manual, making sure to fill in the nominal weight and empty container weight fields.

---

## Admin Console Issues

### Tag Spool dialog shows "No NFC tag detected" (red indicator)

- **Place the tag on the device reader**, not near your computer. The NFC tag must be on the physical TrakSpool device.
- **Wait for detection.** The status indicator polls every 2 seconds.
- **Tag type.** Only NFC Type 5 / ISO 15693 tags are supported.

### Changes made on OLED don't appear in admin console

- **Refresh the page.** The admin console caches data on load. Click the Refresh button on any page, or reload the browser.
- **Real-time updates.** Only the Dashboard polls live data (every second). Other pages load data once and require manual refresh.

### Console shows "Device Offline"

- **Check WiFi.** The device may have disconnected. Check the OLED Network menu.
- **Same network.** Both devices must be on the same WiFi network.
- **IP changed.** If using a bookmarked IP, the device may have received a new DHCP address. Try the mDNS hostname or check the OLED for the current IP.

---

## General Issues

### Device is frozen / unresponsive

Unplug the USB-C cable, wait a few seconds, and plug it back in. All settings, presets, tags, and calibration data are stored in non-volatile storage and will survive a power cycle.

### Factory reset

There is no single factory reset button. To clear specific data:

- **WiFi credentials:** Network > Clear Creds
- **Scale calibration:** Scale > Clear Cal
- **All presets:** Presets > Clear All
- **Individual tags:** Tags > Manage Tags > Delete Tag

### Device boots into safe mode

If the firmware detects a critical error during boot, it may enter safe mode with limited functionality. This is a diagnostic state. Try power cycling the device. If it persists, the firmware may need to be reflashed.
