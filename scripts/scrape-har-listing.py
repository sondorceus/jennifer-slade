#!/usr/bin/env python3
"""Scrape a single HAR.com listing page for photos + specs.

HAR.com runs PerimeterX bot detection. To get past it without a paid
residential proxy, we use:
  - Real Chrome (channel="chrome"), not headless Chromium
  - Persistent profile so cookies accumulate across runs
  - --disable-blink-features=AutomationControlled launch arg
  - Hand-crafted init script that masks navigator.webdriver, plugins,
    languages, and the chrome.runtime object
  - A "warm-up" navigation through google.com first so the profile
    has realistic browsing context before hitting HAR
  - Mouse jitter + scroll between page loads

Run:
  python3 scripts/scrape-har-listing.py <har-url> <slug-prefix>
  # e.g.
  python3 scripts/scrape-har-listing.py \
      "https://www.har.com/homedetail/211-honey-creek-6-ct-austin-tx-78738-us/17242532" \
      honey-creek
"""
from __future__ import annotations
import json, re, sys, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent.parent
OUT_DIR = ROOT / "public" / "listings"
PROFILE_DIR = ROOT / ".cache" / "playwright-profile"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

LAUNCH_ARGS = [
    "--disable-blink-features=AutomationControlled",
    "--no-default-browser-check",
    "--no-first-run",
    "--disable-dev-shm-usage",
    "--start-maximized",
]

INIT_SCRIPT = """
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'plugins',   { get: () => [
        { 0: { type: "application/x-google-chrome-pdf" }, description: "Chrome PDF Plugin", filename: "internal-pdf-viewer", length: 1, name: "Chrome PDF Plugin" },
        { 0: { type: "application/pdf" }, description: "Chrome PDF Viewer", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai", length: 1, name: "Chrome PDF Viewer" },
        { 0: { type: "application/x-nacl" }, description: "Native Client", filename: "internal-nacl-plugin", length: 1, name: "Native Client" }
    ]});
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'] });
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
    Object.defineProperty(navigator, 'deviceMemory',        { get: () => 8 });
    window.chrome = { runtime: {}, app: { isInstalled: false }, csi: () => {}, loadTimes: () => {} };
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (p) =>
        p.name === 'notifications'
            ? Promise.resolve({ state: Notification.permission })
            : originalQuery(p);
"""


def fetch_image(url: str, dst: Path):
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": UA,
            "Referer": "https://www.har.com/",
            "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8",
        })
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read()
    except Exception as e:
        print(f"   fetch err {e}", flush=True)
        return None


def main():
    if len(sys.argv) < 3:
        print("usage: scrape-har-listing.py <har-url> <slug-prefix>", flush=True)
        sys.exit(1)
    url = sys.argv[1]
    prefix = sys.argv[2]
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[har] {url}", flush=True)
    print(f"[har] profile dir: {PROFILE_DIR}", flush=True)

    with sync_playwright() as p:
        # Persistent context — cookies/history carry across runs.
        try:
            ctx = p.chromium.launch_persistent_context(
                user_data_dir=str(PROFILE_DIR),
                channel="chrome",
                headless=False,
                args=LAUNCH_ARGS,
                viewport={"width": 1366, "height": 900},
                locale="en-US",
                timezone_id="America/Chicago",
                user_agent=UA,
                ignore_default_args=["--enable-automation"],
            )
        except Exception as e:
            print(f"[har] chrome channel launch failed ({e}), falling back to bundled chromium", flush=True)
            ctx = p.chromium.launch_persistent_context(
                user_data_dir=str(PROFILE_DIR),
                headless=False,
                args=LAUNCH_ARGS,
                viewport={"width": 1366, "height": 900},
                locale="en-US",
                timezone_id="America/Chicago",
                user_agent=UA,
                ignore_default_args=["--enable-automation"],
            )
        ctx.add_init_script(INIT_SCRIPT)

        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        # Warm-up: hit google first so cookies look normal.
        print(f"[har] warm-up: google.com", flush=True)
        try:
            page.goto("https://www.google.com/", wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(1500)
            page.mouse.move(640, 320)
            page.mouse.move(800, 400, steps=12)
        except Exception as e:
            print(f"[har] warm-up nav err {e}", flush=True)

        # Pause briefly, then go to target.
        page.wait_for_timeout(800)
        print(f"[har] target: {url}", flush=True)
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
        except Exception as e:
            print(f"[har] target nav err {e}", flush=True)
            ctx.close()
            sys.exit(2)

        # Let PerimeterX run / human-pace settle.
        for i in range(6):
            page.wait_for_timeout(1500)
            page.mouse.move(200 + i * 80, 300 + i * 30, steps=10)
            page.evaluate(f"window.scrollTo(0, {i * 500})")

        title = page.title()
        print(f"[har] title: {title}", flush=True)

        # If we hit the captcha wall, try waiting longer in case PX
        # auto-clears for a "trusted" profile.
        if "denied" in title.lower() or "captcha" in title.lower():
            print(f"[har] captcha wall detected — waiting 30s for auto-clear", flush=True)
            page.wait_for_timeout(30000)
            try:
                page.reload(wait_until="domcontentloaded", timeout=45000)
                page.wait_for_timeout(5000)
            except Exception as e:
                print(f"[har] reload err {e}", flush=True)
            title = page.title()
            print(f"[har] post-reload title: {title}", flush=True)

        # NOTE: don't auto-click "See all photos" — Redfin redirects to
        # a Homeowner Verification flow that strips the photos. Just
        # extract from the initially-loaded gallery state instead.
        page.wait_for_timeout(2500)

        # Extract images + JSON-LD with srcset, data-attrs, AND scan
        # the entire page HTML for any Redfin CDN URLs we missed (the
        # gallery often stashes them in inline script JSON state).
        result = page.evaluate("""() => {
            const ld = [];
            for (const el of document.querySelectorAll('script[type=\"application/ld+json\"]')) {
                try { ld.push(JSON.parse(el.textContent)); } catch (e) {}
            }
            const imgs = new Set();

            // Pick the LARGEST candidate from a srcset string like:
            //   url1 320w, url2 1024w, url3 2048w
            const pickLargest = (srcset) => {
                if (!srcset) return null;
                let best = null, bestW = -1;
                for (const part of srcset.split(',')) {
                    const bits = part.trim().split(/\\s+/);
                    if (!bits[0]) continue;
                    const w = parseInt((bits[1] || '0').replace(/[^0-9]/g, '')) || 0;
                    if (w > bestW) { bestW = w; best = bits[0]; }
                }
                return best;
            };

            for (const el of document.querySelectorAll('img')) {
                const cands = [
                    el.currentSrc, el.src,
                    el.getAttribute('data-src'),
                    el.getAttribute('data-original'),
                    el.getAttribute('data-zoom'),
                    el.getAttribute('data-large'),
                    el.getAttribute('data-rf-src'),
                ];
                for (const c of cands) if (c) imgs.add(c);
                const ss = pickLargest(el.getAttribute('srcset') || el.srcset);
                if (ss) imgs.add(ss);
            }
            for (const el of document.querySelectorAll('source')) {
                const ss = pickLargest(el.getAttribute('srcset') || el.srcset);
                if (ss) imgs.add(ss);
                if (el.src) imgs.add(el.src);
            }
            for (const m of document.querySelectorAll('meta')) {
                const prop = (m.getAttribute('property') || m.getAttribute('name') || '').toLowerCase();
                if (prop.includes('image')) {
                    const c = m.getAttribute('content');
                    if (c) imgs.add(c);
                }
            }
            // Sweep ALL inline <script> JSON for ssl.cdn-redfin URLs —
            // gallery state often holds these as plain string fields.
            const html = document.documentElement.innerHTML;
            const cdnRegex = /https?:\\/\\/(?:ssl\\.cdn-redfin\\.com|photos\\.harstatic\\.com|photos\\.zillowstatic\\.com|rdcpix\\.com)\\/[^"'\\s)<>]+\\.(?:jpg|jpeg|png|webp)/gi;
            for (const m of html.matchAll(cdnRegex)) imgs.add(m[0]);

            return {
                title: document.title,
                ogTitle: document.querySelector('meta[property=\"og:title\"]')?.content || '',
                ogDescription: document.querySelector('meta[property=\"og:description\"]')?.content || '',
                bodyText: document.body?.innerText?.slice(0, 1000) || '',
                ld, imgs: [...imgs],
            };
        }""")

        ctx.close()

    print(f"[har] image candidates: {len(result['imgs'])}", flush=True)

    # Filter to property-photo CDNs across HAR / Redfin / Zillow / Realtor.
    # Reject brand chrome / icons / sprites by extension + path heuristic.
    PHOTO_HOST_HINTS = (
        "harstatic", "har.com",
        "ssl.cdn-redfin.com", "cdn-redfin.com", "redfin.com",
        "photos.zillowstatic.com", "zillowstatic.com",
        "rdcpix.com", "photos.realtor",
        "compass-listing-photos",
    )
    REJECT_PATH_HINTS = ("/logo", "/icon", "/sprite", "/avatar", "favicon", "google-play", "app-store")
    good = []
    seen_bases = set()
    for u in result["imgs"]:
        if not u or not u.startswith("http"): continue
        host = u.split("/")[2].lower()
        if not any(h in host for h in PHOTO_HOST_HINTS): continue
        path = u.split("/", 3)[-1].lower()
        if any(r in path for r in REJECT_PATH_HINTS): continue
        base = u.split("?")[0]
        if base in seen_bases: continue
        seen_bases.add(base)
        good.append(u)

    # Redfin-specific: when a /bigphoto/ URL exists, sweep its index
    # for additional full-res photos at the same path. /bigphoto/ is
    # ~300KB / 1152x768; /bcsphoto/ is ~25KB. Keep the bigphotos AT
    # THE FRONT of the list (so the hero is photo #1) but retain the
    # bcsphoto gallery thumbnails as the rest of the carousel.
    bigphoto_match = re.search(r"/bigphoto/(\d+)/(\d+)_(\d+)\.jpg", " ".join(good))
    if bigphoto_match:
        prefix_path, listing_id, _ = bigphoto_match.groups()
        base = f"https://ssl.cdn-redfin.com/photo/92/bigphoto/{prefix_path}/{listing_id}"
        bigphotos = []
        for n in range(0, 40):
            test = f"{base}_{n}.jpg"
            try:
                req = urllib.request.Request(test, headers={"User-Agent": UA, "Referer": "https://www.redfin.com/"})
                with urllib.request.urlopen(req, timeout=8) as r:
                    if r.status == 200:
                        bigphotos.append(test)
            except urllib.error.HTTPError as e:
                if e.code == 404: break
            except Exception:
                break
        if bigphotos:
            print(f"[har] bigphoto sweep found {len(bigphotos)} full-res photos", flush=True)
            # Drop any bcsphotos so we don't carry low-res duplicates
            # alongside the high-res hero — bigphotos[0] is the hero;
            # other gallery URLs (bcsphoto) become carousel slides 2..N
            # ONLY IF bigphoto doesn't already cover them.
            new_good = bigphotos[:]
            for u in good:
                if "/bigphoto/" not in u:
                    new_good.append(u)
            good = new_good

    print(f"[har] property-photo URLs: {len(good)}", flush=True)
    saved = []
    for i, img_url in enumerate(good[:12], 1):
        data = fetch_image(img_url, OUT_DIR / f"{prefix}-{i}.jpg")
        if data:
            (OUT_DIR / f"{prefix}-{i}.jpg").write_bytes(data)
            saved.append({"i": i, "url": img_url, "bytes": len(data)})
            print(f"   [{i}] saved {prefix}-{i}.jpg ({len(data)} bytes)", flush=True)

    payload = {
        "url": url,
        "prefix": prefix,
        "result_title": result["title"],
        "result_og": {"title": result["ogTitle"], "desc": result["ogDescription"]},
        "body_preview": result["bodyText"][:500],
        "specs_ld": result["ld"][:3] if result["ld"] else [],
        "image_total": len(result["imgs"]),
        "har_image_count": len(good),
        "saved": saved,
    }
    (OUT_DIR / f"{prefix}.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\n[har] payload -> public/listings/{prefix}.json", flush=True)


if __name__ == "__main__":
    main()
