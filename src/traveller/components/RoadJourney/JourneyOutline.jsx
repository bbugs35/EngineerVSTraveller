import { motion } from "framer-motion";

const ICON_SLOT_WIDTH = "2.9rem";

/** A pulsing dot matching the pit-stop waypoint markers exactly (size + glow animation). */
function TimelineDot({ color, filled }) {
  return (
    <motion.span
      className="relative z-10 w-5 h-5 rounded-full"
      style={{
        background: filled ? color : "rgba(16,26,30,0.6)",
        border: `3px solid ${filled ? "#fff" : color}`,
      }}
      animate={{ boxShadow: [`0 0 0px 0px ${color}66`, `0 0 0 10px ${color}00`] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/**
 * Centers a marker (the start/continues dots) within a slot the same
 * width as the country thumbnails, so its center lands exactly on the
 * dashed line regardless of the marker's own size — previously the dot
 * was a bare flex child, so its 20px width centered at 10px instead of
 * the 23px (half of 2.9rem) where the dashed line actually sits.
 */
function IconSlot({ children }) {
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: ICON_SLOT_WIDTH }}>
      {children}
    </div>
  );
}

/** The full stop list on the left of the header — START, every stop, then "journey continues". */
export function JourneyOutline({ stops, compact = false }) {
  const nameFontSize = compact ? 18.9 : 21; // 10% smaller on subpages only

  return (
    <motion.div
      className="relative max-w-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="absolute left-[23px] top-5 bottom-5 border-l-2 border-dashed" style={{ borderColor: "rgba(255,255,255,0.3)" }} />

      <div className="relative flex items-center gap-4" style={{ marginBottom: 50 }}>
        <IconSlot><TimelineDot color="#f4c542" filled /></IconSlot>
        <span className="font-mono text-sm font-bold uppercase tracking-widest" style={{ color: "#f4c542" }}>Start</span>
      </div>

      {stops.map((stop) => (
        <div key={stop.id} className="relative flex items-center gap-4" style={{ marginBottom: 60 }}>
          <img
            src={stop.thumbnail}
            alt=""
            className="relative z-10 object-cover grade flex-shrink-0"
            style={{ width: "2.9rem", height: "3.9rem", borderRadius: "1.5rem", border: "2px solid rgba(255,255,255,0.85)" }}
          />
          <div className="min-w-0">
            <div
              className="text-white leading-tight truncate uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: nameFontSize, letterSpacing: "0.06em", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
            >
              {stop.name}
            </div>
            <div className="mt-0.5" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>{stop.dateRange}</div>
          </div>
        </div>
      ))}

      <div className="relative flex items-center gap-4">
        <IconSlot><TimelineDot color="rgba(255,255,255,0.55)" /></IconSlot>
        <span className="uppercase leading-snug" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>The journey<br />continues…</span>
      </div>
    </motion.div>
  );
}
