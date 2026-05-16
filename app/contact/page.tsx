import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Inquire — Jennifer Slade Luxury Real Estate",
  description: "Begin a quiet, deliberate conversation. Inquiries answered personally.",
};

export default function ContactPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="px-6 lg:px-12 pt-20 lg:pt-32 pb-12 max-w-[1400px] mx-auto">
        <p className="eyebrow text-[#8d6f4f] mb-6">Inquire</p>
        <h1 className="display text-[#1a1716] text-[12vw] sm:text-[8vw] lg:text-[7vw] xl:text-[120px] leading-[0.95] max-w-4xl">
          Begin <em className="italic">quietly.</em>
        </h1>
        <p className="editorial text-[#1a1716]/75 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
          A short note. A preferred way to reach you. The rest unfolds on your timeline.
        </p>
      </section>

      {/* Two-column: form + direct contact */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <form className="lg:col-span-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block eyebrow text-[#8d6f4f] mb-2">First name</span>
                <input type="text" className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/30" placeholder="—" />
              </label>
              <label className="block">
                <span className="block eyebrow text-[#8d6f4f] mb-2">Last name</span>
                <input type="text" className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/30" placeholder="—" />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block eyebrow text-[#8d6f4f] mb-2">Email</span>
                <input type="email" className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/30" placeholder="—" />
              </label>
              <label className="block">
                <span className="block eyebrow text-[#8d6f4f] mb-2">Phone</span>
                <input type="tel" className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/30" placeholder="—" />
              </label>
            </div>
            <label className="block">
              <span className="block eyebrow text-[#8d6f4f] mb-2">Reason for inquiry</span>
              <select className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716]">
                <option>Selling a residence</option>
                <option>Buying in Austin</option>
                <option>Off-market opportunities</option>
                <option>Discreet valuation</option>
                <option>Press / referral / other</option>
              </select>
            </label>
            <label className="block">
              <span className="block eyebrow text-[#8d6f4f] mb-2">Brief note</span>
              <textarea rows={5} className="w-full bg-transparent border-b border-[#1a1716]/30 focus:border-[#1a1716] focus:outline-none py-3 text-lg font-serif text-[#1a1716] placeholder:text-[#1a1716]/30 resize-none" placeholder="Anything that matters — timeline, neighborhood, the property style you love." />
            </label>
            <button type="button" disabled className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium opacity-70 cursor-not-allowed">
              Submission wired post-CRM <span aria-hidden>→</span>
            </button>
            <p className="text-xs text-[#1a1716]/55">Form routes to Jennifer's CRM via webhook — wired once CRM platform is confirmed.</p>
          </form>

          <aside className="lg:col-span-5 lg:border-l lg:border-[#1a1716]/15 lg:pl-12">
            <p className="eyebrow text-[#8d6f4f] mb-6">Direct</p>
            <ul className="space-y-7 font-serif text-xl text-[#1a1716]">
              <li>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8d6f4f] mb-2">Email</p>
                <p>[email TBD]</p>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8d6f4f] mb-2">Phone</p>
                <p>[phone TBD]</p>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8d6f4f] mb-2">Office</p>
                <p>[Brokerage Address TBD]<br />Austin, Texas</p>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8d6f4f] mb-2">Hours</p>
                <p>By appointment</p>
              </li>
            </ul>
            <div className="mt-12 pt-8 border-t border-[#1a1716]/15">
              <p className="eyebrow text-[#8d6f4f] mb-4">Quiet paths</p>
              <ul className="space-y-3 text-base">
                <li><Link href="/sell" className="link-anim text-[#1a1716]">Discreet Valuation (for sellers)</Link></li>
                <li><Link href="/buy" className="link-anim text-[#1a1716]">Off-Market Access (for buyers)</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
