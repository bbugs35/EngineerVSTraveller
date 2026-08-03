import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { PIT_STOP_COLORS } from "../../data/pitStopColors";

// Subpages render at 10% smaller card/thumbnail/title dimensions than the
// main page — the main page's values are untouched (still hardcoded
// below), these are only used when `compact` is true.
const SIZES = {
  main:    { cardW: 345, cardH: 255, stackW: 154, stackH: 184, thumbW: 135, thumbH: 165, thumbOffset: 15, nameSize: 25 },
  compact: { cardW: 310, cardH: 230, stackW: 139, stackH: 166, thumbW: 122, thumbH: 149, thumbOffset: 14, nameSize: 22.5 },
};

/**
 * A pit stop along the road. Two-column layout, 60% photo cluster / 40%
 * text — mirrored for "left" stops (cluster on the right, text on the
 * left) so cards visually face toward the road regardless of which side
 * they sit on. The text column uses justify-between across exactly 3
 * children (badge / name-date-stats / button) so the badge always
 * touches the top padding edge and the button always touches the
 * bottom padding edge, with the middle content vertically centered in
 * whatever room is left between them.
 */
export function PitStopCard({ stop, index, side, onClick, compact = false }) {
  const badge = PIT_STOP_COLORS[index % PIT_STOP_COLORS.length];
  const [front, back] = [stop.thumbnail, stop.photos?.[0] ?? stop.thumbnail];
  const s = compact ? SIZES.compact : SIZES.main;

  return (
    <motion.button
      type="button"
      onClick={() => onClick(stop)}
      initial={{ opacity: 0, x: side === "left" ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left"
      style={{
        maxWidth: s.cardW,
        height: s.cardH,
        padding: "1.4rem",
        borderRadius: 20,
        background: "rgba(12,16,18,0.55)",
        backdropFilter: "blur(20px) saturate(1.1)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: "0 20px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex h-full" style={{ flexDirection: side === "left" ? "row-reverse" : "row", gap: 12 }}>
        {/* Photo cluster — 60% */}
        <div style={{ width: "calc(60% - 6px)" }} className="flex items-center justify-center">
          <div className="relative" style={{ width: s.stackW, height: s.stackH }}>
            <img
              src={back}
              alt=""
              className="absolute rounded-xl object-cover grade"
              style={{ width: s.thumbW, height: s.thumbH, top: s.thumbOffset, left: s.thumbOffset, transform: "rotate(7deg)", border: "3px solid rgba(255,255,255,0.85)", boxShadow: "0 6px 16px rgba(0,0,0,0.3)" }}
            />
            <img
              src={front}
              alt=""
              className="absolute rounded-xl object-cover grade"
              style={{ width: s.thumbW, height: s.thumbH, top: 0, left: 0, transform: "rotate(-4deg)", border: "3px solid #fff", boxShadow: "0 8px 18px rgba(0,0,0,0.4)", zIndex: 2 }}
            />
          </div>
        </div>

        {/* Text — 40% — badge touches top edge, button touches bottom edge */}
        <div style={{ width: "calc(40% - 6px)" }} className="h-full flex flex-col justify-between min-w-0">
          <span
            className="inline-block font-mono font-bold uppercase tracking-wide px-2 py-1 self-start"
            style={{ fontSize: 12, borderRadius: 5, background: badge.bg, color: badge.text }}
          >
            Pit Stop {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col gap-2">
            <h3
              className="text-white leading-tight uppercase"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 200, fontSize: s.nameSize, letterSpacing: "0.035em" }}
            >
              {stop.name}
            </h3>
            {stop.dateRange && (
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{stop.dateRange}</p>
            )}
            <div className="flex flex-col gap-1.5" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
              {typeof stop.distanceKm === "number" && (
                <span className="flex items-center gap-2"><MapPin size={18} /> {stop.distanceKm.toLocaleString()} km</span>
              )}
              {typeof stop.days === "number" && (
                <span className="flex items-center gap-2"><Clock size={18} /> {stop.days} {stop.days === 1 ? "day" : "days"}</span>
              )}
            </div>
          </div>

          <span
            className="flex items-center justify-center gap-1 py-1.5 rounded-full font-semibold"
            style={{ fontSize: 11, background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.16)" }}
          >
            View Journey <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
