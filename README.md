# Bharath Kunamneni — Portfolio

A dual-mode portfolio: an **Engineer** experience and a **Traveller** experience (an interactive Google Maps-based travel storytelling app), switched via a persistent top control.

## Setup

```bash
npm install
cp .env.example .env.local   # then paste your Google Maps API key into .env.local
npm run dev
npm run build
```

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
