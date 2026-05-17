"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Nav distilled to Skywalker's 2026-05-17 clarity-audit spec — 4 items
// matching ultra-luxury convention (Apple, Aesop, McKinsey-grade brand
// sites). The earlier 8-item ALG-style nav was too dense for the brand.
// Routes still exist (Buy / Sell / Listings / Testimonials / Resources /
// Ranch+Land) but they're reached via inline page CTAs rather than the
// top nav. Featured Portfolio -> /listings, Private Exclusives -> /buy
// (the off-market access hub), Inquire -> /contact.
const NAV_LINKS = [
  { href: "/about",    label: "About" },
  { href: "/listings", label: "Featured Portfolio" },
  { href: "/buy",      label: "Private Exclusives" },
  { href: "/contact",  label: "Inquire" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
          scrolled ? "bg-[#faf6f0]/92 border-[#1a1716]/15 py-3" : "bg-[#faf6f0]/70 border-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="font-serif text-[20px] lg:text-[22px] tracking-tight text-[#1a1716] leading-none">
            Jennifer <em className="italic font-normal">Slade</em>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] xl:text-[11.5px] tracking-[0.16em] uppercase text-[#1a1716]/75">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="link-anim hover:text-[#1a1716]">{l.label}</Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 xl:px-6 py-3 rounded-full border border-[#1a1716]/70 text-[#1a1716] text-[11px] xl:text-[11.5px] tracking-[0.18em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-all"
            >
              Contact Us <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Open menu"
          >
            <span className="w-6 h-px bg-[#1a1716]" />
            <span className="w-6 h-px bg-[#1a1716]" />
            <span className="w-4 h-px bg-[#1a1716] ml-auto" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[80] bg-[#faf6f0] overflow-y-auto">
          <div className="px-6 py-5 flex items-center justify-between border-b border-[#1a1716]/10">
            <Link href="/" onClick={() => setOpen(false)} className="font-serif text-xl text-[#1a1716]">
              Jennifer <em>Slade</em>
            </Link>
            <button onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1716" strokeWidth="1.5"><path d="M6 6L18 18M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="px-6 py-12 space-y-10">
            <ul className="space-y-5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="font-serif text-3xl text-[#1a1716] block">{l.label}</Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.18em] uppercase font-medium"
            >
              Elite Consultation <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
