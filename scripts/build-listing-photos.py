#!/usr/bin/env python3
"""Resize a folder of listing photos for the web carousel.

Reads every .JPG / .jpg in the source directory, sorts them by the
ordering rule (DSC interior/exterior first, then DJI aerials), resizes
each to max 1600px wide at JPEG quality 80 progressive, and writes
them out as {prefix}-{n}.jpg in public/listings/.

Run:
  python3 scripts/build-listing-photos.py \\
      "C:/path/to/source/folder" \\
      honey-creek

  # smoke test (first 5 only)
  python3 scripts/build-listing-photos.py "C:/path" honey-creek --limit 5
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).parent.parent
DST_DIR = ROOT / "public" / "listings"

MAX_WIDTH = 1600
JPEG_QUALITY = 80


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print("usage: build-listing-photos.py <source-folder> <prefix> [--limit N]")
        sys.exit(1)
    src_dir = Path(args[0])
    prefix = args[1]
    limit = None
    if "--limit" in args:
        limit = int(args[args.index("--limit") + 1])

    if not src_dir.exists():
        print(f"source folder does not exist: {src_dir}")
        sys.exit(2)

    DST_DIR.mkdir(parents=True, exist_ok=True)

    # Clear existing {prefix}-*.jpg so old runs don't leave stale files
    for old in DST_DIR.glob(f"{prefix}-*.jpg"):
        old.unlink()

    # Ordering: DSC ascending first (interior/exterior story), then
    # DJI ascending (aerial closers). Any other patterns slot after
    # both groups in alphabetical order.
    dsc = sorted(p for p in src_dir.glob("DSC_*") if p.suffix.lower() in {".jpg", ".jpeg"})
    dji = sorted(p for p in src_dir.glob("DJI_*") if p.suffix.lower() in {".jpg", ".jpeg"})
    other = sorted(p for p in src_dir.iterdir()
                   if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg"}
                   and not p.name.startswith("DSC_") and not p.name.startswith("DJI_"))
    files = dsc + dji + other
    if limit:
        files = files[:limit]

    print(f"[photos] source: {src_dir}")
    print(f"[photos] {len(files)} files: {len(dsc)} DSC, {len(dji)} DJI, {len(other)} other")
    print(f"[photos] -> {DST_DIR}/{prefix}-N.jpg  (max {MAX_WIDTH}w, q{JPEG_QUALITY})")

    total = 0
    for i, src in enumerate(files, 1):
        dst = DST_DIR / f"{prefix}-{i}.jpg"
        img = Image.open(src)
        # Respect EXIF orientation
        img = ImageOps.exif_transpose(img)
        w, h = img.size
        if w > MAX_WIDTH:
            new_h = int(h * MAX_WIDTH / w)
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(dst, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        sz = dst.stat().st_size
        total += sz
        print(f"  [{i:2d}] {src.name:42} -> {dst.name:22} {img.size[0]}x{img.size[1]}  {sz//1024}KB")

    print(f"\n[photos] done. {len(files)} photos / {total // 1024 // 1024} MB total")


if __name__ == "__main__":
    main()
