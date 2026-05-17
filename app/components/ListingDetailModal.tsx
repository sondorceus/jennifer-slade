"use client";

import { useEffect, useRef, useState } from "react";

// Full-screen luxury property detail lightbox. Triggered by clicking
// the carousel image on any listing card. Shows details first (left
// side on desktop), photo gallery on the right with full navigation.
// On mobile: details stack on top, gallery below.

export type DetailModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  area: string;
  price: string;
  status: string;
  meta?: string;
  desc?: string;
  images: string[];
};

export default function ListingDetailModal({
  open, onClose, title, area, price, status, meta, desc, images,
}: DetailModalProps) {
  const [idx, setIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setIdx(0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % Math.max(1, images.length));
      else if (e.key === "ArrowLeft")  setIdx((i) => (i - 1 + images.length) % Math.max(1, images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!open) return null;

  const go = (delta: number) => {
    if (images.length === 0) return;
    setIdx((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label={`Property details for ${title}`}
      aria-modal="true"
      className="fixed inset-0 z-[90] bg-[#0f0c0a]/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      {/* Stop propagation on inner content so background-click still closes */}
      <div className="min-h-screen flex items-stretch" onClick={(e) => e.stopPropagation()}>
        <div className="w-full max-w-[1600px] mx-auto bg-[#faf6f0] text-[#1a1716] flex flex-col lg:grid lg:grid-cols-12 my-0 lg:my-6 lg:rounded-sm lg:overflow-hidden">

          {/* DETAILS PANEL (mobile: top; desktop: left col) */}
          <aside className="lg:col-span-5 px-6 lg:px-12 py-10 lg:py-14 lg:overflow-y-auto lg:max-h-[calc(100vh-48px)]">
            <div className="flex items-start justify-between gap-3 mb-8">
              <div>
                <p className="eyebrow text-[#8d6f4f]">Property detail</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="lg:hidden p-2 -mr-2 -mt-1 text-[#1a1716] hover:bg-[#1a1716]/8 rounded-full"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6L18 18M18 6L6 18" /></svg>
              </button>
            </div>

            <span className={`inline-block text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full border mb-5 ${statusBadge(status)}`}>{status}</span>

            <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1716] tracking-normal leading-tight">{title}</h2>
            <p className="text-[11.5px] tracking-[0.18em] uppercase text-[#1a1716]/55 mt-2">{area}</p>

            <p className="font-serif text-3xl lg:text-4xl text-[#c9a877] mt-6">{price}</p>

            {meta && (
              <p className="text-[13px] tracking-[0.06em] text-[#1a1716]/70 mt-3">{meta}</p>
            )}

            {desc && (
              <div className="mt-8 pt-8 border-t border-[#1a1716]/15">
                <p className="eyebrow text-[#8d6f4f] mb-3">About this home</p>
                <p className="editorial text-base text-[#1a1716]/85 leading-relaxed">{desc}</p>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-[#1a1716]/15 space-y-3">
              <a
                href="/contact"
                className="block w-full text-center px-7 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] transition-colors"
              >
                Request Private Tour →
              </a>
              <a
                href="/contact"
                className="block w-full text-center px-7 py-4 rounded-full border border-[#1a1716] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors"
              >
                Inquire →
              </a>
            </div>
          </aside>

          {/* GALLERY PANEL */}
          <section className="relative lg:col-span-7 bg-[#1a1716] flex flex-col">
            {/* Desktop close button — pinned to gallery top-right */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hidden lg:flex absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#faf6f0]/15 backdrop-blur-sm text-[#faf6f0] items-center justify-center hover:bg-[#faf6f0]/25 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6L18 18M18 6L6 18" /></svg>
            </button>

            {/* Main photo */}
            {images.length > 0 ? (
              <div className="relative w-full aspect-[3/2] lg:aspect-auto lg:flex-1 lg:min-h-[480px] bg-[#0f0c0a]">
                {images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${title} — photo ${i + 1} of ${images.length}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                    style={{ opacity: i === idx ? 1 : 0 }}
                  />
                ))}

                {/* Prev / Next */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0f0c0a]/55 backdrop-blur-sm text-[#faf6f0] flex items-center justify-center hover:bg-[#0f0c0a]/85 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next photo"
                      className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0f0c0a]/55 backdrop-blur-sm text-[#faf6f0] flex items-center justify-center hover:bg-[#0f0c0a]/85 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </>
                )}

                {/* Counter pill */}
                <div className="absolute bottom-3 right-3 lg:bottom-5 lg:right-20 text-[11px] tracking-[0.18em] uppercase font-semibold text-[#faf6f0] bg-[#0f0c0a]/65 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {idx + 1} / {images.length}
                </div>
              </div>
            ) : (
              <div className="aspect-[3/2] flex items-center justify-center text-[#faf6f0]/40">
                <p className="text-sm tracking-[0.18em] uppercase">Photos coming soon</p>
              </div>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="bg-[#0f0c0a] px-3 py-3 lg:px-5 lg:py-4 overflow-x-auto">
                <div className="flex gap-2 lg:gap-2.5">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={`Show photo ${i + 1}`}
                      className={`relative shrink-0 w-20 h-14 lg:w-24 lg:h-16 rounded-sm overflow-hidden border-2 transition-all ${
                        i === idx ? "border-[#c9a877] opacity-100" : "border-transparent opacity-55 hover:opacity-90"
                      }`}
                    >
                      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function statusBadge(status: string): string {
  switch (status) {
    case "Active":        return "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/35";
    case "Coming Soon":   return "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/35";
    case "Pending":       return "bg-[#1a1716]/10 text-[#1a1716]/65 border-[#1a1716]/15";
    case "Sold":
    case "Recently Sold": return "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]";
    case "Off-Market":    return "bg-transparent text-[#1a1716]/85 border-[#1a1716]/35";
    default:              return "bg-transparent text-[#1a1716]/65 border-[#1a1716]/25";
  }
}
