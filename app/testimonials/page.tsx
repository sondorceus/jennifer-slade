import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Testimonials — Jennifer Slade Luxury Real Estate",
  description: "What clients say about working with Jennifer Slade on Austin's most considered residential transactions.",
};

// Placeholder set — replace with real client quotes once supplied.
const TESTIMONIALS = [
  { author: "M. & D., Westlake sellers",   excerpt: "Jennifer represented our home with a discretion we hadn't seen from other agents. Two private showings, one closed deal — and our neighbors never knew it was on the market." },
  { author: "R., Tarrytown buyer",          excerpt: "She introduced us to a home we never would have seen on the MLS. The whole process felt like a small, deliberate conversation." },
  { author: "K., Lake Austin family",       excerpt: "Architectural fluency is the right phrase. Jennifer understood what made our home unusual and translated it to the right kind of buyer." },
  { author: "S., Barton Creek seller",      excerpt: "Patient, considered, and absolutely unhurried. The valuation she gave us proved correct to the dollar nine months later." },
  { author: "A., Dripping Springs estate",  excerpt: "Two acres, four offers in twelve days — and the one she advised us to accept was not the highest. She was right." },
  { author: "T., relocating from CA",       excerpt: "Jennifer made Austin feel like a small town. She knew the right schools, the right country club, and the right architect — all by their first names." },
];

export default function TestimonialsPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-12 max-w-[1400px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-6">In their words</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          What clients <em className="italic">say.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          A quiet collection — the work is described best by the people who lived through it.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-10">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="border border-[#1a1716]/15 rounded-sm p-8 lg:p-10 hover:border-[#c9a877]/70 transition-colors">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-6 text-[#c9a877]" stroke="currentColor"><path d="M0 24V12C0 6 5 1 12 0v4c-4 1-7 4-7 8h7v12H0zm20 0V12c0-6 5-11 12-12v4c-4 1-7 4-7 8h7v12H20z" fill="currentColor" opacity="0.4"/></svg>
              <p className="font-serif text-2xl lg:text-3xl text-[#1a1716] leading-[1.35] mb-6">"{t.excerpt}"</p>
              <p className="text-[11.5px] tracking-[0.2em] uppercase text-[#8d6f4f]">{t.author}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
