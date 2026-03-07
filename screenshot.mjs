import puppeteer from "puppeteer";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "http://localhost:5173";
const OUT_DIR = join(__dirname, "screenshots");

mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  { path: "/",                        name: "01-home" },
  { path: "/features",                name: "02-features" },
  { path: "/store",                   name: "03-store" },
  { path: "/resources",               name: "04-resources" },
  { path: "/resources/quick-start",   name: "05-doc-quick-start" },
  { path: "/resources/user-manual",   name: "06-doc-user-manual" },
  { path: "/resources/rfid-tag-guide",name: "07-doc-rfid-tag-guide" },
  { path: "/resources/troubleshooting",name: "08-doc-troubleshooting" },
  { path: "/support",                 name: "09-support" },
  { path: "/contact",                 name: "10-contact" },
  { path: "/privacy",                 name: "11-privacy" },
  { path: "/terms",                   name: "12-terms" },
  { path: "/404-not-found",           name: "13-not-found" },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const { path, name } of PAGES) {
    const url = BASE_URL + path;
    console.log(`Capturing ${url} ...`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
    // Small settle for fonts / animations
    await new Promise(r => setTimeout(r, 400));
    const file = join(OUT_DIR, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`  Saved: ${file}`);
  }

  await browser.close();
  console.log("\nAll screenshots saved to ./screenshots/");
})();
