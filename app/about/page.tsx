import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Jennifer Slade — Luxury Real Estate, Austin",
  description: "A deliberate, discreet, and intelligent practice serving Austin's most considered residential enclaves.",
};

export default function AboutPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-16 lg:pb-24 max-w-[1400px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-6">About</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          A deliberate <em className="italic">practice.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          Representation built on confidentiality, architectural appreciation, and a small client roster — by design.
        </p>
      </section>

      {/* Portrait + bio */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 bg-[#1a1716] text-[#faf6f0]">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            {/* Portrait placeholder — swap for real Jennifer headshot when supplied. */}
            <div className="aspect-[4/5] w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(201,168,119,0.18),transparent_60%),linear-gradient(150deg,#2a2520_0%,#15110f_100%)] rounded-md border border-[#faf6f0]/10" />
            <p className="text-[10.5px] tracking-[0.2em] uppercase text-[#faf6f0]/40 mt-4 text-center">[Portrait — Jennifer Slade]</p>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-[#c9a877] mb-5">Jennifer Slade</p>
            <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
              A practitioner of <em className="italic">quiet luxury.</em>
            </h2>
            <div className="editorial text-lg text-[#faf6f0]/85 leading-relaxed space-y-6 mt-10 max-w-xl">
              <p>[Jennifer's professional biography goes here — career arc, specialization, defining transactions, and the philosophical thread that runs through her practice. Suggested length: 180–240 words.]</p>
              <p>[Second paragraph — credentials, designations, market commentary, civic involvement, and the language clients describe her work in.]</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#faf6f0]/15">
              <div>
                <p className="font-serif text-4xl text-[#c9a877]">$[—]M</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#faf6f0]/60 mt-1">Lifetime sales</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-[#c9a877]">[—]</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#faf6f0]/60 mt-1">Years in market</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-[#c9a877]">[—]%</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#faf6f0]/60 mt-1">Sales-to-list ratio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 lg:px-12 py-24 lg:py-36 max-w-[1100px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-5">Philosophy</p>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="display text-[#1a1716] text-3xl lg:text-4xl leading-tight">Privacy as <em className="italic">a deliverable.</em></h3>
            <p className="editorial text-[#1a1716]/75 text-lg mt-5 leading-relaxed">
              Discretion isn't a posture — it's how the work gets done. The right buyer is found through a network, not a billboard. The right offer is negotiated quietly, then announced.
            </p>
          </div>
          <div>
            <h3 className="display text-[#1a1716] text-3xl lg:text-4xl leading-tight">Architecture as <em className="italic">vocabulary.</em></h3>
            <p className="editorial text-[#1a1716]/75 text-lg mt-5 leading-relaxed">
              A home is the longest sentence a person writes about themselves. The practice reads architecture fluently — and translates it into the right audience.
            </p>
          </div>
          <div>
            <h3 className="display text-[#1a1716] text-3xl lg:text-4xl leading-tight">A small <em className="italic">roster.</em></h3>
            <p className="editorial text-[#1a1716]/75 text-lg mt-5 leading-relaxed">
              A limited number of clients each year, by design. The work is unhurried, attentive, and bespoke — never industrialized.
            </p>
          </div>
          <div>
            <h3 className="display text-[#1a1716] text-3xl lg:text-4xl leading-tight">Local <em className="italic">intelligence.</em></h3>
            <p className="editorial text-[#1a1716]/75 text-lg mt-5 leading-relaxed">
              Westlake, Tarrytown, Lake Austin, Barton Creek, Dripping Springs — each enclave has its own grammar. Two decades of pattern-recognition show in every recommendation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12 text-center">
        <p className="eyebrow text-[#8d6f4f] mb-5">Begin</p>
        <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
          The conversation always starts <em className="italic">quietly.</em>
        </h2>
        <Link href="/contact" className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] transition-colors">
          Request an Elite Consultation <span aria-hidden>→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
