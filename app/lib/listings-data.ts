import type { BrowserListing } from "../components/ListingsBrowser";

// Photo arrays — referenced across Home, /listings, and the dedicated
// portal pages /listings/active /listings/exclusives /listings/sold.
export const HONEY_CREEK_PHOTOS = Array.from({ length: 50 }, (_, i) => `/listings/honey-creek-${i + 1}.jpg`);
export const WESTHILL_PHOTOS    = Array.from({ length: 12 }, (_, i) => `/listings/westhill-${i + 1}.jpg`);
export const CANYONWOOD_PHOTOS  = Array.from({ length: 5 },  (_, i) => `/listings/canyonwood-${i + 1}.jpg`);

// Canonical listing dataset. Verified against Skywalker's 2026-05-17
// intel (Matrix ABOR + Homes.com + Redfin cross-references).
// `region` is the canonical area used for the pill-filter UI in
// ListingsBrowser (groups Horseshoe Bay + Dripping Springs etc.
// under "Hill Country / Lots" per Skywalker's spec).
export const LISTINGS: BrowserListing[] = [
  {
    id: "westhill-south-austin",
    status: "Active",
    title: "2904 Westhill Dr",
    area: "South Austin · 78704",
    region: "South Austin",
    regionLabel: "Austin, TX 78704",
    beds: 5, baths: 4.5, sqft: 3530, acres: 0.21,
    price: "$3,190,000",
    meta: "Built 2025 · MLS 2682180",
    desc: "Modern luxury new build in the heart of Austin's 78704. A 5-bedroom, 4.5-bathroom masterpiece blending architectural sophistication with everyday comfort. Chef's kitchen with 54\" SubZero, Wolf 48\" gas cooktop with separate double oven, quartz waterfall island, and a walk-through pantry with second sink, fridge, and dishwasher. Double-sided fireplace, main-level primary suite with balcony built-in outdoor kitchen overlooking the pool, wraparound putting green, and outdoor fireplace. Second-level living + three bedrooms. Lower level with private entrance — home office, guest retreat, or game room with full bath and direct pool access. Owner will consider owner-finance options.",
    images: WESTHILL_PHOTOS,
  },
  {
    id: "honey-creek-lakeway",
    status: "Active",
    title: "211 Honey Creek Ct #6",
    area: "Lakeway · 78738",
    region: "Lakeway",
    regionLabel: "Lakeway, TX 78738",
    beds: 3, baths: 2.5, sqft: 1903,
    price: "$799,900",
    meta: "MLS 1754607",
    desc: "Santa Barbara-style free-standing residence sitting between two peaceful valleys in a coveted Lakeway enclave — panoramic canyon views and lock-and-leave living. One of just 30 homes in an exclusive two-street community, with vaulted ceilings, his-and-her showers, and a professionally landscaped fully fenced backyard. Four minutes to H-E-B, ten to the Hill Country Galleria.",
    images: HONEY_CREEK_PHOTOS,
  },
  {
    id: "dripping-springs-sold",
    status: "Sold",
    title: "Hill Country Luxury Estate",
    area: "Dripping Springs",
    region: "Hill Country / Lots",
    regionLabel: "Dripping Springs, TX",
    price: "Sold · $2,350,000",
    meta: "Verified Homes.com closing record",
    desc: "Multi-million dollar Dripping Springs closing — representative of Jennifer's track record on hill-country acreage and architectural-luxury transactions.",
  },
  {
    id: "canyonwood-dripping",
    status: "Sold",
    title: "201 N Canyonwood Dr",
    area: "Dripping Springs · 78620",
    region: "Hill Country / Lots",
    regionLabel: "Dripping Springs, TX 78620",
    beds: 8, baths: 6, sqft: 5422, acres: 2,
    price: "Sold · Multi-million",
    meta: "MLS 6012922 · Texas Hill Country resort estate",
    desc: "Resort-style hill country estate on two private acres — main residence, guest wings, and outbuildings totaling approximately 9,000 sqft of conditioned space. Stone-and-metal hill-country vernacular with sunset views, multi-bay garage, smart-home infrastructure, sauna, and gallery-grade interior finishes.",
    images: CANYONWOOD_PHOTOS,
  },
  {
    id: "miss-kitty-horseshoe",
    status: "Active",
    title: "Miss Kitty — Lake Country Acreage",
    area: "Horseshoe Bay",
    region: "Hill Country / Lots",
    regionLabel: "Horseshoe Bay, TX",
    acres: 0.5,
    price: "Inquire",
    meta: "Active land asset · HAR-listed",
    desc: "Build-ready acreage in the Horseshoe Bay lake-country corridor. Western frontage, hill-country views, owner-builder ready.",
  },
  {
    id: "gunsmoke-horseshoe",
    status: "Active",
    title: "Gunsmoke — Lake Country Acreage",
    area: "Horseshoe Bay",
    region: "Hill Country / Lots",
    regionLabel: "Horseshoe Bay, TX",
    acres: 0.5,
    price: "Inquire",
    meta: "Active land asset · HAR-listed",
    desc: "Adjacent build-ready acreage with similar elevation, view orientation, and proximity to Lake LBJ.",
  },
  {
    id: "westlake-ridge",
    status: "Coming Soon",
    title: "Westlake Ridgeline Estate",
    area: "Westlake",
    region: "Westlake",
    regionLabel: "Westlake, TX",
    price: "Price upon request",
    meta: "Specs available on inquiry",
    desc: "Representative Westlake ridgeline opportunity — architecture, view orientation, and lifestyle narrative on inquiry.",
  },
  {
    id: "tarrytown-classic",
    status: "Off-Market",
    title: "Tarrytown Villa with Walled Garden",
    area: "Tarrytown",
    region: "Tarrytown",
    regionLabel: "Tarrytown, TX",
    beds: 4, baths: 5, sqft: 4600, acres: 0.4,
    price: "Inquire privately",
    meta: "Quiet listing · by referral only",
    desc: "Quiet listing — discussed privately under NDA with qualified buyers. Mediterranean-revival vernacular in the heart of Tarrytown's heritage corridor.",
  },
];
