"use client";

import { useMemo, useState } from "react";
import ListingCarousel from "./ListingCarousel";

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
};

const STATUS_BADGE: Record<BrowserListing["status"], string> = {
  Active:        "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/30",
  "Coming Soon": "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/35",
  Pending:       "bg-[#1a1716]/10 text-[#1a1716]/65 border-[#1a1716]/15",
  Sold:          "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]",
  "Off-Market":  "bg-transparent text-[#1a1716]/85 border-[#1a1716]/35",
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
      {/* Region filter pills */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3 -mb-4">
        <p className="eyebrow text-[#8d6f4f] mr-3">Region</p>
        {regions.map((r) => {
          const active = r === region;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium border transition-colors ${
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
                <article key={l.id} className="group">
                  <div className="mb-5 relative">
                    {l.images && l.images.length > 0 ? (
                      <ListingCarousel images={l.images} alt={l.title} />
                    ) : (
                      <div
                        className="aspect-[4/5] w-full rounded-sm overflow-hidden"
                        style={{
                          backgroundImage:
                            "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(201,168,119,0.22), transparent 60%)," +
                            "radial-gradient(ellipse 70% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
                            "linear-gradient(150deg, #2a2520 0%, #15110f 100%)",
                        }}
                      />
                    )}
                    <span className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full border z-10 ${STATUS_BADGE[l.status]}`}>{l.status}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-[#1a1716]/55">{l.area}</p>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1a1716] tracking-normal leading-tight">{l.title}</h3>
                  <p className="font-serif text-xl text-[#c9a877] mt-2">{l.price}</p>
                  <p className="text-[12.5px] tracking-[0.06em] text-[#1a1716]/60 mt-2">{l.meta}</p>
                  <p className="editorial text-[15px] text-[#1a1716]/70 mt-4 leading-relaxed">{l.desc}</p>
                </article>
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
