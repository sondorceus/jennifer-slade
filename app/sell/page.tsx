import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Discreet Property Valuation — Jennifer Slade",
  description: "Maximum-value, low-profile representation for sellers of high-end Austin residences.",
  // Hidden landing page — not linked from main nav. Indexable but kept
  // off the discovery surface.
};

const MARKETING_PILLARS = [
  {
    eyebrow: "Cinematic media",
    title: "Editorial photography & motion.",
    desc: "Architectural photography, drone, and a cinematic walk-through film — produced by the same houses that shoot for Architectural Digest and Wall Street Journal Mansion.",
  },
  {
    eyebrow: "Staging partnerships",
    title: "Curated, on-brand staging.",
    desc: "Relationships with Austin's most considered staging firms. Each piece selected for the architecture, not the lowest cost.",
  },
  {
    eyebrow: "Private placement",
    title: "Quiet network distribution.",
    desc: "Before any public listing, the property is introduced to a vetted network — luxury agents, wealth managers, family offices, and qualified relocation prospects.",
  },
  {
    eyebrow: "Performance discipline",
    title: "Days-on-market intelligence.",
    desc: "Pricing is set against current comparables, not last quarter's. The result: average sales-to-list ratios that protect both your number and your timeline.",
  },
];

export default function SellPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      {/* Hero */}
      <section className="relative w-full min-h-[80svh] -mt-[68px] overflow-hidden bg-[#0f0c0a] text-[#faf6f0]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 25% 20%, rgba(201,168,119,0.16), transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(50,40,30,0.55), transparent 65%)," +
              "linear-gradient(155deg, #0f0c0a 0%, #1a1413 60%, #0a0807 100%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-24 min-h-[80svh] flex flex-col justify-center">
          <p className="eyebrow text-[#c9a877] mb-6">For Sellers</p>
          <h1 className="display text-[#faf6f0] text-[12vw] sm:text-[9vw] lg:text-[8vw] xl:text-[140px] leading-[0.92] max-w-5xl">
            Discreet, <em className="italic">maximum-value</em><br />home sales.
          </h1>
          <p className="editorial text-[#faf6f0]/85 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
            Marketing built for high-net-worth privacy, designed to attract a serious buyer — not the merely curious.
          </p>
          <Link href="#valuation" className="inline-flex items-center gap-2 mt-12 px-8 py-4 rounded-full bg-[#c9a877] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#faf6f0] transition-colors w-fit">
            Request a Discreet Valuation <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Marketing pillars */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#8d6f4f] mb-5">The marketing strategy</p>
          <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-16">
            Every channel, <em className="italic">considered.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {MARKETING_PILLARS.map((p) => (
              <div key={p.eyebrow}>
                <p className="eyebrow text-[#c9a877] mb-4">{p.eyebrow}</p>
                <h3 className="display text-[#1a1716] text-2xl lg:text-3xl leading-tight">{p.title}</h3>
                <p className="editorial text-[#1a1716]/75 text-lg mt-4 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data stats */}
      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#c9a877] mb-5">Track record</p>
          <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-16">
            The numbers <em className="italic">behind the practice.</em>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
            {[
              { stat: "[—]", unit: "Days on Market (avg.)" },
              { stat: "[—]%", unit: "Sales-to-List Ratio" },
              { stat: "$[—]M", unit: "Lifetime Volume" },
              { stat: "[—]", unit: "Off-Market Closes" },
            ].map((s) => (
              <div key={s.unit}>
                <p className="font-serif text-5xl lg:text-6xl text-[#c9a877]">{s.stat}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#faf6f0]/60 mt-3">{s.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation form anchor */}
      <section id="valuation" className="px-6 lg:px-12 py-24 lg:py-36 max-w-[1100px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-5">Request</p>
        <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
          A confidential <em className="italic">valuation.</em>
        </h2>
        <p className="editorial text-[#1a1716]/75 text-lg lg:text-xl max-w-2xl mt-6 leading-relaxed">
          A brief note begins the conversation. A walk-through follows. A market-aware valuation arrives — privately.
        </p>
        <form className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mt-10 max-w-2xl">
          <input type="text" placeholder="First name" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="text" placeholder="Last name" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="text" placeholder="Address (kept private)" className="sm:col-span-2 bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="email" placeholder="Email" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="tel" placeholder="Phone" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <textarea rows={3} placeholder="Timeline, motivations, anything we should know." className="sm:col-span-2 bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35 resize-none" />
          <button type="button" disabled className="sm:col-span-2 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium opacity-70 cursor-not-allowed w-fit">
            Send privately — wiring post-CRM <span aria-hidden>→</span>
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
