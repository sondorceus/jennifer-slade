import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ListingsBrowser, { type BrowserListing } from "../components/ListingsBrowser";

export const metadata = {
  title: "Curated Portfolio — Jennifer Slade Luxury Real Estate",
  description: "A selection of representative sales and active offerings across Austin's premier residential enclaves.",
};

const HONEY_CREEK_PHOTOS = Array.from({ length: 50 }, (_, i) => `/listings/honey-creek-${i + 1}.jpg`);

// Real listings cross-referenced from Skywalker's 2026-05-17 intel.
// `region` is the canonical area used for the pill-filter UI in
// ListingsBrowser (groups Horseshoe Bay + Dripping Springs etc.
// under "Hill Country / Lots" per Skywalker's spec).
const LISTINGS: BrowserListing[] = [
  {
    id: "honey-creek-lakeway",
    status: "Active",
    title: "211 Honey Creek Ct #6",
    area: "Lakeway · 78738",
    region: "Lakeway",
    price: "$799,900",
    meta: "3 bed · 2.5 bath · 1,903 sqft · MLS 1754607",
    desc: "Santa Barbara-style free-standing residence sitting between two peaceful valleys in a coveted Lakeway enclave — panoramic canyon views and lock-and-leave living. One of just 30 homes in an exclusive two-street community, with vaulted ceilings, his-and-her showers, and a professionally landscaped fully fenced backyard. Four minutes to H-E-B, ten to the Hill Country Galleria.",
    images: HONEY_CREEK_PHOTOS,
  },
  {
    id: "dripping-springs-sold",
    status: "Sold",
    title: "Hill Country Luxury Estate",
    area: "Dripping Springs",
    region: "Hill Country / Lots",
    price: "Sold · $2,350,000",
    meta: "Verified Homes.com closing record",
    desc: "Multi-million dollar Dripping Springs closing — representative of Jennifer's track record on hill-country acreage and architectural-luxury transactions.",
  },
  {
    id: "miss-kitty-horseshoe",
    status: "Active",
    title: "Miss Kitty — Lake Country Acreage",
    area: "Horseshoe Bay",
    region: "Hill Country / Lots",
    price: "Inquire",
    meta: "Active land asset · HAR-listed",
    desc: "Build-ready acreage in the Horseshoe Bay lake-country corridor. Western frontage, hill-country views, owner-builder ready.",
  },
  {
    id: "gunsmoke-horseshoe",
    status: "Active",
    title: "Gunsmoke — Lake Country Acreage",
    area: "Horseshoe Bay",
    region: "Hill Country / Lots",
    price: "Inquire",
    meta: "Active land asset · HAR-listed",
    desc: "Adjacent build-ready acreage with similar elevation, view orientation, and proximity to Lake LBJ.",
  },
  {
    id: "westlake-ridge",
    status: "Coming Soon",
    title: "Westlake Ridgeline Estate",
    area: "Westlake",
    region: "Westlake",
    price: "Price upon request",
    meta: "Specs [TBD]",
    desc: "Representative Westlake ridgeline opportunity — architecture, view orientation, and lifestyle narrative on inquiry.",
  },
  {
    id: "tarrytown-classic",
    status: "Off-Market",
    title: "Tarrytown Villa with Walled Garden",
    area: "Tarrytown",
    region: "Tarrytown",
    price: "Inquire privately",
    meta: "4 bed · 5 bath · 4,600 sqft · 0.4 ac",
    desc: "Quiet listing — discussed privately under NDA with qualified buyers. Mediterranean-revival vernacular in the heart of Tarrytown's heritage corridor.",
  },
];

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
          Active offerings, private exclusives, and recently closed transactions. Filter by region or browse the full collection — full provenance and tours available privately.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <ListingsBrowser listings={LISTINGS} />
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
