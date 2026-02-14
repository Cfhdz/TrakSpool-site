# TrakSpool RFID Tag Guide

**Firmware Version:** 0.1.0
**Last Updated:** 2025-02-11

This guide covers which NFC tags work with TrakSpool, where to buy them, how to place them on your spools, and how they interoperate with Prusa printers via the OpenPrintTag standard.

---

## Supported Tag Standard

TrakSpool uses **NFC Type 5** tags, also known as **ISO 15693** or **NFC-V** tags. This is the same standard used by Prusa for their filament spools.

**Key specs:**

| Property | Requirement |
|----------|-------------|
| **NFC Standard** | Type 5 (ISO/IEC 15693) |
| **Recommended IC** | NXP ICODE SLIX2 |
| **Minimum Memory** | 312 bytes usable (80 blocks x 4 bytes) |
| **Protocol** | NFC-V (Vicinity, 13.56 MHz) |

The PN5180 reader in TrakSpool communicates with these tags using the ISO 15693 protocol, reading and writing data in 4-byte blocks.

---

## Recommended Tag: NXP ICODE SLIX2

The **NXP ICODE SLIX2** is the tag IC used by the OpenPrintTag specification and by Prusa on their filament spools. It provides:

- 80 blocks of 4 bytes each = **320 bytes** total memory
- ~312 bytes usable after NDEF overhead
- Read range suitable for close-proximity mounting on spool hubs
- Write-lockable blocks (optional, for manufacturers who want to protect data)

This is the only IC family currently verified to work with TrakSpool. Other NFC Type 5 / ISO 15693 tags with similar memory may work, but are untested.

---

## Where to Buy Tags

### Pre-Tagged Filament Spools

Some manufacturers already ship spools with compatible NFC tags:

- **Prusament** spools include ICODE SLIX2 tags in the spool hub. TrakSpool can read, update, and write to these tags.

### Blank Tags

For tagging your own spools, look for blank **NXP ICODE SLIX2** sticker tags (also called labels or inlays). Search for:

- "ICODE SLIX2 NFC sticker"
- "ISO 15693 SLIX2 label"
- "NFC Type 5 SLIX2 tag"

These are available from NFC specialty suppliers. Look for tags in sticker/label form factor so they can be adhered directly to spool hubs.

**What to look for when purchasing:**

- IC must be **NXP ICODE SLIX2** (the IC name, not just "ISO 15693")
- Memory must be at least **320 bytes** (80 blocks)
- Form factor: **round stickers** (25-30mm diameter) work well for spool hubs
- Adhesive-backed for easy application

---

## Tags That Do NOT Work

These common NFC tag types are **not compatible** with TrakSpool:

| Tag Type | Why It Doesn't Work |
|----------|-------------------|
| **NTAG213 / NTAG215 / NTAG216** | NFC Type 2 (ISO 14443), wrong protocol entirely |
| **MIFARE Classic** | ISO 14443-A, proprietary protocol |
| **MIFARE Ultralight** | NFC Type 2, insufficient memory |
| **MIFARE DESFire** | ISO 14443-A, wrong protocol |
| **NFC Type 1 / Type 3 / Type 4** | Wrong NFC type |
| **ISO 15693 tags with < 312 bytes** | Insufficient memory for OpenPrintTag payload |

If you're unsure whether a tag is compatible, check the datasheet for "ISO 15693" and "ICODE SLIX2" (or at minimum, NFC Type 5 with 320+ bytes).

---

## Tag Placement

### On the Spool

Stick the NFC tag on the **center hub** of your filament spool, on the side that faces the TrakSpool reader when the spool sits on the scale.

Tips:
- The tag should be as close to the reader antenna as possible
- Center hub placement works better than outer rim (closer to reader)
- Avoid placing tags directly on top of metal or conductive surfaces
- A single layer of plastic (the spool hub) between tag and reader is fine

### Reader Position

The PN5180 NFC reader on the TrakSpool device has a read range of a few centimeters. The tag needs to be within this range for detection and read/write operations.

For reliable auto-detection:
- The tag should be within ~2-3cm of the reader antenna
- The device detects tag presence automatically every 250ms
- Presence is confirmed after 300ms of stable detection
- Removal is confirmed after 500ms of no detection

---

## What Gets Written to the Tag

TrakSpool writes data in **OpenPrintTag (OPT) format**, wrapped in an **NDEF container**. The data is CBOR-encoded and includes:

**Main region** (written once, at tag creation):
- Brand name
- Material type (PLA, PETG, TPU, etc.)
- Material name — optional derivative or variant (e.g. CF, Matte, Silk, High-Speed)
- Primary color (RGB)
- Nominal net weight (full spool weight in grams)
- Empty container weight (empty spool weight)
- Instance UUID (derived from tag UID)

**Auxiliary region** (updated automatically during use):
- Consumed weight (grams used, updated by autotag)

The main region is written at tagging time and typically doesn't change. The auxiliary region is updated in-place whenever the autotag system detects that material has been consumed.

---

## OpenPrintTag Compatibility

TrakSpool follows the **OpenPrintTag** standard, the same format used by Prusa printers.

### What This Means

- Tags written by TrakSpool can be read by Prusa printers
- Prusa's MK4 and XL printers can read spool data (material type, color, remaining weight) from TrakSpool-written tags
- Tags from Prusament spools can be read and updated by TrakSpool
- The consumed weight updated by TrakSpool is visible to the printer

### NDEF and MIME Type

The OPT payload uses the MIME type `application/vnd.openprinttag` inside an NDEF message on the NFC tag. Any reader that supports NDEF on Type 5 tags can detect the OPT record.

---

## Memory Layout

For reference, here's how the 320 bytes of ICODE SLIX2 memory are used:

```
[ CC bytes (4) ][ NDEF TLV header ][ OPT NDEF record ][ Terminator TLV ]
                                    |
                                    +-- [ Meta section (CBOR) ]
                                        [ Main region (CBOR) ]
                                        [ Aux region (CBOR) ]
                                        [ Padding ]
```

- **CC bytes**: Capability Container (4 bytes, identifies tag as NDEF-formatted)
- **NDEF TLV**: Type-Length-Value wrapper containing the OPT record
- **Meta section**: Defines offsets and sizes of the main and aux regions
- **Main region**: Brand, material type, material name, color, weights (immutable after write)
- **Aux region**: Consumed weight (updated in-place by autotag)
- **Terminator TLV**: Marks the end of NDEF data

The total OPT payload fits comfortably within the 312 usable bytes.

---

## Frequently Asked Questions

**Can I reuse a tag?**
Yes. Navigate to Tags > Tag From Preset (or Tag Manual) and write new data to the tag. The old data will be overwritten.

**Can I use tags from Prusament spools?**
Yes. TrakSpool reads and writes the same OpenPrintTag format. You can update the consumed weight on existing Prusament tags, or overwrite them entirely with new data.

**Will my Prusa printer still read tags after TrakSpool writes to them?**
Yes. TrakSpool preserves the OpenPrintTag format, so Prusa printers can still read the material data.

**How many write cycles do ICODE SLIX2 tags support?**
NXP specifies at least 100,000 write cycles per block. Since autotag only updates the aux region (consumed weight), a single tag can handle extensive use.

**Can I write-protect my tags?**
The ICODE SLIX2 supports per-block write protection. TrakSpool does not currently use this feature, but manufacturers can lock the main region to prevent overwriting brand/material data while leaving the aux region writable for consumption tracking.
