import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ListingsBrowser from "../components/ListingsBrowser";
import { LISTINGS } from "../lib/listings-data";

export const metadata = {
  title: "Curated Portfolio — Jennifer Slade Luxury Real Estate",
  description: "A selection of representative sales and active offerings across Austin's premier residential enclaves.",
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
          Active offerings, private exclusives, and recently closed transactions. Browse all, or jump into a category portal.
        </p>

        {/* Portal quick-links — each category gets a dedicated route. */}
        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/listings/active"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a1716] text-[#1a1716] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors"
          >
            Active Listings →
          </Link>
          <Link
            href="/listings/exclusives"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a1716] text-[#1a1716] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors"
          >
            Private Exclusives →
          </Link>
          <Link
            href="/listings/sold"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a1716] text-[#1a1716] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors"
          >
            Past Successes →
          </Link>
        </div>
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
