"use client";

import { useMemo, useState } from "react";
import ListingCard from "./ListingCard";

export type BrowserListing = {
  id: string;
  status: "Active" | "Pending" | "Sold" | "Off-Market" | "Coming Soon";
  title: string;
  area: string;
  region: string;
  price: string;
  meta: string;
  desc: string;
  images?: string[];
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  regionLabel?: string;
};

// Three luxury-real-estate sections, ordered for narrative flow.
const SECTIONS: Array<{ title: string; eyebrow: string; statuses: BrowserListing["status"][] }> = [
  { title: "Active Listings",                  eyebrow: "On the market now",      statuses: ["Active"] },
  { title: "Private Exclusives & Coming Soon", eyebrow: "Before the public market", statuses: ["Off-Market", "Coming Soon", "Pending"] },
  { title: "Past Successes",                    eyebrow: "Recent representative closings", statuses: ["Sold"] },
];

type Props = {
  listings: BrowserListing[];
};

export default function ListingsBrowser({ listings }: Props) {
  const regions = useMemo(() => {
    const r = new Set<string>();
    for (const l of listings) r.add(l.region);
    return ["All", ...[...r].sort()];
  }, [listings]);

  const [region, setRegion] = useState<string>("All");
  const filtered = region === "All" ? listings : listings.filter((l) => l.region === region);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Region filter — mobile: clean horizontal swipe row, no wrap,
          edge-fade indicates more pills off-screen. Desktop: flex-wrap. */}
      <div className="pb-2">
        <p className="eyebrow text-[#8d6f4f] mb-3">Region</p>
        <div className="relative -mx-6 lg:mx-0">
          <div className="flex items-center gap-2 lg:gap-3 px-6 lg:px-0 overflow-x-auto lg:overflow-visible lg:flex-wrap pb-2 lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {regions.map((r) => {
              const active = r === region;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium border transition-all duration-500 ${
                    active
                      ? "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]"
                      : "bg-transparent text-[#1a1716]/75 border-[#1a1716]/30 hover:border-[#1a1716] hover:text-[#1a1716]"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
          {/* Right-edge fade hint on mobile so users know to swipe */}
          <div className="lg:hidden absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#faf6f0] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Status sections — each shows the filtered listings in that bucket */}
      {SECTIONS.map((section) => {
        const items = filtered.filter((l) => section.statuses.includes(l.status));
        if (items.length === 0) return null;
        return (
          <section key={section.title}>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="eyebrow text-[#8d6f4f] mb-3">{section.eyebrow}</p>
                <h2 className="display text-[#1a1716] text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                  {section.title}<em className="italic">.</em>
                </h2>
              </div>
              <p className="text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716]/55">
                {items.length} {items.length === 1 ? "property" : "properties"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {items.map((l) => (
                <ListingCard
                  key={l.id}
                  id={l.id}
                  title={l.title}
                  area={l.area}
                  price={l.price}
                  status={l.status}
                  meta={l.meta}
                  desc={l.desc}
                  images={l.images}
                  beds={l.beds}
                  baths={l.baths}
                  sqft={l.sqft}
                  acres={l.acres}
                  regionLabel={l.regionLabel}
                />
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="border border-[#1a1716]/15 rounded-sm py-20 px-6 text-center">
          <p className="eyebrow text-[#8d6f4f] mb-3">No matches</p>
          <p className="font-serif text-2xl text-[#1a1716]">
            No properties in <em>{region}</em> at this moment.
          </p>
          <p className="editorial text-[#1a1716]/65 text-base mt-3">
            Inquire directly — many opportunities are quietly handled off-market.
          </p>
        </div>
      )}
    </div>
  );
}
