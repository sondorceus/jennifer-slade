"use client";

import { useEffect, useRef, useState } from "react";

// Luxury listing carousel — subtle auto-crossfade between photos,
// pauses on hover, dot indicators on the bottom, prev/next arrows
// that fade in only when the card is hovered. Designed to feel like
// a slow, deliberate slideshow rather than a touch-swipe gallery —
// matches the quiet-luxury aesthetic.

type Props = {
  images: string[];
  alt: string;
  /** ms between auto-advances. Default 4500. */
  interval?: number;
  /** Aspect-ratio class, e.g. "aspect-[4/5]" (default) or "aspect-[16/10]". */
  aspect?: string;
  /** Optional: render dots indicator. Default true. */
  showDots?: boolean;
};

export default function ListingCarousel({
  images,
  alt,
  interval = 4500,
  aspect = "aspect-[4/5]",
  showDots = true,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || hovering) return;
    timerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idx, hovering, images.length, interval]);

  if (images.length === 0) return null;

  const go = (delta: number) => {
    setIdx((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm bg-[#1a1413] ${aspect}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Crossfade stack — every image stays in the DOM with opacity 0
          unless it's the active one. Browser keeps them decoded so the
          transition is instant. */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} — ${i + 1} of ${images.length}`}
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}

      {/* Prev / Next arrows — only visible on hover */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}
            aria-label="Previous photo"
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0f0c0a]/55 backdrop-blur-sm text-[#faf6f0] flex items-center justify-center transition-opacity duration-300 hover:bg-[#0f0c0a]/80 ${hovering ? "opacity-100" : "opacity-0"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}
            aria-label="Next photo"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0f0c0a]/55 backdrop-blur-sm text-[#faf6f0] flex items-center justify-center transition-opacity duration-300 hover:bg-[#0f0c0a]/80 ${hovering ? "opacity-100" : "opacity-0"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }}
              aria-label={`Photo ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === idx ? "w-7 bg-[#faf6f0]" : "w-3 bg-[#faf6f0]/45 hover:bg-[#faf6f0]/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
