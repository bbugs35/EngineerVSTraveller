import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Map as MapIcon } from "lucide-react";
import { buildRoadLayout } from "../../hooks/useRoadLayout";
import { DesignCanvas } from "./DesignCanvas";
import { JourneyBackdrop } from "./JourneyBackdrop";
import { PitStopCard } from "./PitStopCard";
import { JourneyStatsPanel } from "./JourneyStatsPanel";
import { JourneyOutline } from "./JourneyOutline";
import { MapPopup } from "./MapPopup";
import { PIT_STOP_COLORS } from "../../data/pitStopColors";
import { WORLD_LAYOUT } from "../../data/worldLayout";

/**
 * A full scroll-driven road journey through a list of stops. Every level
 * (the top-level 7 countries, or a single country's places) renders
 * through the exact same code path — for the 7 reference countries, stop
 * positions come from the hand-tuned `worldLayout.js`; for anything else,
 * from the algorithmic (but visually identical in style) positions in
 * `useRoadLayout.js`. There is no separate "nested page" visual style.
 */
export function RoadJourney({ stops, title, subtitle, showStats = true, onSelectStop, onBack }) {
  const [mapOpen, setMapOpen] = useState(false);

  const isReferenceLayout =
    !onBack &&
    stops.length === Object.keys(WORLD_LAYOUT.stops).length &&
    stops.every((s) => WORLD_LAYOUT.stops[s.id]);

  const generic = useMemo(() => buildRoadLayout(stops.length), [stops.length]);
  const canvasWidth = WORLD_LAYOUT.canvasWidth;
  const canvasHeight = isReferenceLayout ? WORLD_LAYOUT.canvasHeight : generic.totalHeight;
  const cardWidth = isReferenceLayout ? WORLD_LAYOUT.cardWidth : generic.cardWidth;
  const compact = !isReferenceLayout;

  return (
    <DesignCanvas width={canvasWidth} height={canvasHeight}>
      <div className="relative w-full h-full overflow-hidden">
        {/* canvasHeight always equals the photo's native height now (both
            modes target 2160 by construction — see useRoadLayout.js), so
            the background never needs to crop/stretch on subpages either. */}
        <JourneyBackdrop height={canvasHeight} exact />
        {/* ⚠️ Lightened for calibration — restore to the previous darker
            gradient (0.18/0.04/0.1/0.4) once back on the real photo. */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,14,18,0.06) 0%, rgba(8,14,18,0.02) 25%, rgba(8,14,18,0.04) 70%, rgba(8,14,18,0.15) 100%)" }}
        />

        {/* Header */}
        <div className="absolute z-20" style={{ left: 52, top: WORLD_LAYOUT.hero.top, width: 480 }}>
          {onBack && (
            <motion.button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full mb-5"
              style={{ background: "rgba(16,26,30,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
              whileHover={{ x: -3 }}
            >
              <ArrowLeft size={13} /> Back
            </motion.button>
          )}
          <motion.h1
            className="text-white uppercase"
            style={{ fontFamily: "'League Gothic', sans-serif", fontWeight: 700, fontSize: 98, lineHeight: 1.02, textShadow: "0 4px 24px rgba(0,0,0,0.6)", letterSpacing: "0.05em", marginLeft: 25, whiteSpace: "pre-line" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 27, marginTop: 12, marginLeft: 25, letterSpacing: "0.08em", color: "#f4c542", textShadow: "0 2px 10px rgba(0,0,0,0.6)", lineHeight: 1.3, whiteSpace: "pre-line" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
          <div style={{ marginTop: 50 }}>
            <JourneyOutline stops={stops} compact={compact} />
          </div>
        </div>

        {showStats && (
          <div className="absolute z-20" style={{ right: WORLD_LAYOUT.stats.right, top: WORLD_LAYOUT.stats.top }}>
            <JourneyStatsPanel />
          </div>
        )}

        {/* Pit stops — one identical rendering path regardless of layout mode */}
        {stops.map((stop, i) => {
          const badge = PIT_STOP_COLORS[i % PIT_STOP_COLORS.length];
          const pos = isReferenceLayout ? WORLD_LAYOUT.stops[stop.id] : generic.stopLayouts[i];
          const cardRight = pos.cardX + cardWidth;
          const lineLeft = pos.side === "left" ? cardRight : pos.dotX;
          const rawLineWidth = pos.side === "left" ? pos.dotX - cardRight : pos.cardX - pos.dotX;
          const lineWidth = Math.max(0, rawLineWidth);

          if (import.meta.env.DEV && rawLineWidth < 0) {
            // This means the dot ended up underneath/behind the card instead
            // of beside it — the exact bug that made left-side waypoints
            // disappear once already. Fix the offending stop's dotX/cardX
            // in worldLayout.js (or useRoadLayout.js for generic stops).
            console.warn(
              `[RoadJourney] "${stop.name}" has an invalid dot/card geometry ` +
              `(side: ${pos.side}, cardX: ${pos.cardX}, dotX: ${pos.dotX}, cardWidth: ${cardWidth}) — ` +
              `the waypoint dot will render underneath the card instead of beside it.`
            );
          }
          return (
            <div key={stop.id}>
              <div
                className="absolute z-[5]"
                style={{ top: pos.dotY, left: lineLeft, width: lineWidth, borderTop: "3px dashed rgba(255,255,255,0.65)", transform: "translateY(-50%)" }}
              />
              <motion.span
                className="absolute z-[6] w-5 h-5 rounded-full border-[3px]"
                style={{ left: pos.dotX, top: pos.dotY, transform: "translate(-50%,-50%)", background: badge.bg, borderColor: "#fff" }}
                animate={{ boxShadow: [`0 0 0px 0px ${badge.bg}66`, `0 0 0 10px ${badge.bg}00`] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="absolute z-10" style={{ left: pos.cardX, top: pos.cardY, width: cardWidth }}>
                <PitStopCard stop={stop} index={i} side={pos.side} onClick={onSelectStop} compact={compact} />
              </div>
            </div>
          );
        })}

        {/* View Map — bottom-left of the canvas */}
        <button
          type="button"
          onClick={() => setMapOpen(true)}
          className="absolute z-20 flex items-center gap-2 font-normal"
          style={{
            left: 35,
            bottom: 105,
            paddingTop: "0.8rem",
            paddingBottom: "0.8rem",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            borderRadius: 5,
            fontSize: "1rem",
            background: "rgba(16,26,30,0.35)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          <MapIcon size={30} /> View Map
        </button>

        <AnimatePresence>
          {mapOpen && <MapPopup onClose={() => setMapOpen(false)} onSelectLocation={onSelectStop} />}
        </AnimatePresence>
      </div>
    </DesignCanvas>
  );
}
