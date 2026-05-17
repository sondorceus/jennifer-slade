import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Resources — Jennifer Slade Luxury Real Estate",
  description: "Market reports, neighborhood guides, and quiet observations from Austin's luxury real estate practice.",
};

const REPORTS = [
  {
    tag: "Quarterly Market Report",
    title: "The Tarrytown Luxury Housing Report — Q2 2026.",
    desc: "Inside Austin's most private market. Days-on-market, sales-to-list ratios, and the architectural moves driving valuation.",
    cta: "Download (gated)",
  },
  {
    tag: "Quarterly Market Report",
    title: "Westlake Hillside Estates — Q2 2026.",
    desc: "Quiet inventory, ridgeline pricing, and the buyer profile reshaping the enclave.",
    cta: "Download (gated)",
  },
  {
    tag: "Relocation Guide",
    title: "Moving to Austin from California — A Concierge Guide.",
    desc: "Private schools, country club waiting lists, lake-culture protocol, and the neighborhoods that fit each chapter of life.",
    cta: "Download (gated)",
  },
];

const ARTICLES = [
  { tag: "Lifestyle",   title: "Lake Austin: A Buyer's Guide to Boat-Slip Ownership.", date: "Coming soon" },
  { tag: "Insight",     title: "Why Off-Market Listings Still Move Quietly in Austin.", date: "Coming soon" },
  { tag: "Architecture", title: "Reading Tarrytown — The Mediterranean-Revival Vernacular.", date: "Coming soon" },
  { tag: "Market",       title: "Barton Creek Course-Front Trends, 2026.", date: "Coming soon" },
];

export default function ResourcesPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-12 max-w-[1400px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-6">Resources</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          Quiet <em className="italic">intelligence.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          Market reports, neighborhood guides, and observations — written for clients who prefer informed decisions over urgency.
        </p>
      </section>

      {/* Gated lead-magnet reports */}
      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#c9a877] mb-4">Lead magnets</p>
          <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-14">
            Reports & guides — <em className="italic">request access.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {REPORTS.map((r) => (
              <article key={r.title} className="border border-[#faf6f0]/15 rounded-sm p-7 lg:p-9 hover:border-[#c9a877]/60 transition-colors">
                <p className="eyebrow text-[#c9a877] mb-4">{r.tag}</p>
                <h3 className="font-serif text-2xl lg:text-3xl text-[#faf6f0] leading-tight mb-4 tracking-normal">{r.title}</h3>
                <p className="text-[15px] text-[#faf6f0]/75 leading-relaxed mb-7">{r.desc}</p>
                <Link href="/contact" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#c9a877]">{r.cta} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Articles teaser */}
      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#8d6f4f] mb-4">Articles</p>
          <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-14">
            Long-form <em className="italic">notes.</em>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {ARTICLES.map((a, i) => (
              <article key={i} className="border-t border-[#1a1716]/15 pt-6">
                <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#c9a877] mb-3">{a.tag}</p>
                <h3 className="font-serif text-xl text-[#1a1716] leading-tight">{a.title}</h3>
                <p className="text-[12px] tracking-[0.14em] uppercase text-[#1a1716]/55 mt-4">{a.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
