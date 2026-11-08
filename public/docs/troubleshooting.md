# TrakSpool Troubleshooting

**Firmware Version:** 2.0.1
**Last Updated:** 2026-11-07

Solutions for common issues. If your problem isn't listed here, check the **User Manual** for detailed feature documentation.

---

## WiFi and Network Issues

### Device won't connect to WiFi

- **Read the reason.** When the device is not connected, the SSID line in the Network menu says why: "Wrong password?", "Network not found", "No reply from AP", "AP refused join", "Signal lost", "No IP address" or "Join failed". "Joining..." means it is still trying.
- **Check your network frequency.** TrakSpool only supports **2.4 GHz** WiFi. 5 GHz networks will not appear in the scan.
- **Verify the password.** Re-enter it via Network > Connect... > Enter Password, then select **Connect!**. The password is case-sensitive; press **Confirm** when you finish typing.
- **Try BLE provisioning.** If manual entry keeps failing, use the ESP BLE Prov app on your phone — it's often easier for entering complex passwords. Note that starting BLE Provision erases the saved network.
- **Check signal strength.** Move the device closer to your router if the signal is weak (below -80 dBm in the scan results).
- **Router compatibility.** Some mesh routers or enterprise networks block mDNS or have client isolation enabled. Try connecting directly via IP address instead.

The device keeps retrying on its own (after 1, 2, 4, 8, 15, 30 and then every 60 seconds), so once the problem is fixed it joins without further action.

### My phone can't find the device in the ESP BLE Prov app

- **Start BLE Provision on the device first** (Network > BLE Provision). The device only advertises while the **Use ESP BLE Prov** screen is shown.
- **Name filter.** The device is called `trakspool-xxxx`. The app lists only names starting with "PROV_" by default; change that filter in the app's settings.
- **No QR code.** The device has no QR code; choose to continue without one and enter the 6-digit PIN shown on the OLED.

### Admin console not loading in browser

- **Confirm WiFi is connected.** Check the OLED Network menu — it should show an SSID and IP address.
- **Try the IP address directly.** If `http://trakspool-XXXX.local` doesn't resolve, use `http://<ip-address>` from the Network menu. mDNS resolution can be unreliable on some networks.
- **Same network required.** Your browser device must be on the same WiFi network as TrakSpool.
- **Web server.** The admin console turns on when a network is saved (with **Connect!**) or BLE setup finishes. Turning WiFi off stops it; turning WiFi on again starts it.

### mDNS hostname not resolving

mDNS (`.local` addresses) can be unreliable depending on your network setup. Common causes:

- Windows may not have mDNS support enabled (install Bonjour Print Services)
- Some routers block mDNS traffic between clients
- Android devices may not resolve `.local` addresses natively

**Workaround:** Use the device's IP address directly. It's shown on the OLED in the Network menu.

### Device goes offline after a while

- **AutoJoin setting.** Make sure AutoJoin is on (Network > AutoJoin: ON). The device then reconnects on boot and after every dropped connection, and keeps trying until it succeeds.
- **After Disconnect.** Using **Disconnect** pauses AutoJoin until you use Connect! or Quick Connect, turn WiFi or AutoJoin on, or restart the device.
- **Router DHCP lease.** Some routers expire DHCP leases and assign new IPs. The mDNS hostname still works, but if you bookmarked the IP, it may have changed.

---

## Scale Issues

### Home screen says "Tare + Calibrate needed"

The scale is not calibrated. Run the calibration wizard:

1. Go to **Scale > Calibration...**
2. **[1/2]** Remove everything from the scale and press the encoder. Wait for "Tared!".
3. **[2/2]** Place a known weight on the scale, enter its weight in grams and press **Confirm**. Wait for "Calibrated!".

Do not put the weight on before step 1: the device tares at that step. See the **Quick Start Guide** for details.

### Scale readings are inaccurate

- **Re-tare.** The zero point may have drifted. Use Scale > Tare Scale with an empty platform.
- **Re-calibrate.** Use an accurate reference weight, such as a calibration weight or an object weighed on a scale you trust.
- **Surface stability.** The device must be on a flat, stable surface. Vibrations, uneven surfaces, and drafts can affect readings.
- **Temperature changes.** The load cell can drift with temperature. If the ambient temperature changed significantly, re-tare.

### Home screen shows "Scale initializing...", "Scale recovering..." or "No scale reading"

- **Just after power-on**, the scale takes a few seconds to start. Wait for the weight to appear.
- **"Scale recovering..."** means the scale sensor stopped answering and the device is restarting it. It usually recovers by itself.
- **"Scale fault" or "No scale reading" that stays** points to the scale sensor or its wiring. Check the connections between the NAU7802 board, the load cell and the main board, then restart the device.

### Weight jumps or shows UNSTABLE

The third line of the home screen says STABLE once the reading has settled. Vibrations, a moving spool or a draft keep it UNSTABLE. Autotag only writes to a tag when the reading has stayed within ±2 g for 2 seconds.

### Tare says "Timeout - try again"

Tare waits up to 15 seconds for a steady reading. Remove everything from the scale, keep it still, and select Tare Scale again.

### Calibration times out (admin console)

The admin console calibration waits up to 15 seconds for the scale to reach stability. If it times out:

- Make sure the reference weight is placed firmly and not moving
- Ensure the surface is stable (no vibrations)
- Try again — sometimes the first attempt needs a few seconds for the reading to settle

### Calibration says "No answer from the device" (admin console)

After the scale settles, the console sends the calibration and waits up to 10 seconds for the device's answer. "No answer from the device" means the device may still apply it: wait a moment and check the reading. If calibration fails, tare the empty scale first (**Tare Scale**) and calibrate again.

---

## NFC / RFID Tag Issues

### Tag not detected

- **Tag type.** TrakSpool needs NXP ICODE SLIX2 tags (ISO 15693 / NFC Type 5, 320 bytes). NTAG, MIFARE, other tag types and smaller ISO 15693 tags will not work. See the **RFID Tag Guide**.
- **Autotag.** On the home screen, spools are detected only while Auto-tag is on (Tags > Auto-tag: ON).
- **Tag placement.** Move the tag closer to the reader antenna.
- **Tag orientation.** The tag should be parallel to the reader surface, not edge-on.
- **Multiple tags.** If multiple NFC tags are in range, the reader may have difficulty. Remove other tags from the vicinity.

### "No tag found!" when tagging on the device

The device writes the moment you confirm the last field of the Tag From Preset or Tag Manual wizard. Place the tag on the reader **before** you confirm, then start the wizard again.

### Tag write failed

- **Keep the tag still.** The tag must stay on the reader for the entire write. Don't move it during the write.
- **Tag memory.** The tag must have 320 bytes of memory (NXP ICODE SLIX2). Smaller tags cannot hold the OpenPrintTag data.
- **Tag is write-protected.** Some manufacturer-tagged spools may have write-protected blocks. TrakSpool cannot override hardware write protection.

### "Device is busy, try again" when writing a tag (admin console)

- **A wizard is open on the device.** While Tag From Preset, Tag Manual, Create Preset or Edit Preset is open on the device screen, the console cannot write. Finish or cancel it on the device, then click **Write Tag** again. Simply having a menu open does not block writing.
- **Another operation is running.** If the device is in the middle of another tag operation, wait a few seconds and try again.

Your entries in the dialog are kept.

### Tag not recognized by Prusa printer

- **Tag format.** TrakSpool writes OpenPrintTag format, which Prusa printers support. Make sure the tag was written by TrakSpool (not just detected).
- **Tag position.** The tag must be readable by the Prusa printer's NFC reader. Placement on the spool hub (center) works best.
- **Firmware version.** Check that your Prusa printer firmware supports OpenPrintTag NFC reading.

---

## Autotag Issues

### A spool on the scale is not recognized

- **Autotag must be on.** Check Tags > Auto-tag on the OLED, or the Autotag button on the Dashboard.
- **Tag detection.** The NFC tag on the spool must be within reader range. Move the spool so the tag is closer to the reader.
- **Tag detection timing.** It takes about 300ms for a tag to be confirmed as present, then a moment to read it ("Reading Tag..."). Wait a moment after placing the spool.

### Consumed weight not updating

Autotag writes to the tag only when all of these hold:

- **The scale is calibrated.** Without calibration autotag writes nothing.
- **The reading is settled:** within ±2 g for 2 seconds.
- **The reading is not below the empty spool weight on the tag.**
- **Minimum change and cooldown.** After the first update when you place a spool, at least 1 g more must be used and at least 60 seconds must have passed since the last write.
- **Tag stays on the reader.** If the tag moves out of range during the update, it fails and is retried after 60 seconds.
- **Complete tag data.** Both nominal weight and empty container weight must be present. If either is missing, you'll see an incomplete tag warning.

A short "Tag Updated" on the home screen confirms each write.

### Unexpected refill detection

A refill is detected when the scale shows more filament than the tag by more than the refill threshold for 3 seconds. This can happen when:

- **Spool repositioned.** If the spool shifts on the scale and the tag briefly loses contact, the next reading may differ enough to trigger refill detection.
- **Different spool.** If you swap spools without removing the first one cleanly, the system may interpret the weight change as a refill.
- **Threshold too low.** Raise the refill threshold (default 400g, maximum 500g) via Tags > Refill Threshold on the OLED, or the Refill Threshold tile on the Dashboard.

Answer **No** to leave the tag as it is; the device does not ask again until the difference goes away or the tag is read again.

If material remaining reads consistently low for a spool after updating the firmware (a tag written by older firmware may carry a corrupted empty-spool weight), re-tag the spool to restore accurate tracking.

### "Update tag?" with "Tag: Xg Now: Yg"

The spool weighs less than the empty spool weight on its tag, usually because the spool is empty and lighter than recorded. Answer **Yes** with the spool sitting still to save the real empty weight, or **No** to leave the tag. See **Empty Weight Correction** in the User Manual.

### "Tag this spool now?" for a spool that is already tagged

The device could not read the tag as OpenPrintTag: it is blank, in another format, or damaged. Answer **No** if you want to keep the tag's current contents; answering Yes overwrites it.

### Incomplete tag warning on OLED

This means the tag is missing required fields (nominal weight or empty container weight). Without these, autotag cannot calculate consumed material.

**Fix:** Re-tag the spool using Tag From Preset or Tag Manual, making sure to fill in the full spool weight and empty spool weight.

---

## Admin Console Issues

### Tag Spool dialog shows "No NFC tag detected" (red indicator)

- **Place the tag on the device reader**, not near your computer. The NFC tag must be on the physical TrakSpool device.
- **Wait for detection.** The status indicator checks every 2 seconds.
- **Tag type.** Only NXP ICODE SLIX2 (NFC Type 5 / ISO 15693) tags are supported.
- **"Cannot reach the device, retrying" or "Waiting for the device".** The dialog pauses autotag before it looks for a tag, and the device has not answered yet. Check that the device is online (Dashboard > Device Status) and wait a few seconds.

### Changes made on OLED don't appear in admin console

- **Refresh the page.** The Spools, Presets and Catalogs pages load their data once. Click **Refresh** on those pages, or reload the browser.
- **Dashboard.** The Live Scale card and the Autotag button update every second. The tiles and lists load once; reload the page to update them.

### Console shows "Device Offline"

- **Check WiFi.** The device may have disconnected. Check the OLED Network menu.
- **Same network.** Both devices must be on the same WiFi network.
- **IP changed.** If using a bookmarked IP, the device may have received a new DHCP address. Try the mDNS hostname or check the OLED for the current IP.

### My spools and presets are gone after a firmware update

A firmware update also replaces the files stored on the device, which hold the spool list, presets, unopened inventory, locations and catalog changes. Restore them from your backup: open the **Spools** page, click **Import** and choose the backup file you exported before the update. See **Updating the Firmware** in the User Manual.

No backup? The data on your spools' tags is not affected: with autotag on, each tagged spool is imported again the next time it sits on the scale. Presets, unopened spools, locations and catalog changes have to be entered again.

### Changes I made in the desktop app disappeared

The desktop app copies data **from** the device every 30 seconds. Changes made while the device was offline are replaced by the device's data at the next copy. Make changes while the device is connected.

---

## General Issues

### Screen is dark

The screen dims after 60 seconds on the home screen and turns off after 120 seconds. Press or turn the encoder to wake it; the first input only wakes the screen.

### Device is frozen / unresponsive

Unplug the USB-C cable, wait a few seconds, and plug it back in. Settings, calibration, presets and spool records are stored in non-volatile memory and survive a power cycle.

### Factory reset

There is no single factory reset button. To clear specific data:

- **WiFi network:** Network > Clear Creds (immediate, no confirmation). Starting BLE Provision also erases it.
- **Scale calibration:** Scale > Clear Cal (immediate, no confirmation)
- **All presets:** Presets > Clear All
- **Individual spool records:** Tags > Manage Tags > Delete Tag

Unopened spools, locations and catalogs are managed in the admin console. A firmware update replaces all stored spools, presets and catalogs (see **Updating the Firmware** in the User Manual).

### Device restarts several times in a row, or won't start

- Unplug it, wait a few seconds and plug it back in.
- If it still does not start properly, reinstall the firmware from [trakspool.com/flasher](https://trakspool.com/flasher). If the device does not appear in the updater's list, double-press the reset button to put the board into bootloader mode (the RGB LED pulses green) and try again. Export a backup first if the admin console still works.

After repeated failed starts the firmware sets a diagnostic "safe mode" flag. It does not limit any features; it is shown only on the serial console (`SafeMode=ON`) for troubleshooting, and a power cycle clears it.
