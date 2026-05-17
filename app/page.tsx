import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";
import ListingCard from "./components/ListingCard";
import HeroVideoLoop from "./components/HeroVideoLoop";

// Featured properties — reflects Jennifer's verified transactional footprint
// per Skywalker 2026-05-17 (Homes.com, HAR, Unlock MLS, Kuper Sotheby cross-
// referenced). Real listings + closings. Photos pending direct upload from
// Skywalker or scraper run against the public DBs.
type Featured = {
  id: string;
  status: string;
  title: string;
  price: string;
  area: string;
  meta?: string;
  desc?: string;
  /** Full photo array — first image is the hero. Carousel auto-cycles. */
  images?: string[];
  /** Structured specs for the canonical Specs Bar. */
  beds?: number;
  baths?: number;
  sqft?: number;
  acres?: number;
  regionLabel?: string;
};

// Honey Creek — the full 50-photo professional gallery delivered by
// Skywalker on 2026-05-17 (39 DSC interior/exterior + 11 DJI aerials).
// Source images live in his Downloads/211 photos/ folder, resized to
// 1600px wide / JPEG q80 progressive by scripts/build-listing-photos.py.
// Ordered DSC-then-DJI so the gallery tells the story: facade →
// rooms → landscape → aerial closers.
const HONEY_CREEK_PHOTOS = Array.from({ length: 50 }, (_, i) => `/listings/honey-creek-${i + 1}.jpg`);
const WESTHILL_PHOTOS   = Array.from({ length: 12 }, (_, i) => `/listings/westhill-${i + 1}.jpg`);
const CANYONWOOD_PHOTOS = Array.from({ length: 5 },  (_, i) => `/listings/canyonwood-${i + 1}.jpg`);
const SARACEN_PHOTOS    = Array.from({ length: 11 }, (_, i) => `/listings/saracen-${i + 1}.jpg`);

const FEATURED: Featured[] = [
  {
    id: "westhill-south-austin",
    status: "Active",
    title: "2904 Westhill Dr, Austin",
    price: "$3,190,000",
    area: "South Austin · 78704",
    regionLabel: "Austin, TX 78704",
    beds: 5, baths: 4.5, sqft: 3530, acres: 0.21,
    meta: "Built 2025 · MLS 2682180",
    desc: "Modern luxury new build in the heart of Austin's 78704. A 5-bedroom, 4.5-bathroom masterpiece blending architectural sophistication with everyday comfort. Chef's kitchen with 54\" SubZero, Wolf 48\" gas cooktop with separate double oven, quartz waterfall island, and a walk-through pantry with a second sink, fridge, and dishwasher. Double-sided fireplace, main-level primary suite with a balcony built-in outdoor kitchen overlooking the pool, wraparound putting green, and outdoor fireplace. Second-level living + three bedrooms. Lower level with private entrance — home office, guest retreat, or game room with full bath and direct pool access. Owner will consider owner-finance options.",
    images: WESTHILL_PHOTOS,
  },
  {
    id: "honey-creek-lakeway",
    status: "Active",
    title: "211 Honey Creek Ct #6, Lakeway",
    price: "$799,900",
    area: "Lakeway · 78738",
    regionLabel: "Lakeway, TX 78738",
    beds: 3, baths: 2.5, sqft: 1903,
    meta: "MLS 1754607",
    desc: "Santa Barbara-style free-standing residence sitting between two peaceful valleys in a coveted Lakeway enclave — panoramic canyon views and lock-and-leave living. One of just 30 homes in an exclusive two-street community, with vaulted ceilings, his-and-her showers, and a professionally landscaped fully fenced backyard. Four minutes to H-E-B, ten to the Hill Country Galleria.",
    images: HONEY_CREEK_PHOTOS,
  },
  {
    id: "saracen-austin-hills",
    status: "Recently Sold",
    title: "Saracen Road Modern, Austin",
    price: "Sold · $1,250,000+",
    area: "Austin · 78733",
    regionLabel: "Austin, TX 78733",
    beds: 5, baths: 4.5, sqft: 4928, acres: 0.3,
    meta: "Closed March 23, 2026 · MLS 7274585",
    desc: "Architectural modern farmhouse in Austin Hills — twin-gable charcoal façade, glass garage door, drought-tolerant landscape, fenced rear with pool and outdoor entertaining. Recent closing representing Jennifer's continued momentum in the 78733 corridor.",
    images: SARACEN_PHOTOS,
  },
  {
    id: "dripping-springs-sold",
    status: "Recently Sold",
    title: "Hill Country Luxury Estate",
    price: "Sold · $2,350,000",
    area: "Dripping Springs",
    regionLabel: "Dripping Springs, TX",
    meta: "Verified Homes.com closing record",
    desc: "Multi-million dollar Dripping Springs closing — representative of Jennifer's track record on hill-country acreage and architectural-luxury transactions.",
  },
  {
    id: "canyonwood-dripping",
    status: "Recently Sold",
    title: "201 N Canyonwood Dr, Dripping Springs",
    price: "Sold · Multi-million",
    area: "Dripping Springs · 78620",
    regionLabel: "Dripping Springs, TX 78620",
    beds: 8, baths: 6, sqft: 5422, acres: 2,
    meta: "MLS 6012922 · Texas Hill Country resort estate",
    desc: "Resort-style hill country estate on two private acres — main residence, guest wings, and outbuildings totaling approximately 9,000 sqft of conditioned space. Stone-and-metal hill-country vernacular with sunset views, multi-bay garage, smart-home infrastructure, sauna, and gallery-grade interior finishes.",
    images: CANYONWOOD_PHOTOS,
  },
  {
    id: "miss-kitty-horseshoe",
    status: "Active",
    title: "Miss Kitty — Build Lot Acreage",
    price: "Inquire",
    area: "Horseshoe Bay",
    regionLabel: "Horseshoe Bay, TX",
    acres: 0.5,
    meta: "Active land asset · HAR-listed",
    desc: "Build-ready acreage in the Horseshoe Bay lake-country corridor. Western frontage, hill-country views, owner-builder ready.",
  },
  {
    id: "gunsmoke-horseshoe",
    status: "Active",
    title: "Gunsmoke — Build Lot Acreage",
    price: "Inquire",
    area: "Horseshoe Bay",
    regionLabel: "Horseshoe Bay, TX",
    acres: 0.5,
    meta: "Active land asset · HAR-listed",
    desc: "Adjacent build-ready acreage with similar elevation, view orientation, and proximity to Lake LBJ.",
  },
  {
    id: "westlake-ridge",
    status: "Coming Soon",
    title: "Westlake Ridgeline Estate",
    price: "Price upon request",
    area: "Westlake",
    regionLabel: "Westlake, TX",
    meta: "Specs available on inquiry",
    desc: "Representative Westlake ridgeline opportunity — architecture, view orientation, and lifestyle narrative on inquiry.",
  },
  {
    id: "tarrytown-classic",
    status: "Off-Market",
    title: "Tarrytown Classic — Heritage Lot",
    price: "Inquire privately",
    area: "Tarrytown",
    regionLabel: "Tarrytown, TX",
    meta: "Quiet listing · by referral",
    desc: "Mediterranean-revival vernacular on a Tarrytown heritage lot — discussed privately with qualified buyers under NDA.",
  },
];

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

      {/* HERO — cinematic full-bleed with looping background video.
          Video sits at z-0, dark overlay at z-[1] for text readability,
          portrait at z-[5], content at z-10. The gradient backdrop
          stays as the poster-frame fallback in case the video fails
          to load (autoplay-blocked, slow network, prefers-reduced-motion). */}
      <section className="relative w-full min-h-[92svh] -mt-[68px] overflow-hidden bg-[#0f0c0a] text-[#faf6f0]">
        {/* Poster-frame fallback gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 75% 55% at 20% 25%, rgba(201,168,119,0.18), transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(60,50,40,0.55), transparent 65%)," +
              "linear-gradient(160deg, #0f0c0a 0%, #1a1413 55%, #0a0807 100%)",
          }}
        />
        {/* Background video — Austin / luxury establishing loop from
            Skywalker 2026-05-17. Uses a seamless-loop component that
            renders two stacked <video>s and crossfades between them
            during the last ~0.9s of each cycle, so the camera "keeps
            moving" — no visible stop-and-replay seam. */}
        <div className="absolute inset-0 z-[1] motion-reduce:hidden">
          <HeroVideoLoop
            src="/video/hero-loop.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Contrast scrim — pushes the bright sunshine in the video
            down so the headline reads cleanly. Three-layer recipe:
            (a) vertical gradient — heaviest top and bottom for the
                hero typography + CTAs respectively
            (b) left-anchored radial — darker where the text block
                sits, lighter where the portrait is on the right
            (c) classic edge vignette */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0f0c0a]/65 via-[#0f0c0a]/30 to-[#0f0c0a]/80" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_85%_at_18%_55%,rgba(15,12,10,0.65),transparent_70%)]" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_25%,rgba(0,0,0,0.55)_100%)]" />
        {/* Jennifer's portrait positioned right side on desktop — uses
            a top-fade + side-fade mask so the white background of the
            photo blends seamlessly into the dark cinematic hero. The
            agent appears to emerge from the scene rather than being
            pasted on top. Hidden on small mobile to keep the headline
            real estate. */}
        <img
          src="/jennifer-slade.jpg"
          alt="Jennifer Slade"
          className="hidden md:block absolute right-0 bottom-0 h-[90%] lg:h-[95%] w-auto z-[5] pointer-events-none select-none object-contain object-bottom"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 90% at 60% 65%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, transparent 95%)",
            maskImage:
              "radial-gradient(ellipse 75% 90% at 60% 65%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, transparent 95%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 min-h-[92svh] flex flex-col justify-between z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <p
              className="font-serif italic text-xs tracking-[0.28em] uppercase text-[#c9a877] mb-8"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
            >
              Westlake · Tarrytown · Lakeway
            </p>
            <h1
              className="display text-[#faf6f0] text-[14vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[120px] leading-[0.92]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.75), 0 1px 2px rgba(0,0,0,0.55)" }}
            >
              Bespoke Real Estate<br />
              <em className="italic">Without Compromise.</em>
            </h1>
            <p
              className="editorial text-[#faf6f0] text-lg lg:text-xl max-w-xl mt-8 leading-relaxed"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
            >
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

      {/* FEATURED PROPERTIES — grouped by status (Skywalker 2026-05-17
          clarity-audit): Active / Private Exclusives & Coming Soon /
          Past Successes. Each section header + card grid. Renders only
          the buckets that have entries. */}
      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[#8d6f4f] mb-4">Curated portfolio</p>
              <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Featured <em>properties.</em></h2>
            </div>
            <Link href="/listings" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716]">View All <span aria-hidden>→</span></Link>
          </div>

          {([
            { title: "Active Listings",                  eyebrow: "On the market now",                 portal: "/listings/active",     statuses: ["Active"] },
            { title: "Private Exclusives & Coming Soon", eyebrow: "Before the public market",          portal: "/listings/exclusives", statuses: ["Off-Market", "Coming Soon", "Just Listed"] },
            { title: "Past Successes",                    eyebrow: "Recent representative closings",   portal: "/listings/sold",       statuses: ["Sold", "Recently Sold"] },
          ] as const).map((section) => {
            const items = FEATURED.filter((p) => (section.statuses as readonly string[]).includes(p.status));
            if (items.length === 0) return null;
            return (
              <div key={section.title} className="mb-16 lg:mb-20 last:mb-0">
                <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
                  <div>
                    <p className="eyebrow text-[#c9a877] mb-2">{section.eyebrow}</p>
                    <h3 className="display text-[#1a1716] text-2xl sm:text-3xl lg:text-4xl leading-tight">
                      {section.title}<em className="italic">.</em>
                    </h3>
                  </div>
                  <Link href={section.portal} className="link-anim text-[11px] tracking-[0.22em] uppercase font-semibold text-[#1a1716]">
                    View All <span aria-hidden>→</span>
                  </Link>
                </div>
                {/* Quick-scroll menu — soft "white shadowing" affordance
                    tuned to 30% less than the previous attempt per
                    Skywalker 2026-05-17 ("you did it way too much").
                    Math: card1 = 100vw - 3.5rem (56px) + gap-3 (12px)
                    leaves a 20px sliver of card2 on the right, which
                    the 48px cream-fade overlay dissolves into the page
                    background — a quiet teaser, not a feature. */}
                <div className="relative -mx-6 lg:mx-0">
                  <div
                    className="flex gap-3 lg:gap-6 px-6 lg:px-0 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {items.map((p) => (
                      <div
                        key={p.id}
                        className="shrink-0 w-[calc(100vw-3.5rem)] sm:w-[48%] lg:w-[31%] snap-start snap-always"
                      >
                        <ListingCard
                          id={p.id}
                          title={p.title}
                          area={p.area}
                          price={p.price}
                          status={p.status}
                          meta={p.meta}
                          desc={p.desc}
                          images={p.images}
                          beds={p.beds}
                          baths={p.baths}
                          sqft={p.sqft}
                          acres={p.acres}
                          regionLabel={p.regionLabel}
                          compact
                        />
                      </div>
                    ))}
                  </div>
                  {/* Cream edge-fade — feathers the trailing card sliver
                      into the page bg. Reduced to w-12 (48px) per
                      Skywalker — the previous w-16 read as too heavy. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 bottom-2 right-0 w-12 lg:hidden bg-gradient-to-l from-[#faf6f0] via-[#faf6f0]/90 to-transparent"
                  />
                  {/* Dot indicator — mobile only (lg+ has grid view).
                      Shows total count + "swipe for more" affordance. */}
                  {items.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 lg:hidden">
                      {items.map((_, i) => (
                        <span
                          key={i}
                          aria-hidden
                          className="h-[6px] w-[6px] rounded-full bg-[#1a1716]/25"
                        />
                      ))}
                      <span className="text-[10px] tracking-[0.22em] uppercase text-[#1a1716]/55 ml-2">
                        Swipe <span aria-hidden>→</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AGENT BRAND — editorial bio + portrait. Moved to a CREAM band
          on 2026-05-17 per Skywalker bug report: the portrait's white
          background was crashing into the dark band edge. Cream merges
          naturally with the photo background. */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            {/* Portrait — Jennifer's editorial headshot, sized as a
                portrait card. Soft warm shadow underneath grounds it. */}
            <div className="relative">
              <div className="absolute -inset-2 bg-[radial-gradient(ellipse_75%_60%_at_50%_55%,rgba(201,168,119,0.20),transparent_70%)] blur-2xl" />
              <img
                src="/jennifer-slade.jpg"
                alt="Jennifer Slade — Luxury Real Estate, Austin"
                className="relative w-full max-w-[480px] mx-auto aspect-[4/5] object-cover rounded-md shadow-[0_30px_60px_-25px_rgba(60,40,20,0.35)]"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-[#8d6f4f] mb-5">The Agent</p>
            <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-2xl">
              Representation built on <em className="italic">privacy, craft, and a small roster.</em>
            </h2>
            <div className="editorial text-lg text-[#1a1716]/80 leading-relaxed space-y-5 mt-8 max-w-2xl">
              <p>
                Jennifer Slade represents high-end buyers and sellers across Austin's most considered enclaves —
                Westlake, Tarrytown, Lakeway, Barton Creek, and the Dripping Springs hill country. Her practice
                is defined by confidentiality, architectural appreciation, and white-glove concierge service.
              </p>
              <p>
                The work begins with listening — to the architecture, to the neighborhood, to the timeline.
                Every transaction is handled with discretion and unhurried execution. A small number of clients
                each year, by design, each given the full breadth of the practice's attention.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#3a2f23] transition-colors">
                Full Biography <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#1a1716] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors">
                Begin a Quiet Conversation <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES BREAKDOWN — 3-column "What She Offers" per Skywalker
          2026-05-17 elevation guide: Sellers / Buyers / Private Exclusives. */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <p className="eyebrow text-[#8d6f4f] mb-4">What we offer</p>
            <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
              A different standard <em className="italic">of service.</em>
            </h2>
            <p className="editorial text-[#1a1716]/70 text-lg lg:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
              Three distinct paths through the practice — each built for the way high-net-worth clients actually buy and sell.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#1a1716]/15">
            {/* Sellers */}
            <div className="bg-[#faf6f0] p-8 lg:p-10 flex flex-col">
              <p className="eyebrow text-[#c9a877] mb-4">For Sellers</p>
              <h3 className="font-serif text-3xl text-[#1a1716] leading-tight mb-5">Strategic listing representation.</h3>
              <ul className="space-y-3 font-serif text-base text-[#1a1716]/80 leading-relaxed flex-1">
                <li>· Bespoke architectural staging partnerships</li>
                <li>· Cinematic videography & editorial photography</li>
                <li>· Global luxury-network distribution</li>
                <li>· Targeted digital + print campaigns</li>
                <li>· Discreet pre-market network introductions</li>
              </ul>
              <Link href="/sell" className="link-anim mt-8 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]">
                Request a Bespoke Valuation →
              </Link>
            </div>
            {/* Buyers */}
            <div className="bg-[#faf6f0] p-8 lg:p-10 flex flex-col">
              <p className="eyebrow text-[#c9a877] mb-4">For Buyers</p>
              <h3 className="font-serif text-3xl text-[#1a1716] leading-tight mb-5">White-glove acquisition service.</h3>
              <ul className="space-y-3 font-serif text-base text-[#1a1716]/80 leading-relaxed flex-1">
                <li>· Off-market property sourcing</li>
                <li>· Hyper-local neighborhood deep-dives</li>
                <li>· Private network introductions</li>
                <li>· Architectural intelligence + provenance research</li>
                <li>· Relocation concierge for inbound HNW clients</li>
              </ul>
              <Link href="/buy" className="link-anim mt-8 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1a1716]">
                Request Private Consultation →
              </Link>
            </div>
            {/* Private Exclusives */}
            <div className="bg-[#1a1716] text-[#faf6f0] p-8 lg:p-10 flex flex-col">
              <p className="eyebrow text-[#c9a877] mb-4">Private Exclusives</p>
              <h3 className="font-serif text-3xl text-[#faf6f0] leading-tight mb-5">Quietly handled, never listed.</h3>
              <ul className="space-y-3 font-serif text-base text-[#faf6f0]/80 leading-relaxed flex-1">
                <li>· Pocket-listing representation for high-profile clients</li>
                <li>· NDA-protected showings</li>
                <li>· Vetted-buyer-only access</li>
                <li>· Coordination with wealth managers & family offices</li>
                <li>· Architectural-restoration discretion</li>
              </ul>
              <Link href="/contact" className="link-anim mt-8 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#c9a877]">
                Inquire Privately →
              </Link>
            </div>
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
