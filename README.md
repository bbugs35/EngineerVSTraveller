# Bharath Kunamneni — Portfolio

A dual-mode portfolio: an **Engineer** experience (the original resume
site) and a **Traveller** experience (an interactive Google Maps-based
travel storytelling app), switched via a persistent top control.

## Setup

```bash
npm install
cp .env.example .env.local   # then paste your Google Maps API key into .env.local
npm run dev
npm run build
```

### Google Maps API key — read before deploying

- Get a key at https://console.cloud.google.com/google/maps-apis, enable
  the **Maps JavaScript API**, and put it in `.env.local` as
  `VITE_GOOGLE_MAPS_API_KEY=...`. `.env.local` is gitignored — never commit
  a real key.
- **A client-side Maps key can't be fully hidden** — any browser-based
  Maps integration ships the key to the browser; that's normal and
  unavoidable. The real protection is **restricting** the key in Cloud
  Console: limit it to your production domain(s) (+ `localhost` for dev)
  under "Application restrictions → HTTP referrers", and limit it to only
  the Maps JavaScript API under "API restrictions". Do this before you
  deploy.

## Folder structure

```
src/
├── App.jsx                   Hosts the ModeSwitcher + animated crossfade
│                              between EngineerExperience and TravelExperience.
├── components/
│   ├── ui/                   Shared primitives (Reveal, StatCard, etc.)
│   └── layout/
│       ├── NavBar.jsx        Engineer-mode section nav
│       └── ModeSwitcher.jsx  The Engineer/Traveller segmented toggle
│
├── engineer/
│   └── EngineerExperience.jsx  The original resume portfolio, unchanged —
│                                composes the existing sections/ + NavBar.
├── sections/                 (unchanged) Hero, Skills, Roadmap, Experience,
│                              Education, Contact — see their own folders.
│
├── travel/                   The "Traveller" mode.
│   ├── TravelExperience.jsx  Top-level: map + intro card + story view.
│   ├── data/
│   │   ├── travelLocations.js  All 16 destinations, with a placeholder
│   │   │                       content shape (hero image, summary,
│   │   │                       timeline, photos, videos, facts, stats,
│   │   │                       return plans) — swap the placeholders for
│   │   │                       real content/media whenever you're ready.
│   │   └── mapStyle.js         Custom minimal Google Maps style JSON.
│   ├── hooks/
│   │   └── useGoogleMaps.js    Loads the Maps JS API once (cached across
│   │                           every component that calls it).
│   ├── utils/
│   │   ├── clusterLocations.js Pixel-distance clustering — re-run on every
│   │   │                       map "idle" event, so clusters separate as
│   │   │                       you zoom in (screen distance changes even
│   │   │                       though lat/lng doesn't) and re-merge as you
│   │   │                       zoom out.
│   │   └── createHtmlOverlay.js A google.maps.OverlayView wrapper that
│   │                            positions arbitrary DOM (React-rendered)
│   │                            content at a lat/lng — this is what lets
│   │                            markers be full photo cards instead of
│   │                            default pins, with no Map ID setup needed.
│   └── components/
│       ├── TravelMap.jsx       Orchestrates the map, clustering, and
│       │                       mounting/unmounting overlay content.
│       ├── ClusterMarker.jsx   Stacked overlapping thumbnail cards
│       │                       (Apple Photos map view-inspired).
│       ├── LocationMarker.jsx  Single-destination photo card marker.
│       └── StoryView/          The full-screen destination takeover,
│           ├── StoryView.jsx     opened by clicking a marker: hero image,
│           ├── StoryHero.jsx     summary, timeline, photo grid, video
│           ├── StoryTimeline.jsx highlights, a locator mini-map, facts,
│           ├── StoryPhotoGrid.jsx stats, and "next time" plans.
│           ├── StoryVideos.jsx
│           ├── StoryMiniMap.jsx
│           ├── StoryFacts.jsx
│           ├── StoryStats.jsx
│           └── StoryFuturePlans.jsx
│
├── hooks/
│   ├── useReveal.js           Scroll-triggered fade/slide-in (shared).
│   └── useActiveSection.js    Engineer-mode scrollspy for NavBar.
│
├── data/resumeData.js         All resume content (Engineer mode).
└── styles/globals.css         Design tokens, fonts, keyframes, Tailwind.
```

## The road journey

**This went through a redesign after the first real screenshot showed the
core problem clearly**: tiling one photo down a multi-thousand-pixel page
repeats the exact same curve every ~700px (obviously broken, like a
stretched wallpaper), and since the jeep moved in a straight line while
the *photo's* baked-in road curved independently, the jeep visibly floated
off the road half the time. Fix: the photo is now used exactly **once**,
as a strong opening hero moment, and the road itself is drawn directly
(gradient asphalt, animated dashed line, soft shoulders) — perfectly
straight, so the jeep is *guaranteed* to sit on it, not "usually close."

```
TravelExperience.jsx        Owns a navigation *stack*: [{stops, title, subtitle}].
└── RoadJourney/             Renders ONE level of the stack — same component
    ├── RoadJourney.jsx        for the 7 countries or a country's places.
    ├── useRoadLayout.js      Straight vertical layout: one stop per segment.
    ├── TerrainBand.jsx       Layered gradient + horizon silhouette per
    │   ├── TerrainSilhouette.jsx  terrain (mountain peaks / treeline / dunes /
    │   └── TerrainParticles.jsx   waves), with CSS-only particles on top.
    │                          The FIRST band only uses the real photo.
    ├── RoadStrip.jsx         The road surface — drawn, not photographed:
    │                          asphalt gradient, animated dashed center
    │                          line, soft shoulders, grain texture.
    ├── RoadCar.jsx           Your jeep.png, centered on RoadStrip exactly
    │                          (same `left-1/2` anchor), moving straight
    │                          down via scroll progress + an idle bounce.
    ├── PitStopCard.jsx       Redesigned: bigger (340px), glass-morphic,
    │                          clearer hierarchy, terrain-colored accents.
    └── JourneyStatsPanel.jsx  Floating stats panel, top level only.
```

### Why the photo isn't tiled anymore
A single photo repeated to cover a page that's often 5,000–8,000px tall
will always look like a stretched wallpaper — there's no crop/tint trick
that fixes that, because the underlying problem is "not enough source
image," not styling. The fix was architectural, not cosmetic: one
real photographic moment at the very top, then a custom-drawn (but far
more detailed than the original attempt) road and terrain system for the
rest of the scroll — richer gradients, horizon silhouettes per terrain,
grain texture, and a road surface with actual shading rather than a flat
stroke. If/when you have more real photography (or real drone footage —
`coverVideo` is already wired up), each additional photo can become
another one-time hero moment the same way, at any stop, not just the first.

### Extending a country's road
Every country follows the same `places[]` shape (see
`travel/data/travelLocations.js`) — `id`, `order`, `name`, `terrain`,
`dateRange`, `distanceKm`, `days`, `videos[]`, `photos[]`. **India** (9
places: Goa → Kerala → Tamil Nadu → Karnataka → Leh → Zanskar → Kashmir →
Kedarkantha Trek → Chadar Trek) and **Kazakhstan** (8 places: Almaty → Big
Almaty Lake → Shymbulak → Charyn Canyon → Moon Canyon → Kaindy Lake →
Kolsai Lake → Altyn Emel) are fully built out to your specified routes.
Vietnam, Malaysia, Singapore, Abu Dhabi, and Georgia currently have no
`places[]`, so clicking them opens their video directly instead of
continuing the road — add a `places` array to any of them the same way
to give them their own multi-stop journey.

## Video-first, and the map as a fallback

### Video-first, not photo-first
Every place/destination's primary content is a video (`videos[]`);
photos are secondary and shown as a small strip inside the lightbox, not
a separate top-level gallery. `videos[].src` is `null` until you add a
real file — until then, the lightbox shows the poster image with a
"Video coming soon" label instead of a broken player.

### Why placeholder photos are still `picsum.photos`, not Unsplash/Pexels
Picsum is an explicitly-licensed placeholder-image service — safe to
depend on long-term. Hotlinking specific photos found via search isn't:
those URLs aren't guaranteed stable, and it bakes someone else's specific
photograph into your codebase without a real license. Instead, every
travel photo/video carries a shared **`.grade` CSS filter** (see
`globals.css`) — a consistent saturation/contrast/warmth treatment that
unifies a grid of otherwise-random placeholder photos into one deliberate
look, and will look just as intentional on your real photos once you
swap them in.

### The map
`TravelMapSection.jsx` (map + clustering + `TravelHUD`) is unchanged from
before, just relocated to a secondary section beneath the road journey,
titled "Or browse everything at once."

## How the overview map's clustering works

Rather than a fixed geographic radius, `clusterLocations.js` groups
destinations by their **pixel distance apart at the current zoom level**.
Two cities that are 40px apart on screen at zoom 3 might be 400px apart
at zoom 6 — so the same two points automatically split into separate
cards as you zoom in, and merge back into one stacked card as you zoom
out, without any manual logic for "which zoom level shows what." Each
cluster/location is rendered as real React content via a custom
`OverlayView` that mounts a `react-dom/client` root at the right lat/lng
— that's what makes hover-lift/scale/shadow just work as plain CSS.

**One honest simplification:** when a cluster on the map splits apart on
zoom, new cards pop in at their final position rather than visibly flying
out from the old cluster. True per-marker "this thumbnail flies from A to
B" motion needs identity-tracking across re-clusters — a meaningfully
bigger build, and a reasonable next step if you want to push further.


