import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";

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
          <div className="lg:col-span-7">
            <LeadForm intent="Contact" source="contact-page" variant="contact" submitLabel="Send Inquiry" dark={false} />
            <p className="text-xs text-[#1a1716]/55 mt-6">Submissions route to Jennifer privately. Replies land within one business day.</p>
          </div>

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
