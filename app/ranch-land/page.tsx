import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Ranch + Land — Jennifer Slade Luxury Real Estate",
  description: "Hill country estates, ranch acreage, equestrian properties, and waterfront land across Dripping Springs, Wimberley, and the Texas Hill Country west of Austin.",
};

const PROPERTY_TYPES = [
  { eyebrow: "Equestrian", title: "Working Horse Properties", desc: "Improved acreage with barns, riding rings, trail networks, and proximity to the Austin equestrian circuit." },
  { eyebrow: "Vineyard",   title: "Hill Country Vineyards",   desc: "Producing and prospective acreage along the 290 wine corridor — tasting-room potential, water rights, and gentle slopes." },
  { eyebrow: "Waterfront", title: "Pedernales & Blanco Frontage", desc: "Riverfront and lakefront acreage with private access points, swim holes, and the privacy that defines the region." },
  { eyebrow: "Conservation", title: "Wildlife Exemption Acreage", desc: "Multi-hundred-acre tracts with active wildlife management plans — protected, productive, and tax-advantaged." },
];

const REGIONS = [
  { name: "Dripping Springs",   desc: "Twenty-minute commute to Westlake, ten minutes to highway 290 wineries, and some of the most-respected hill-country acreage in the state." },
  { name: "Wimberley",          desc: "The slower side of the hill country — artist enclaves, the Blanco riverfront, and acreage with less commuter pressure." },
  { name: "Spicewood",          desc: "Lake Travis-adjacent ranch country with shoreline, marinas, and golf course-front estate options." },
  { name: "Bee Cave / Lakeway", desc: "Closer-in ranch transitions — Hill Country atmosphere without the longer drive into Austin proper." },
];

export default function RanchLandPage() {
  return (
    <main className="relative z-[2] min-h-screen text-[#1a1716]">
      <Nav />

      <section className="relative w-full min-h-[70svh] -mt-[68px] overflow-hidden bg-[#0f0c0a] text-[#faf6f0]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 25% 25%, rgba(201,168,119,0.18), transparent 60%)," +
              "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(50,40,30,0.55), transparent 65%)," +
              "linear-gradient(155deg, #0f0c0a 0%, #1a1413 60%, #0a0807 100%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-24 min-h-[70svh] flex flex-col justify-center">
          <p className="eyebrow text-[#c9a877] mb-6">Ranch + Land</p>
          <h1 className="display text-[#faf6f0] text-[12vw] sm:text-[9vw] lg:text-[8vw] xl:text-[140px] leading-[0.92] max-w-5xl">
            The hill country, <em className="italic">considered.</em>
          </h1>
          <p className="editorial text-[#faf6f0]/85 text-xl lg:text-2xl max-w-2xl mt-10 leading-relaxed">
            Acreage representation across Dripping Springs, Wimberley, Spicewood, and the rest of the Austin hill country — equestrian, vineyard, conservation, and waterfront.
          </p>
        </div>
      </section>

      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#8d6f4f] mb-4">Property categories</p>
          <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-14">
            Four ways to <em className="italic">own land here.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-14">
            {PROPERTY_TYPES.map((p) => (
              <div key={p.eyebrow}>
                <p className="eyebrow text-[#c9a877] mb-3">{p.eyebrow}</p>
                <h3 className="display text-[#1a1716] text-2xl lg:text-3xl leading-tight">{p.title}</h3>
                <p className="editorial text-[#1a1716]/75 text-lg mt-4 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1716] text-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="eyebrow text-[#c9a877] mb-4">Regions</p>
          <h2 className="display text-[#faf6f0] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-14">
            Where the <em className="italic">land sits.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-[#faf6f0]/15">
            {REGIONS.map((r) => (
              <div key={r.name} className="bg-[#1a1716] p-8 lg:p-10 min-h-[220px] hover:bg-[#0f0c0a] transition-colors">
                <p className="font-serif text-3xl text-[#faf6f0] leading-tight">{r.name}</p>
                <p className="editorial text-base text-[#faf6f0]/75 mt-4 leading-relaxed">{r.desc}</p>
                <div className="h-px w-12 bg-[#c9a877] mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf6f0] py-24 lg:py-32 px-6 lg:px-12 text-center">
        <p className="eyebrow text-[#8d6f4f] mb-5">Begin</p>
        <h2 className="display text-[#1a1716] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl mx-auto">
          Looking at acreage? <em className="italic">Quietly inquire.</em>
        </h2>
        <Link href="/contact" className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full bg-[#1a1716] text-[#faf6f0] text-[11.5px] tracking-[0.2em] uppercase font-medium hover:bg-[#3a2f23] transition-colors">
          Request a Consultation <span aria-hidden>→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
