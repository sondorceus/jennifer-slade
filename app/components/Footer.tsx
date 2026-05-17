import Link from "next/link";

// TREC compliance — verified against Skywalker's 2026-05-17 guidance:
//   - Brokerage name/logo must be visible (≥50% of largest contact info)
//   - IABS + Consumer Protection Notice links with EXACT labels per TREC
//   - Equal Housing Opportunity + REALTOR® marks
//   - Sponsoring broker chain disclosed: Rundog under Premier Texas Realty
//   - Jennifer Slade · TREC License #0828933 · 401 Congress Ave, Austin
const BROKER_INFO = {
  agencyName: "Rundog Real Estate Group, LLC",
  sponsoringBroker: "Premier Texas Realty",
  brokerAddress: "401 Congress Ave, Austin, TX 78701",
  agentLicense: "TREC #0828933",
  // Exact TREC labels — these are the compliance-required wording.
  iabsLabel:           "Texas Real Estate Commission Information About Brokerage Services",
  consumerNoticeLabel: "Texas Real Estate Commission Consumer Protection Notice",
  // Jennifer's COMPLETED IABS PDF (per Skywalker 2026-05-17 — supplied
  // via Google Drive, downloaded to public/legal/ on 2026-05-17 so we
  // serve it from our own domain rather than Drive). 531KB, PDF v1.6,
  // pre-filled with Rundog Real Estate Group / Premier Texas Realty
  // brokerage details per TREC compliance requirements.
  iabsUrl:           "/legal/iabs-jennifer-slade.pdf",
  consumerNoticeUrl: "https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-4.pdf",
};

// SVG renditions of the federal Equal Housing Opportunity mark and
// the NAR REALTOR® block-R mark. Compact, tinted to match the dark
// footer. The actual official files require NAR / HUD download — these
// are recognizable stand-ins acceptable for staging. Final production
// build should swap in the official artwork that Jennifer has on file.
function EqualHousingMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* House outline */}
      <path d="M16 28L40 8L64 28V60H16V28Z" strokeLinejoin="round" />
      {/* Equal sign inside */}
      <line x1="28" y1="42" x2="52" y2="42" />
      <line x1="28" y1="48" x2="52" y2="48" />
    </svg>
  );
}

function RealtorMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className}>
      {/* Block "R" inside a rounded badge */}
      <rect x="6" y="4" width="56" height="56" rx="6" fill="currentColor" />
      <text x="34" y="44" textAnchor="middle" fontFamily="Helvetica, Arial Black, sans-serif" fontWeight="900" fontSize="36" fill="#1a1716">R</text>
      {/* ® registered-trademark mark to the right */}
      <circle cx="70" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="70" y="18" textAnchor="middle" fontFamily="Helvetica, sans-serif" fontWeight="700" fontSize="8" fill="currentColor">R</text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-auto border-t border-[#1a1716]/10 bg-[#1a1716] text-[#faf6f0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl lg:text-4xl tracking-tight leading-tight">
              Jennifer <em className="italic font-normal">Slade</em>
            </p>
            {/* Brokerage lockup — official Rundog wordmark + sponsor chain.
                Logo is inverted to white-on-dark via CSS so we don't need
                to host a separate light variant. Size is ~50% of the
                Jennifer Slade serif name above, satisfying the TREC
                proportionality rule. */}
            <div className="mt-6">
              <img
                src="/rundog-logo.png"
                alt={BROKER_INFO.agencyName}
                className="h-12 lg:h-14 w-auto"
                style={{ filter: "invert(1) brightness(1.05)" }}
              />
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#faf6f0]/55 mt-3">
                Sponsored by {BROKER_INFO.sponsoringBroker}
              </p>
            </div>
            <p className="editorial text-base lg:text-lg text-[#faf6f0]/70 mt-6 max-w-md leading-relaxed">
              Quiet, deliberate representation for buyers and sellers in Westlake, Tarrytown, Lakeway, Lake Austin, Barton Creek, and the Dripping Springs hill country.
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

        {/* TREC compliance block — exact label wording per TREC rules. */}
        <div className="mt-16 pt-10 border-t border-[#faf6f0]/15 grid md:grid-cols-2 gap-8 text-[12px] tracking-[0.04em] text-[#faf6f0]/65">
          <div>
            <p className="mb-1">Jennifer Slade · {BROKER_INFO.agentLicense}</p>
            <p>
              Licensed real estate agent in the State of Texas with
              {" "}{BROKER_INFO.agencyName}.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a href={BROKER_INFO.iabsUrl} target="_blank" rel="noopener noreferrer" className="link-anim">
              {BROKER_INFO.iabsLabel}
            </a>
            <a href={BROKER_INFO.consumerNoticeUrl} target="_blank" rel="noopener noreferrer" className="link-anim">
              {BROKER_INFO.consumerNoticeLabel}
            </a>
          </div>
        </div>

        {/* Equal Housing + REALTOR® lockup + copyright */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-[#faf6f0]/55">
            <div className="flex items-center gap-2">
              <EqualHousingMark className="w-8 h-8 text-[#faf6f0]/55" />
              <span className="text-[10px] tracking-[0.22em] uppercase leading-tight max-w-[110px]">Equal Housing<br />Opportunity</span>
            </div>
            <div className="flex items-center gap-2">
              <RealtorMark className="w-8 h-8 text-[#faf6f0]/55" />
              <span className="text-[10px] tracking-[0.22em] uppercase">REALTOR<sup className="text-[7px]">®</sup></span>
            </div>
          </div>
          <p className="text-[11px] tracking-wider uppercase text-[#faf6f0]/40">
            © {new Date().getFullYear()} Jennifer Slade · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
