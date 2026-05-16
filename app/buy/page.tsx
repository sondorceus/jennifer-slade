import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Off-Market Access — Jennifer Slade Luxury Real Estate",
  description: "White-glove buyer representation in Austin's most considered enclaves — with access to opportunities the MLS never sees.",
};

const NEIGHBORHOODS = [
  {
    name: "Westlake",
    eyebrow: "Hillside",
    desc: "Architect-led estates on the ridgelines above Lake Austin — privacy, vistas, and the finest of Austin ISD's school options.",
  },
  {
    name: "Tarrytown",
    eyebrow: "Old-money classics",
    desc: "Heritage lots and Mediterranean-revival homes minutes from downtown — the most established address in the city.",
  },
  {
    name: "Lake Austin",
    eyebrow: "Waterfront",
    desc: "Boat-slip ownership and direct water access along the most scenic stretches of the Colorado River basin.",
  },
  {
    name: "Barton Creek",
    eyebrow: "Country club",
    desc: "Course-front and gated residences within the Barton Creek Country Club's master-planned community.",
  },
  {
    name: "Dripping Springs",
    eyebrow: "Hill country",
    desc: "Acreage estates west of Austin — equestrian, vineyard, and ranch properties with full privacy.",
  },
  {
    name: "Downtown / Rainey",
    eyebrow: "Penthouse",
    desc: "Top-floor penthouses and full-floor residences in the architecturally significant downtown high-rises.",
  },
];

const ACCESS_TIERS = [
  {
    eyebrow: "On-Market",
    title: "Curated MLS Search",
    desc: "A tailored search of every active luxury listing in Austin, refined to your architectural preferences and lifestyle requirements.",
  },
  {
    eyebrow: "Off-Market",
    title: "Pocket Listing Access",
    desc: "Properties that quietly trade between agents and qualified buyers, never reaching the MLS. Most meaningful Austin luxury transactions happen here.",
  },
  {
    eyebrow: "Coming-Soon",
    title: "Pre-Market Introductions",
    desc: "Properties in the 30–90 day pre-listing window — early access while the seller finishes preparing for public marketing.",
  },
  {
    eyebrow: "Bespoke Search",
    title: "Find What Isn't Listed",
    desc: "Targeted outreach to specific homes you'd consider — even when they aren't actively for sale. Often the only path to a generational property.",
  },
];

export default function BuyPage() {
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
          <p className="eyebrow text-[#c9a877] mb-6">For Buyers</p>
          <h1 className="display text-[#faf6f0] text-[12vw] sm:text-[9vw] lg:text-[8vw] xl:text-[140px] leading-[0.92] max-w-5xl">
            Access to Austin's <em className="italic">off-market</em><br />opportunities.
          </h1>
          <p className="editorial text-[#faf6f0]/85 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
            The most interesting homes don't list. Buyer representation built around the network where they quietly trade.
          </p>
          <Link href="#access" className="inline-flex items-center gap-2 mt-12 px-8 py-4 rounded-full bg-[#c9a877] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-semibold hover:bg-[#faf6f0] transition-colors w-fit">
            Request Off-Market Access <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Access tiers */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#8d6f4f] mb-5">Four ways in</p>
          <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-16">
            Every search uses <em className="italic">all four channels.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {ACCESS_TIERS.map((t) => (
              <div key={t.eyebrow}>
                <p className="eyebrow text-[#c9a877] mb-4">{t.eyebrow}</p>
                <h3 className="display text-[#1a1716] text-2xl lg:text-3xl leading-tight">{t.title}</h3>
                <p className="editorial text-[#1a1716]/75 text-lg mt-4 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#c9a877] mb-5">The enclaves</p>
          <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mb-16">
            Where Jennifer's <em className="italic">practice runs deep.</em>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#faf6f0]/15">
            {NEIGHBORHOODS.map((n) => (
              <div key={n.name} className="bg-[#1a1716] p-8 lg:p-10 hover:bg-[#0f0c0a] transition-colors min-h-[260px] flex flex-col">
                <p className="eyebrow text-[#c9a877] mb-3">{n.eyebrow}</p>
                <p className="font-serif text-3xl text-[#faf6f0] leading-tight">{n.name}</p>
                <p className="editorial text-base text-[#faf6f0]/75 mt-4 leading-relaxed flex-1">{n.desc}</p>
                <div className="h-px w-12 bg-[#c9a877] mt-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access form anchor */}
      <section id="access" className="px-6 lg:px-12 py-24 lg:py-36 max-w-[1100px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-5">Begin</p>
        <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
          Request <em className="italic">access.</em>
        </h2>
        <p className="editorial text-[#1a1716]/75 text-lg lg:text-xl max-w-2xl mt-6 leading-relaxed">
          A short note. Your timeline, your target. The off-market channel opens after a brief introduction call.
        </p>
        <form className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mt-10 max-w-2xl">
          <input type="text" placeholder="First name" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="text" placeholder="Last name" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="email" placeholder="Email" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="tel" placeholder="Phone" className="bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="text" placeholder="Target neighborhood(s)" className="sm:col-span-2 bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <input type="text" placeholder="Budget range" className="sm:col-span-2 bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35" />
          <textarea rows={3} placeholder="Architectural preferences, timeline, anything that matters." className="sm:col-span-2 bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/35 resize-none" />
          <button type="button" disabled className="sm:col-span-2 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium opacity-70 cursor-not-allowed w-fit">
            Submit privately — wiring post-CRM <span aria-hidden>→</span>
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
