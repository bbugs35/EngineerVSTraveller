import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RoadJourney } from "./components/RoadJourney";
import { PlaceVideoLightbox } from "./components/DestinationJourney/PlaceVideoLightbox";
import { TRAVEL_LOCATIONS } from "./data/travelLocations";

const ROOT_LEVEL = {
  stops: TRAVEL_LOCATIONS,
  title: "The World\nIs My Road",
  subtitle: "Every mile, a memory.\nEvery turn, a new story.",
};

/**
 * The "Traveller" mode — a scroll-driven road journey. Clicking a country
 * pit stop pushes a new level onto the navigation stack, scoped to that
 * country's places; the SAME RoadJourney component renders it, so "the
 * road continues" is literal, not a metaphor for a page transition.
 * Clicking a leaf place (no further sub-places) opens its video instead.
 * The map is reachable from a "View Map" button inside each journey's
 * canvas (bottom-left), opening as an in-canvas popup — there's no
 * separate page section below the journey anymore.
 */
export function TravelExperience() {
  const [stack, setStack] = useState([ROOT_LEVEL]);
  const [activePlace, setActivePlace] = useState(null);
  const current = stack[stack.length - 1];

  const handleSelectStop = useCallback((stop) => {
    if (stop.places && stop.places.length > 0) {
      // Two lines, same rhythm as the main page's subtitle — line 1 is
      // the tagline, line 2 is the trip's headline stat, instead of a
      // single-line tagline that broke the visual match with the main page.
      const subtitle = stop.experienceTag
        ? `${stop.tagline}\n${stop.experienceTag}`
        : stop.tagline;
      setStack((prev) => [
        ...prev,
        { stops: stop.places, title: stop.name, subtitle, parentStop: stop },
      ]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActivePlace(stop);
    }
  }, []);

  const handleBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stack.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RoadJourney
            stops={current.stops}
            title={current.title}
            subtitle={current.subtitle}
            showStats={stack.length === 1}
            onSelectStop={handleSelectStop}
            onBack={stack.length > 1 ? handleBack : null}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {activePlace && <PlaceVideoLightbox place={activePlace} onClose={() => setActivePlace(null)} />}
      </AnimatePresence>
    </div>
  );
}
