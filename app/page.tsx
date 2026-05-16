import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const FEATURED_AREAS = [
  { name: "Westlake",          tag: "Hillside estates" },
  { name: "Tarrytown",         tag: "Old-money classics" },
  { name: "Lake Austin",       tag: "Waterfront" },
  { name: "Barton Creek",      tag: "Country club" },
  { name: "Dripping Springs",  tag: "Hill country" },
];

export default function Home() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      {/* HERO — cinematic, dark, large-typography gatekeeper */}
      <section className="relative w-full min-h-[92svh] -mt-[68px] overflow-hidden bg-[#0f0c0a] text-[#faf6f0]">
        {/* Background — gradient placeholder; swap for cinematic Austin video/photo when supplied. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 75% 55% at 20% 25%, rgba(184, 137, 90, 0.18), transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(60, 50, 40, 0.55), transparent 65%)," +
              "linear-gradient(160deg, #0f0c0a 0%, #1a1413 55%, #0a0807 100%)",
          }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 min-h-[92svh] flex flex-col justify-between">
          <div className="max-w-5xl">
            <p className="font-serif italic text-xs tracking-[0.28em] uppercase text-[#c9a877] mb-8">Luxury Real Estate · Austin, Texas</p>
            <h1 className="display text-[#faf6f0] text-[14vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[148px] leading-[0.92]">
              Quiet <em>presence,</em><br />enduring <em>value.</em>
            </h1>
            <p className="editorial text-[#faf6f0]/85 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
              A deliberate practice in Austin's most considered enclaves — representing the buyers and sellers who measure success in privacy, craftsmanship, and patience.
            </p>
          </div>

          {/* Choose-your-own-adventure split CTAs */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mt-16 lg:mt-20 max-w-4xl">
            <Link href="/sell" className="group block border border-[#faf6f0]/25 hover:border-[#c9a877] rounded-lg px-7 py-7 lg:px-9 lg:py-10 transition-colors">
              <p className="eyebrow text-[#c9a877] mb-3">For Sellers</p>
              <p className="font-serif text-2xl lg:text-3xl text-[#faf6f0] leading-tight mb-2">I am looking to sell my home.</p>
              <p className="text-sm text-[#faf6f0]/65 mt-3">Marketing excellence · Discreet valuation · Maximum return</p>
              <span className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase text-[#c9a877] group-hover:gap-3 transition-all">Begin <span aria-hidden>→</span></span>
            </Link>
            <Link href="/buy" className="group block border border-[#faf6f0]/25 hover:border-[#c9a877] rounded-lg px-7 py-7 lg:px-9 lg:py-10 transition-colors">
              <p className="eyebrow text-[#c9a877] mb-3">For Buyers</p>
              <p className="font-serif text-2xl lg:text-3xl text-[#faf6f0] leading-tight mb-2">I am looking to buy in Austin.</p>
              <p className="text-sm text-[#faf6f0]/65 mt-3">Curated neighborhoods · Off-market access · White-glove search</p>
              <span className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase text-[#c9a877] group-hover:gap-3 transition-all">Begin <span aria-hidden>→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* POSITIONING — quiet authority band */}
      <section className="bg-[#faf6f0] py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#8d6f4f] mb-5">The practice</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-3xl">
              Representation for clients who measure success in <em className="italic">privacy, craftsmanship, and patience.</em>
            </h2>
            <p className="editorial text-lg lg:text-xl text-[#1a1716]/75 max-w-2xl mt-8 leading-relaxed">
              The work begins with listening — to the architecture, to the neighborhood, to the timeline. Every transaction is built around discretion and unhurried execution, the marks of a practice that takes a small number of clients each year and gives each one the full breadth of its attention.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 mt-10 text-[11.5px] tracking-[0.2em] uppercase text-[#1a1716] link-anim">About Jennifer <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      {/* FEATURED AREAS */}
      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-[#c9a877] mb-4">The enclaves</p>
              <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Where the <em>practice lives.</em></h2>
            </div>
            <Link href="/listings" className="link-anim text-[11.5px] tracking-[0.2em] uppercase text-[#c9a877]">Curated portfolio <span aria-hidden>→</span></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#faf6f0]/15">
            {FEATURED_AREAS.map((a) => (
              <div key={a.name} className="bg-[#1a1716] aspect-[3/4] flex flex-col justify-end p-7 hover:bg-[#0f0c0a] transition-colors group cursor-default">
                <p className="font-serif text-3xl text-[#faf6f0] leading-tight tracking-normal">{a.name}</p>
                <p className="text-[11.5px] tracking-[0.16em] uppercase text-[#c9a877]/85 mt-2">{a.tag}</p>
                <div className="h-px w-12 bg-[#c9a877] mt-6 group-hover:w-24 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA — two paths reminder */}
      <section className="bg-[#faf6f0] py-28 lg:py-40 px-6 lg:px-12 text-center">
        <p className="eyebrow text-[#8d6f4f] mb-5">Begin the conversation</p>
        <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
          A quiet introduction is <em className="italic">the first move.</em>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link href="/sell" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] transition-colors">
            Request a Valuation <span aria-hidden>→</span>
          </Link>
          <Link href="/buy" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#1a1716] text-[#1a1716] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#1a1716] hover:text-[#faf6f0] transition-colors">
            Access Off-Market <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
