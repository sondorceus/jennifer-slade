"use client";

import { useState } from "react";
import ListingCarousel from "./ListingCarousel";
import ListingDetailModal from "./ListingDetailModal";

// Unified listing card — used on Home Featured + /listings ListingsBrowser.
// Renders the carousel + status badge, opens a full-screen detail
// lightbox on image click (and on the "Learn more" / "Open" links).

const STATUS_BADGE: Record<string, string> = {
  "Active":        "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/30",
  "Coming Soon":   "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/35",
  "Just Listed":   "bg-[#faf6f0] text-[#1a1716] border-[#1a1716]/35",
  "For Sale":      "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]",
  "Pending":       "bg-[#1a1716]/10 text-[#1a1716]/65 border-[#1a1716]/15",
  "Off-Market":    "bg-transparent text-[#1a1716]/85 border-[#1a1716]/35",
  "Sold":          "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]",
  "Recently Sold": "bg-[#1a1716]/90 text-[#c9a877] border-[#c9a877]/60",
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
  /** Compact rendering for the Home Featured grid (skips the long desc text). */
  compact?: boolean;
};

export default function ListingCard({
  title, area, price, status, meta, desc, images, compact = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const hasImages = !!(images && images.length > 0);
  const trigger = () => setOpen(true);

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
            <p
              onClick={trigger}
              className="font-serif text-xl text-[#1a1716] tracking-normal leading-tight cursor-pointer hover:text-[#3a2f23] transition-colors"
            >
              {title}
            </p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#1a1716]/55 mt-1">{area}</p>
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
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#1a1716]/55 mb-1">{area}</p>
            <h3
              onClick={trigger}
              className="font-serif text-2xl text-[#1a1716] tracking-normal leading-tight cursor-pointer hover:text-[#3a2f23] transition-colors"
            >
              {title}
            </h3>
            <p className="font-serif text-xl text-[#c9a877] mt-2">{price}</p>
            {meta && <p className="text-[12.5px] tracking-[0.06em] text-[#1a1716]/60 mt-2">{meta}</p>}
            {desc && <p className="editorial text-[15px] text-[#1a1716]/70 mt-4 leading-relaxed">{desc}</p>}
            <button
              type="button"
              onClick={trigger}
              className="link-anim inline-block mt-5 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]"
            >
              Open Details →
            </button>
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
