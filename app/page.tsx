import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";

// Featured properties — reflects Jennifer's verified transactional footprint
// per Skywalker 2026-05-17 (Homes.com, HAR, Unlock MLS, Kuper Sotheby cross-
// referenced). Real listings + closings. Photos pending direct upload from
// Skywalker or scraper run against the public DBs.
const FEATURED = [
  { id: "honey-creek-lakeway",   status: "Active",        title: "211 Honey Creek Ct #6, Lakeway",    price: "$799,900",          area: "Lakeway · 78738" },
  { id: "dripping-springs-sold", status: "Recently Sold", title: "Hill Country Luxury Estate",        price: "Sold · $2,350,000", area: "Dripping Springs" },
  { id: "miss-kitty-horseshoe",  status: "Active",        title: "Miss Kitty — Build Lot Acreage",    price: "Inquire",           area: "Horseshoe Bay" },
  { id: "gunsmoke-horseshoe",    status: "Active",        title: "Gunsmoke — Build Lot Acreage",      price: "Inquire",           area: "Horseshoe Bay" },
  { id: "westlake-ridge",        status: "Coming Soon",   title: "Westlake Ridgeline Estate",         price: "Price upon request", area: "Westlake" },
  { id: "tarrytown-classic",     status: "Off-Market",    title: "Tarrytown Classic — Heritage Lot",  price: "Inquire privately", area: "Tarrytown" },
] as const;

const STATUS_BADGE: Record<string, string> = {
  "Coming Soon":   "bg-[#c9a877]/15 text-[#c9a877] border-[#c9a877]/35",
  "Just Listed":   "bg-[#faf6f0] text-[#1a1716] border-[#1a1716]/35",
  "For Sale":      "bg-[#1a1716] text-[#faf6f0] border-[#1a1716]",
  "Active":        "bg-[#c9a877] text-[#1a1716] border-[#c9a877]",
  "Off-Market":    "bg-transparent text-[#faf6f0]/80 border-[#faf6f0]/35",
  "Recently Sold": "bg-[#1a1716]/90 text-[#c9a877] border-[#c9a877]/60",
};

// Testimonials — placeholder set, real client quotes replace later.
const TESTIMONIALS = [
  { author: "M. & D. — Westlake sellers",    quote: "Jennifer represented our home with a discretion we hadn't seen from other agents. Two private showings, one closed deal — and our neighbors never knew it was on the market." },
  { author: "R. — Tarrytown buyer",          quote: "She introduced us to a home we never would have seen on the MLS. The whole process felt like a small, deliberate conversation." },
  { author: "K. — Lake Austin family",       quote: "Architectural fluency is the right phrase. Jennifer understood what made our home unusual and translated it to the right kind of buyer." },
  { author: "S. — Barton Creek seller",      quote: "Patient, considered, and absolutely unhurried. The valuation she gave us proved correct to the dollar nine months later." },
];

// Authority block — values per Skywalker's 2026-05-17 production-ready
// Proof of Authority skeleton. 3 stats, centered, dark band.
const STATS = [
  { stat: "$2.4M+",      unit: "Average Transaction Bracket" },
  { stat: "100%",        unit: "Client Privacy & Discretion" },
  { stat: "Central TX",  unit: "From Westlake Estates to Ranches" },
];

export default function Home() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      {/* HERO — cinematic full-bleed */}
      <section className="relative w-full min-h-[92svh] -mt-[68px] overflow-hidden bg-[#0f0c0a] text-[#faf6f0]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 75% 55% at 20% 25%, rgba(201,168,119,0.18), transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
              "linear-gradient(160deg, #0f0c0a 0%, #1a1413 55%, #0a0807 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 min-h-[92svh] flex flex-col justify-between">
          <div className="max-w-5xl">
            <p className="font-serif italic text-xs tracking-[0.28em] uppercase text-[#c9a877] mb-8">Westlake · Tarrytown · Lakeway</p>
            <h1 className="display text-[#faf6f0] text-[14vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[148px] leading-[0.92]">
              Bespoke Real Estate<br />
              <em className="italic">Without Compromise.</em>
            </h1>
            <p className="editorial text-[#faf6f0]/85 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
              Discreet, white-glove representation for discerning buyers and sellers navigating Austin's most exclusive residential markets — from Westlake ridgelines to Lake Travis waterfront and the Dripping Springs hill country.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-12">
            <Link href="/buy" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a877] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#faf6f0] transition-colors">
              Explore Private Exclusives <span aria-hidden>→</span>
            </Link>
            <Link href="/sell" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#faf6f0]/60 text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#faf6f0]/10 transition-colors">
              Request Private Valuation <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF OF AUTHORITY — 3 stats on dark band per Skywalker's spec */}
      <section className="bg-[#1a1716] border-y border-[#0f0c0a] text-[#faf6f0] py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-serif text-[#faf6f0]">{STATS[0].stat}</h3>
            <p className="text-xs uppercase tracking-[0.22em] text-[#faf6f0]/55 font-light">{STATS[0].unit}</p>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-[#faf6f0]/15 py-8 md:py-0">
            <h3 className="text-4xl lg:text-5xl font-serif text-[#faf6f0]">{STATS[1].stat}</h3>
            <p className="text-xs uppercase tracking-[0.22em] text-[#faf6f0]/55 font-light">{STATS[1].unit}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl lg:text-5xl font-serif text-[#faf6f0]">{STATS[2].stat}</h3>
            <p className="text-xs uppercase tracking-[0.22em] text-[#faf6f0]/55 font-light">{STATS[2].unit}</p>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#8d6f4f] mb-5">About Jennifer</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-3xl">
              Representation for clients who measure success in <em className="italic">privacy, craftsmanship, and patience.</em>
            </h2>
            <p className="editorial text-lg lg:text-xl text-[#1a1716]/75 max-w-2xl mt-8 leading-relaxed">
              The work begins with listening — to the architecture, to the neighborhood, to the timeline. Every transaction is built around discretion and unhurried execution. A small number of clients each year, by design, each given the full breadth of the practice's attention.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 mt-10 text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716] link-anim">Learn More <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[#8d6f4f] mb-4">Curated portfolio</p>
              <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Featured <em>properties.</em></h2>
            </div>
            <Link href="/listings" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716]">View All <span aria-hidden>→</span></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {FEATURED.map((p) => (
              <article key={p.id} className="group">
                <div
                  className="aspect-[4/5] w-full rounded-sm overflow-hidden mb-5 relative"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 60% 50% at 30% 30%, rgba(201,168,119,0.22), transparent 60%)," +
                      "radial-gradient(ellipse 70% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
                      "linear-gradient(150deg, #2a2520 0%, #15110f 100%)",
                  }}
                >
                  <span className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full border ${STATUS_BADGE[p.status]}`}>{p.status}</span>
                </div>
                <p className="font-serif text-xl text-[#1a1716] tracking-normal leading-tight">{p.title}</p>
                <p className="text-[11px] tracking-[0.16em] uppercase text-[#1a1716]/55 mt-1">{p.area}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-serif text-lg text-[#c9a877]">{p.price}</p>
                  <Link href="/listings" className="link-anim text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]">Learn more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRIPLE LEAD-GEN FORMS — Buying / Selling / Valuation */}
      <section className="bg-[#0f0c0a] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#c9a877] mb-3 text-center">Begin</p>
          <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl text-center leading-[1.05] mb-16 max-w-3xl mx-auto">
            Three quiet <em>ways in.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-[#faf6f0]/15">
            {/* Buying */}
            <div className="bg-[#0f0c0a] px-7 py-12 lg:px-10 lg:py-14">
              <p className="eyebrow text-[#c9a877] mb-4">Buying</p>
              <h3 className="font-serif text-3xl lg:text-4xl text-[#faf6f0] tracking-normal leading-tight mb-3">Buying a home?</h3>
              <p className="text-[15px] text-[#faf6f0]/70 leading-relaxed mb-6">Receive curated active and off-market listings tailored to your search.</p>
              <LeadForm intent="Buying" source="home-buying-strip" variant="newsletter" submitLabel="Subscribe" />
            </div>
            {/* Selling */}
            <div className="bg-[#0f0c0a] px-7 py-12 lg:px-10 lg:py-14">
              <p className="eyebrow text-[#c9a877] mb-4">Selling</p>
              <h3 className="font-serif text-3xl lg:text-4xl text-[#faf6f0] tracking-normal leading-tight mb-3">Selling a home?</h3>
              <p className="text-[15px] text-[#faf6f0]/70 leading-relaxed mb-6">Discreet valuations and marketing built for Austin's most considered residences.</p>
              <LeadForm intent="Selling" source="home-selling-strip" variant="newsletter" submitLabel="Continue" />
            </div>
            {/* Valuation */}
            <div className="bg-[#1a1413] px-7 py-12 lg:px-10 lg:py-14">
              <p className="eyebrow text-[#c9a877] mb-4">Valuation</p>
              <h3 className="font-serif text-3xl lg:text-4xl text-[#faf6f0] tracking-normal leading-tight mb-3">Know your value.</h3>
              <p className="text-[15px] text-[#faf6f0]/70 leading-relaxed mb-6">A discreet, market-aware valuation arrives privately within five business days.</p>
              <LeadForm
                intent="Valuation"
                source="home-valuation-strip"
                variant="valuation"
                submitLabel="Request Valuation"
                buttonClass="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full bg-[#c9a877] text-[#1a1716] text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#faf6f0] disabled:opacity-60 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>
          <p className="text-[11px] tracking-[0.04em] text-[#faf6f0]/40 text-center mt-8">Submissions route to Jennifer privately. CRM_WEBHOOK_URL + RESEND_API_KEY env vars enable real-time alerts.</p>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[#8d6f4f] mb-4">Insight</p>
              <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Latest <em>articles.</em></h2>
              <p className="editorial text-[#1a1716]/70 text-lg lg:text-xl mt-4 max-w-xl">Market updates and quiet observations from Austin's luxury real estate practice.</p>
            </div>
            <Link href="/resources" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716]">See All <span aria-hidden>→</span></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {[
              { tag: "Market", title: "The Tarrytown Quiet Market Report — Q2 2026.", date: "Coming soon" },
              { tag: "Lifestyle", title: "Lake Austin: A Buyer's Guide to Boat-Slip Ownership.", date: "Coming soon" },
              { tag: "Relocation", title: "Moving from California: An Austin Concierge Guide.", date: "Coming soon" },
            ].map((a, i) => (
              <article key={i} className="border-t border-[#1a1716]/15 pt-6">
                <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#c9a877] mb-3">{a.tag}</p>
                <h3 className="font-serif text-2xl text-[#1a1716] leading-tight">{a.title}</h3>
                <p className="text-[12.5px] tracking-[0.14em] uppercase text-[#1a1716]/55 mt-4">{a.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — moved to bottom per Skywalker 2026-05-17.
          Closing social-proof note, just above the footer, rather than
          interrupting the narrative flow mid-page. */}
      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[#c9a877] mb-4">In their words</p>
              <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Client <em>testimonials.</em></h2>
            </div>
            <Link href="/testimonials" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#c9a877]">View All <span aria-hidden>→</span></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="border border-[#faf6f0]/15 rounded-sm p-8 lg:p-10 hover:border-[#c9a877]/50 transition-colors">
                <p className="font-serif text-2xl lg:text-3xl text-[#faf6f0] leading-[1.3] mb-6">"{t.quote}"</p>
                <p className="text-[11.5px] tracking-[0.2em] uppercase text-[#c9a877]/85">{t.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
