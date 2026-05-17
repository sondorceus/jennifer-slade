"use client";

import { useState } from "react";
import ListingCarousel from "./ListingCarousel";
import ListingDetailModal from "./ListingDetailModal";

// Unified listing card — used on Home Featured + /listings ListingsBrowser.
// Renders the carousel + status badge, opens a full-screen detail
// lightbox on image click (and on the "Learn more" / "Open" links).

// Each status gets a visually distinct treatment per Skywalker
// 2026-05-17 — "sold / active hard to tell the difference, we
// need to make them [distinct]". Four luxury-aligned palettes:
//   Active / Just Listed / For Sale  → SOLID GOLD pill (attention)
//   Coming Soon                       → GOLD OUTLINE only ("future")
//   Off-Market                        → SOLID DARK CHARCOAL pill
//                                       with gold text (discretion)
//   Pending                           → muted gray pill (in-flight)
//   Sold / Recently Sold              → SOLID DEEP COGNAC pill with
//                                       cream text (finality)
const STATUS_BADGE: Record<string, string> = {
  "Active":        "bg-[#c9a877] text-[#1a1716] border-[#c9a877]",
  "Just Listed":   "bg-[#c9a877] text-[#1a1716] border-[#c9a877]",
  "For Sale":      "bg-[#c9a877] text-[#1a1716] border-[#c9a877]",
  "Coming Soon":   "bg-transparent text-[#c9a877] border-[#c9a877]",
  "Off-Market":    "bg-[#1a1716] text-[#c9a877] border-[#1a1716]",
  "Pending":       "bg-[#1a1716]/10 text-[#1a1716]/70 border-[#1a1716]/15",
  "Sold":          "bg-[#5a3a2e] text-[#faf6f0] border-[#5a3a2e]",
  "Recently Sold": "bg-[#5a3a2e] text-[#faf6f0] border-[#5a3a2e]",
};

type Props = {
  id: string;
  title: string;
  area: string;
  price: string;
  status: string;
  meta?: string;
  desc?: string;
  images?: string[];
  /** Structured spec fields — render in a unified Specs Bar per Skywalker
   *  2026-05-17. Provide whichever apply (lots only have acres+area). */
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  /** Short region label for the specs bar, e.g. "LAKEWAY, TX". Falls back
   *  to area if not set. */
  regionLabel?: string;
  /** Compact rendering for the Home Featured grid (skips the long desc text). */
  compact?: boolean;
};

// Renders the canonical specs bar — "3 BDS | 2 BA | 1,903 SQFT | LAKEWAY, TX"
// or for land: "0.23 ACRES | HORSESHOE BAY, TX". Skips any unset field.
function SpecsBar({ beds, baths, sqft, acres, regionLabel }: { beds?: number; baths?: number; sqft?: number; acres?: number; regionLabel: string }) {
  const parts: string[] = [];
  if (beds  != null) parts.push(`${beds} BDS`);
  if (baths != null) parts.push(`${baths} BA`);
  if (sqft  != null) parts.push(`${sqft.toLocaleString()} SQFT`);
  if (acres != null) parts.push(`${acres} ACRES`);
  parts.push(regionLabel);
  return (
    <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#1a1716]/65 mt-2">
      {parts.join(" · ")}
    </p>
  );
}

export default function ListingCard({
  title, area, price, status, meta, desc, images,
  beds, baths, sqft, acres, regionLabel,
  compact = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const hasImages = !!(images && images.length > 0);
  const trigger = () => setOpen(true);
  const specsRegion = (regionLabel || area).toUpperCase();
  const hasSpecs = beds != null || baths != null || sqft != null || acres != null;
  // Pre-populate the contact form subject when an inquiry comes from a
  // specific card — feels like a bespoke white-glove response per
  // Skywalker 2026-05-17 dynamic-routing note.
  const inquireHref = `/contact?subject=${encodeURIComponent(`Inquiry regarding ${title}`)}`;

  return (
    <>
      <article className="group">
        <button
          type="button"
          onClick={trigger}
          aria-label={`Open details for ${title}`}
          className="relative w-full mb-5 cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a877] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6f0] rounded-sm"
        >
          {hasImages ? (
            <ListingCarousel images={images!} alt={title} />
          ) : (
            <div
              className="aspect-[3/2] w-full rounded-sm overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(201,168,119,0.22), transparent 60%)," +
                  "radial-gradient(ellipse 70% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
                  "linear-gradient(150deg, #2a2520 0%, #15110f 100%)",
              }}
            />
          )}
          <span className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full border z-10 ${STATUS_BADGE[status] || ""}`}>
            {status}
          </span>
          {/* "View details" hint on hover */}
          <span className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full bg-[#0f0c0a]/70 backdrop-blur-sm text-[#faf6f0] opacity-0 group-hover:opacity-100 transition-opacity z-10">
            View Details
          </span>
        </button>

        {compact ? (
          <>
            <h3
              onClick={trigger}
              className="font-serif text-xl text-[#1a1716] tracking-normal leading-tight cursor-pointer hover:text-[#3a2f23] transition-colors"
            >
              {title}
            </h3>
            {hasSpecs ? (
              <SpecsBar beds={beds} baths={baths} sqft={sqft} acres={acres} regionLabel={specsRegion} />
            ) : (
              <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#1a1716]/65 mt-2">{specsRegion}</p>
            )}
            <div className="flex items-center justify-between mt-3">
              <p className="font-serif text-lg text-[#c9a877]">{price}</p>
              <button
                type="button"
                onClick={trigger}
                className="link-anim text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]"
              >
                Learn more →
              </button>
            </div>
          </>
        ) : (
          <>
            <h3
              onClick={trigger}
              className="font-serif text-2xl text-[#1a1716] tracking-normal leading-tight cursor-pointer hover:text-[#3a2f23] transition-colors"
            >
              {title}
            </h3>
            {hasSpecs ? (
              <SpecsBar beds={beds} baths={baths} sqft={sqft} acres={acres} regionLabel={specsRegion} />
            ) : (
              <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#1a1716]/65 mt-2">{specsRegion}</p>
            )}
            <p className="font-serif text-xl text-[#c9a877] mt-3">{price}</p>
            {meta && <p className="text-[12.5px] tracking-[0.06em] text-[#1a1716]/60 mt-2">{meta}</p>}
            {desc && <p className="editorial text-[15px] text-[#1a1716]/70 mt-4 leading-relaxed">{desc}</p>}
            <div className="flex flex-wrap gap-5 mt-5">
              <button
                type="button"
                onClick={trigger}
                className="link-anim text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]"
              >
                Open Details →
              </button>
              <a
                href={inquireHref}
                className="link-anim text-[11px] tracking-[0.2em] uppercase font-semibold text-[#c9a877]"
              >
                Inquire →
              </a>
            </div>
          </>
        )}
      </article>

      <ListingDetailModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        area={area}
        price={price}
        status={status}
        meta={meta}
        desc={desc}
        images={images || []}
      />
    </>
  );
}
