import Link from "next/link";

// TREC compliance: every page footer must display:
//   - link to TREC Information About Brokerage Services (IABS) form
//   - link to TREC Consumer Protection Notice
//   - brokerage name + logo
//   - agent's TREC license number
// Brokerage confirmed by Skywalker 2026-05-17: Rundog Real Estate Group,
// 401 Congress Ave, Austin. Agent license # still TBD.
const BROKER_INFO = {
  name: "Rundog Real Estate Group",
  brokerAddress: "401 Congress Ave, Austin, TX 78701",
  agentLicense: "[TREC #TBD]",
  iabsUrl: "https://www.trec.texas.gov/sites/default/files/pdf-forms/IABS%201-0.pdf",
  consumerNoticeUrl: "https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-4.pdf",
};

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-auto border-t border-[#1a1716]/10 bg-[#1a1716] text-[#faf6f0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl lg:text-4xl tracking-tight leading-tight">
              Jennifer <em className="italic font-normal">Slade</em>
            </p>
            <p className="editorial text-base lg:text-lg text-[#faf6f0]/70 mt-4 max-w-md leading-relaxed">
              Quiet, deliberate representation for buyers and sellers in Westlake, Tarrytown, Lake Austin, Barton Creek, and the Dripping Springs estates.
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow text-[#faf6f0]/55 mb-5">Navigate</p>
            <ul className="space-y-3 text-[15px] text-[#faf6f0]/85">
              <li><Link href="/" className="link-anim">Home</Link></li>
              <li><Link href="/about" className="link-anim">About</Link></li>
              <li><Link href="/listings" className="link-anim">Portfolio</Link></li>
              <li><Link href="/contact" className="link-anim">Inquire</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow text-[#faf6f0]/55 mb-5">Direct</p>
            <ul className="space-y-3 text-[15px] text-[#faf6f0]/85">
              <li>[Email TBD]</li>
              <li>[Phone TBD]</li>
              <li>{BROKER_INFO.brokerAddress}</li>
            </ul>
          </div>
        </div>

        {/* TREC compliance block */}
        <div className="mt-16 pt-10 border-t border-[#faf6f0]/15 grid md:grid-cols-2 gap-6 text-[12px] tracking-[0.04em] text-[#faf6f0]/65">
          <div>
            <p className="mb-2">Jennifer Slade · {BROKER_INFO.agentLicense}</p>
            <p>Brokered by {BROKER_INFO.name}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <a href={BROKER_INFO.iabsUrl} target="_blank" rel="noopener noreferrer" className="link-anim">TREC Information About Brokerage Services</a>
            <a href={BROKER_INFO.consumerNoticeUrl} target="_blank" rel="noopener noreferrer" className="link-anim">TREC Consumer Protection Notice</a>
          </div>
        </div>

        {/* Equal Housing + Realtor lockup placeholder */}
        <div className="mt-8 flex items-center justify-between text-[11px] tracking-wider uppercase text-[#faf6f0]/45">
          <p>© {new Date().getFullYear()} Jennifer Slade · All rights reserved</p>
          <p className="hidden sm:block">Equal Housing Opportunity · REALTOR®</p>
        </div>
      </div>
    </footer>
  );
}
