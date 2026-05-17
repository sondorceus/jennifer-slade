import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ListingsBrowser from "../../components/ListingsBrowser";
import { LISTINGS } from "../../lib/listings-data";

export const metadata = {
  title: "Private Exclusives & Coming Soon — Jennifer Slade",
  description: "Off-market pocket listings and pre-market opportunities — quietly handled for qualified buyers and sellers.",
};

export default function ExclusivesPortal() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-10 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#1a1716]/55 mb-6">
          <Link href="/listings" className="link-anim">Portfolio</Link>
          <span aria-hidden>›</span>
          <span>Private Exclusives</span>
        </div>
        <p className="eyebrow text-[#8d6f4f] mb-4">Before the public market</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          Private <em className="italic">exclusives.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          Off-market pocket listings, pre-market opportunities, and quietly handled transactions for qualified buyers and sellers. Access by inquiry.
        </p>
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] transition-colors"
        >
          Request Off-Market Access →
        </Link>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <ListingsBrowser listings={LISTINGS} only="exclusives" />
      </section>

      <Footer />
    </main>
  );
}
