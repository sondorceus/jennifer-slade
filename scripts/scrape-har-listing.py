#!/usr/bin/env python3
"""Scrape a single HAR.com listing page for photos + specs.

HAR.com 403s curl / WebFetch. Real Chromium via Playwright works.

Run:
  python3 scripts/scrape-har-listing.py <har-url> <slug-prefix>
  # e.g.
  python3 scripts/scrape-har-listing.py \
      "https://www.har.com/homedetail/211-honey-creek-6-ct-austin-tx-78738-us/17242532" \
      honey-creek

Output:
  - public/listings/{prefix}-{n}.jpg     — images (up to 12)
  - public/listings/{prefix}.json        — extracted specs payload
"""
from __future__ import annotations
import json, re, sys, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent.parent
OUT_DIR = ROOT / "public" / "listings"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"


def safe_get(d, *keys, default=""):
    for k in keys:
        if isinstance(d, dict) and k in d:
            return d[k]
    return default


def fetch_image(url: str, dst: Path):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.har.com/"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        dst.write_bytes(data)
        return len(data)
    except Exception as e:
        print(f"   image fetch failed {url}: {e}", flush=True)
        return 0


def main():
    if len(sys.argv) < 3:
        print("usage: scrape-har-listing.py <har-url> <slug-prefix>", flush=True)
        sys.exit(1)
    url = sys.argv[1]
    prefix = sys.argv[2]
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[har] {url}", flush=True)
    print(f"[har] saving as {prefix}-*.jpg", flush=True)

    with sync_playwright() as p:
        # Use channel="chrome" so we present as real Chrome (not headless-marked
        # Chromium). HAR uses PerimeterX which fingerprints headless Chromium.
        try:
            browser = p.chromium.launch(headless=False, channel="chrome")
        except Exception:
            browser = p.chromium.launch(headless=False)
        ctx = browser.new_context(
            user_agent=UA,
            viewport={"width": 1366, "height": 900},
            locale="en-US",
            timezone_id="America/Chicago",
            extra_http_headers={
                "Accept-Language": "en-US,en;q=0.9",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
            },
        )
        # Mask the standard headless-Chromium fingerprints.
        ctx.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'plugins',   { get: () => [1,2,3,4,5] });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'] });
            window.chrome = { runtime: {} };
        """)
        page = ctx.new_page()
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
        except Exception as e:
            print(f"[har] navigation failed: {e}", flush=True)
            sys.exit(2)
        # Let PerimeterX run, lazy images load, gallery render.
        page.wait_for_timeout(5000)
        # Scroll through the page to trigger lazy-loaded photos.
        for y in range(0, 4000, 600):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(400)
        page.wait_for_timeout(2000)

        # Pull JSON-LD blocks (HAR usually has Product / Residence schema)
        ldblocks = page.evaluate("""() => {
            const out = [];
            for (const el of document.querySelectorAll('script[type=\"application/ld+json\"]')) {
                try { out.push(JSON.parse(el.textContent)); } catch (e) {}
            }
            return out;
        }""")

        # Pull every distinct image URL from the page
        images = page.evaluate("""() => {
            const urls = new Set();
            for (const el of document.querySelectorAll('img')) {
                const src = el.currentSrc || el.src || el.getAttribute('data-src');
                if (src) urls.add(src);
            }
            for (const el of document.querySelectorAll('source')) {
                const src = el.srcset || el.src;
                if (src) {
                    for (const part of src.split(',')) {
                        const u = part.trim().split(' ')[0];
                        if (u) urls.add(u);
                    }
                }
            }
            // og:image + twitter:image
            for (const m of document.querySelectorAll('meta')) {
                const prop = (m.getAttribute('property') || m.getAttribute('name') || '').toLowerCase();
                if (prop.includes('image')) {
                    const c = m.getAttribute('content');
                    if (c) urls.add(c);
                }
            }
            return [...urls];
        }""")

        # Pull a few key text fields HAR exposes
        text_data = page.evaluate("""() => ({
            title: document.title,
            ogTitle: document.querySelector('meta[property=\"og:title\"]')?.content || '',
            ogDescription: document.querySelector('meta[property=\"og:description\"]')?.content || '',
            description: document.querySelector('meta[name=\"description\"]')?.content || '',
        })""")

        browser.close()

    # Pick HAR-hosted photo CDN images. HAR uses photos.harstatic.com
    # for property imagery — filter out brand chrome / icons.
    good = []
    seen = set()
    for u in images:
        if not u or not u.startswith("http"):
            continue
        if "photos.harstatic" not in u and "img.har.com" not in u and "harstatic" not in u:
            continue
        # Strip query suffix variations so we de-dup the same photo across sizes.
        base = u.split("?")[0]
        if base in seen:
            continue
        seen.add(base)
        good.append(u)

    print(f"[har] found {len(good)} property images", flush=True)
    saved = []
    for i, img_url in enumerate(good[:12], 1):
        dst = OUT_DIR / f"{prefix}-{i}.jpg"
        nbytes = fetch_image(img_url, dst)
        if nbytes > 0:
            saved.append({"i": i, "url": img_url, "file": str(dst.name), "bytes": nbytes})
            print(f"   [{i}] saved {dst.name} ({nbytes} bytes)", flush=True)

    # Pull specs from JSON-LD if available — HAR usually carries
    # numberOfRooms / floorSize / address / offers.price.
    specs = {}
    for ld in ldblocks:
        if isinstance(ld, list):
            for item in ld: specs.update(item if isinstance(item, dict) else {})
        elif isinstance(ld, dict):
            specs.update(ld)

    payload = {
        "url": url,
        "prefix": prefix,
        "text": text_data,
        "specs_ld": specs,
        "images_saved": saved,
        "raw_image_count": len(images),
        "har_image_count": len(good),
    }
    (OUT_DIR / f"{prefix}.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\n[har] done. specs payload -> public/listings/{prefix}.json", flush=True)


if __name__ == "__main__":
    main()
