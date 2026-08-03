// Placeholder photos/video posters — deterministic (same seed = same image
// every reload). A shared "cinematic grade" CSS filter (see globals.css /
// .grade) unifies these into one consistent look; swap the URLs for your
// real photos/videos whenever you're ready.
const photo = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const placeholderFacts = [
  "Placeholder fact — swap in something genuinely interesting about this place.",
  "Placeholder fact — a local custom, food, or bit of trivia.",
  "Placeholder fact — something that surprised you while you were there.",
];

const placeholderStats = [
  { value: "—", label: "Duration" },
  { value: "—", label: "Distance traveled" },
  { value: "—", label: "Temperature / Altitude" },
  { value: "—", label: "Gear used" },
];

function makePlace({ id, order, name, terrain, dateRange, distanceKm, days, note, lat, lng, videoCount = 1, photoCount = 2 }) {
  return {
    id, order, name, terrain, dateRange,
    distanceKm, days,
    lat, lng,
    note: note ?? `Placeholder — replace with what actually happened at ${name}.`,
    thumbnail: photo(`${id}-thumb`, 500, 500),
    videos: Array.from({ length: videoCount }, (_, i) => ({
      id: `${id}-v${i + 1}`,
      title: `${name} — drone clip ${i + 1}`,
      poster: photo(`${id}-video-${i + 1}`, 900, 500),
      src: null,
    })),
    photos: Array.from({ length: photoCount }, (_, i) => photo(`${id}-photo-${i + 1}`, 700, 700)),
  };
}

function makeDestination({
  id, name, terrain, lat, lng, tagline, experienceTag,
  dateRange, distanceKm, days,
  places, stats, facts, summary,
}) {
  const coverVideo = null; // drop a real drone-reel URL/path here, e.g. "/videos/kazakhstan-drone.mp4"
  return {
    id,
    name,
    terrain,        // "mountain" | "forest" | "desert" | "beach" — drives the road's terrain zone
    coordinates: { lat, lng },
    tagline,
    dateRange,       // e.g. "Jan – Apr 2024" — shown on the pit-stop card
    distanceKm,
    days,
    order: 1,        // so a single-stop destination is also valid input to PlaceVideoLightbox
    note: tagline,
    experienceTag: experienceTag ?? "Placeholder — e.g. \"6 days · Solo trip · 400 km driven\"",
    coverImage: photo(`${id}-cover`, 1600, 900),
    coverVideo,
    thumbnail: photo(`${id}-thumb`, 400, 400),
    summary: summary ?? (
      `Placeholder summary for ${name}. Replace this with a short, punchy ` +
      `paragraph about the trip — why you went, what it was like, and what ` +
      `made it memorable.`
    ),
    // The journey through this destination, place by place, in visiting
    // order — clicking this destination's pit stop continues the SAME
    // road, now built from these places. Destinations without their own
    // breakdown yet (empty array) are treated as a single leaf stop
    // instead — see `videos`/`photos` below, which make that work.
    places: places ?? [],
    // Present at the destination level too (not just on places) so a
    // destination with no places[] can still open directly in the video
    // lightbox when clicked, instead of only ever "continuing the road."
    videos: [{ id: `${id}-cover-video`, title: `${name} — Highlights`, poster: photo(`${id}-video`, 900, 500), src: coverVideo }],
    photos: [photo(`${id}-p1`, 700, 700), photo(`${id}-p2`, 700, 700)],
    facts: facts ?? placeholderFacts,
    stats: stats ?? placeholderStats,
    returnPlans:
      `Placeholder — note what you'd want to do differently or explore ` +
      `next time you're back in ${name}.`,
  };
}

export const TRAVEL_LOCATIONS = [
  makeDestination({
    id: "india", name: "India", terrain: "mountain",
    lat: 28.6139, lng: 77.2090,
    tagline: "Beaches to the Himalayas",
    dateRange: "Jan – Apr 2024", distanceKm: 8750, days: 72,
    experienceTag: "72 days · 9 places · Coast to Himalaya",
    places: [
      makePlace({ id: "goa",         order: 1, name: "Goa",             terrain: "beach",    dateRange: "Jan 2024", distanceKm: 0,    days: 6,  lat: 15.2993, lng: 74.1240 }),
      makePlace({ id: "kerala",      order: 2, name: "Kerala",          terrain: "beach",    dateRange: "Jan 2024", distanceKm: 640,  days: 8,  lat: 9.9312,  lng: 76.2673 }),
      makePlace({ id: "tamil-nadu",  order: 3, name: "Tamil Nadu",      terrain: "forest",   dateRange: "Feb 2024", distanceKm: 420,  days: 7,  lat: 11.4102, lng: 76.6950 }),
      makePlace({ id: "karnataka",   order: 4, name: "Karnataka",       terrain: "forest",   dateRange: "Feb 2024", distanceKm: 260,  days: 6,  lat: 12.3375, lng: 75.8069 }),
      makePlace({ id: "leh",         order: 5, name: "Leh",             terrain: "mountain", dateRange: "Mar 2024", distanceKm: 2450, days: 10, lat: 34.1526, lng: 77.5771 }),
      makePlace({ id: "zanskar",     order: 6, name: "Zanskar",         terrain: "mountain", dateRange: "Mar 2024", distanceKm: 240,  days: 9,  lat: 33.4636, lng: 76.8994 }),
      makePlace({ id: "kashmir",     order: 7, name: "Kashmir",         terrain: "mountain", dateRange: "Mar 2024", distanceKm: 480,  days: 8,  lat: 34.0837, lng: 74.7973 }),
      makePlace({ id: "kedarkantha", order: 8, name: "Kedarkantha Trek", terrain: "mountain", dateRange: "Apr 2024", distanceKm: 610,  days: 6,  lat: 31.0575, lng: 78.2226 }),
      makePlace({ id: "chadar",      order: 9, name: "Chadar Trek",     terrain: "mountain", dateRange: "Apr 2024", distanceKm: 590,  days: 12, lat: 33.7500, lng: 77.0000 }),
    ],
  }),

  makeDestination({
    id: "vietnam", name: "Vietnam", terrain: "forest",
    lat: 21.0278, lng: 105.8342,
    tagline: "Hanoi's old quarter and beyond",
    dateRange: "May 2024", distanceKm: 2150, days: 18,
  }),

  makeDestination({
    id: "malaysia", name: "Malaysia", terrain: "forest",
    lat: 3.1390, lng: 101.6869,
    tagline: "Kuala Lumpur's skyline and street food",
    dateRange: "Jun 2024", distanceKm: 1800, days: 12,
  }),

  makeDestination({
    id: "singapore", name: "Singapore", terrain: "beach",
    lat: 1.3521, lng: 103.8198,
    tagline: "Gardens, skyline, and precision",
    dateRange: "Jun 2024", distanceKm: 300, days: 4,
  }),

  makeDestination({
    id: "abu-dhabi", name: "Abu Dhabi", terrain: "desert",
    lat: 24.4539, lng: 54.3773,
    tagline: "Desert meets modern architecture",
    dateRange: "Jul 2024", distanceKm: 1250, days: 7,
  }),

  makeDestination({
    id: "georgia", name: "Georgia", terrain: "mountain",
    lat: 41.7151, lng: 44.8271,
    tagline: "Tbilisi's old town and mountains",
    dateRange: "Sep – Oct 2024", distanceKm: 2900, days: 21,
  }),

  // Flagship example — fully fleshed out, place by place.
  makeDestination({
    id: "kazakhstan", name: "Kazakhstan", terrain: "mountain",
    lat: 43.2220, lng: 76.8512,
    tagline: "A winter road trip through the Tian Shan",
    dateRange: "Dec 2024 – Jan 2025", distanceKm: 2300, days: 16,
    experienceTag: "16 days · Road trip · 2,300 km driven · −18°C · DJI Air 3S",
    summary:
      "Sixteen days, one rental car, and a route that kept climbing higher " +
      "into the Tian Shan — from Almaty's grid of snow-dusted streets out to " +
      "frozen canyons, a sunken forest, and singing dunes at the edge of the " +
      "steppe. First real snow drive of my life.",
    places: [
      makePlace({ id: "almaty",          order: 1, name: "Almaty",          terrain: "forest",  dateRange: "Day 1–2",  distanceKm: 0,    days: 2, lat: 43.2220, lng: 76.8512 }),
      makePlace({ id: "big-almaty-lake", order: 2, name: "Big Almaty Lake",  terrain: "mountain", dateRange: "Day 3",   distanceKm: 45,   days: 1, lat: 43.0508, lng: 76.9853 }),
      makePlace({ id: "shymbulak",       order: 3, name: "Shymbulak",        terrain: "mountain", dateRange: "Day 4",   distanceKm: 25,   days: 1, lat: 43.1554, lng: 77.0784 }),
      makePlace({ id: "charyn-canyon",   order: 4, name: "Charyn Canyon",    terrain: "desert",   dateRange: "Day 6",   distanceKm: 200,  days: 1, lat: 43.2000, lng: 79.0667 }),
      makePlace({ id: "moon-canyon",     order: 5, name: "Moon Canyon",      terrain: "desert",   dateRange: "Day 6",   distanceKm: 15,   days: 1, lat: 43.2120, lng: 79.0780 }),
      makePlace({ id: "kaindy-lake",     order: 6, name: "Kaindy Lake",      terrain: "forest",   dateRange: "Day 8",   distanceKm: 180,  days: 1, lat: 42.9853, lng: 78.4353 }),
      makePlace({ id: "kolsai-lake",     order: 7, name: "Kolsai Lake",      terrain: "forest",   dateRange: "Day 9",   distanceKm: 30,   days: 1, lat: 42.9333, lng: 78.3167 }),
      makePlace({ id: "altyn-emel",      order: 8, name: "Altyn Emel",       terrain: "desert",   dateRange: "Day 12",  distanceKm: 270,  days: 2, lat: 44.1900, lng: 78.6500 }),
    ],
    stats: [
      { value: "16",         label: "Days on the road" },
      { value: "2,300",      label: "Km driven" },
      { value: "−18°C",      label: "Lowest temperature" },
      { value: "DJI Air 3S", label: "Camera / drone" },
    ],
    facts: [
      "Placeholder — the first time driving in real snow and ice.",
      "Placeholder — something about Kazakh road-trip culture or logistics.",
      "Placeholder — a specific moment from Moon Canyon or Altyn Emel worth calling out.",
    ],
  }),
];
