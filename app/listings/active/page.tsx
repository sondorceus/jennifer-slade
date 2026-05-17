import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ListingsBrowser from "../../components/ListingsBrowser";
import { LISTINGS } from "../../lib/listings-data";

export const metadata = {
  title: "Active Listings — Jennifer Slade Luxury Real Estate",
  description: "Properties currently on the market across Austin's premier residential enclaves.",
};

export default function ActiveListingsPortal() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#1a1716]/55 mb-6">
          <Link href="/listings" className="link-anim">Portfolio</Link>
          <span aria-hidden>›</span>
          <span>Active Listings</span>
        </div>
        <p className="eyebrow text-[#8d6f4f] mb-4">On the market now</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          Active <em className="italic">listings.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          Current offerings across Austin and the Texas Hill Country — filter by region or open any listing for the full gallery and provenance.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <ListingsBrowser listings={LISTINGS} only="active" />
      </section>

      <Footer />
    </main>
  );
}
