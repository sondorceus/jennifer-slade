import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Curated Portfolio — Jennifer Slade Luxury Real Estate",
  description: "A selection of representative sales and active offerings across Austin's premier residential enclaves.",
};

type Listing = {
  id: string;
  status: "Active" | "Pending" | "Sold" | "Off-Market";
  title: string;
  area: string;
  price: string;
  meta: string;
  desc: string;
};

const LISTINGS: Listing[] = [
  {
    id: "westlake-ridge",
    status: "Active",
    title: "Westlake Ridgeline Estate",
    area: "Westlake",
    price: "Price upon request",
    meta: "6 bed · 7.5 bath · 9,200 sqft · 1.8 ac",
    desc: "[Listing description goes here — architecture, view orientation, key features, and lifestyle narrative.]",
  },
  {
    id: "tarrytown-classic",
    status: "Pending",
    title: "Tarrytown Classic on a Heritage Lot",
    area: "Tarrytown",
    price: "$5,400,000",
    meta: "5 bed · 5 bath · 5,400 sqft · 0.6 ac",
    desc: "[Listing description goes here — provenance, restoration story, and neighborhood-specific narrative.]",
  },
  {
    id: "lake-waterfront",
    status: "Sold",
    title: "Lake Austin Waterfront with Boat Slip",
    area: "Lake Austin",
    price: "Sold · $8,250,000",
    meta: "5 bed · 6 bath · 7,800 sqft · 200 ft shoreline",
    desc: "[Sold listing description — outcome, days-on-market, sales-to-list ratio.]",
  },
  {
    id: "barton-creek",
    status: "Sold",
    title: "Barton Creek Country Club Residence",
    area: "Barton Creek",
    price: "Sold · $4,100,000",
    meta: "4 bed · 4.5 bath · 6,200 sqft · 1.2 ac",
    desc: "[Sold listing description — outcome, days-on-market, sales-to-list ratio.]",
  },
  {
    id: "dripping-springs",
    status: "Off-Market",
    title: "Hill Country Estate, Dripping Springs",
    area: "Dripping Springs",
    price: "Inquire privately",
    meta: "7 bed · 8 bath · 11,400 sqft · 24 ac",
    desc: "[Off-market — discussed under NDA with qualified clients.]",
  },
  {
    id: "tarrytown-villa",
    status: "Off-Market",
    title: "Tarrytown Villa with Walled Garden",
    area: "Tarrytown",
    price: "Inquire privately",
    meta: "4 bed · 5 bath · 4,600 sqft · 0.4 ac",
    desc: "[Off-market — quiet listing, by referral only.]",
  },
];

const STATUS_BADGE: Record<Listing["status"], string> = {
  Active:        "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/30",
  Pending:       "bg-[#1a1716]/10 text-[#1a1716]/65 border-[#1a1716]/15",
  Sold:          "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]",
  "Off-Market":  "bg-transparent text-[#1a1716]/85 border-[#1a1716]/35",
};

export default function ListingsPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-12 max-w-[1400px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-6">Portfolio</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          A curated <em className="italic">selection.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          Representative active, pending, recently sold, and off-market opportunities. Full provenance and tours available privately.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {LISTINGS.map((l) => (
            <article key={l.id} className="group cursor-default">
              {/* Photo placeholder — swap for real listing imagery. */}
              <div
                className="aspect-[4/5] w-full rounded-sm overflow-hidden mb-5"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(201,168,119,0.22), transparent 60%)," +
                    "radial-gradient(ellipse 70% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
                    "linear-gradient(150deg, #2a2520 0%, #15110f 100%)",
                }}
              />
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full border ${STATUS_BADGE[l.status]}`}>{l.status}</span>
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#1a1716]/55">{l.area}</span>
              </div>
              <h2 className="font-serif text-2xl text-[#1a1716] tracking-normal leading-tight">{l.title}</h2>
              <p className="font-serif text-xl text-[#c9a877] mt-2">{l.price}</p>
              <p className="text-[12.5px] tracking-[0.06em] text-[#1a1716]/60 mt-2">{l.meta}</p>
              <p className="editorial text-[15px] text-[#1a1716]/70 mt-4 leading-relaxed">{l.desc}</p>
              <Link href="/contact" className="link-anim inline-block mt-5 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]">
                Request Tour →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12 text-center">
        <p className="eyebrow text-[#c9a877] mb-5">Off-market</p>
        <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
          The most interesting <em className="italic">homes never list.</em>
        </h2>
        <p className="editorial text-[#faf6f0]/80 text-lg lg:text-xl max-w-2xl mx-auto mt-8 leading-relaxed">
          A portion of every meaningful transaction happens privately. Qualified buyers gain access to opportunities the MLS will never see.
        </p>
        <Link href="/buy" className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full border border-[#c9a877] text-[#c9a877] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#c9a877] hover:text-[#1a1716] transition-colors">
          Request Off-Market Access <span aria-hidden>→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
