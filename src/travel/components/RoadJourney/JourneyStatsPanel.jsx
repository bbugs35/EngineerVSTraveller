import { Globe, Route, Clock, Infinity as InfinityIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import { TRAVEL_HUD_STATS } from "../../data/travelStats";

const ICONS = { globe: Globe, route: Route, clock: Clock, infinity: InfinityIcon };

function StatRow({ stat, delay }) {
  const finite = Number.isFinite(stat.value);
  const [ref, value] = useCountUp(finite ? stat.value : 0);
  const Icon = ICONS[stat.icon] ?? Globe;

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2.5"
      style={{ paddingTop: "0.9rem", paddingBottom: "0.9rem" }}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Icon size={16} style={{ color: "#f4c542", flexShrink: 0 }} />
      <div>
        <div className="font-mono font-bold text-white leading-none" style={{ fontSize: "1.15rem" }}>
          {finite ? value.toLocaleString() : "∞"}{stat.suffix}
        </div>
        <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
      </div>
    </motion.div>
  );
}

/** Floating "Journey Stats" panel — matches the reference's top-right dashboard. */
export function JourneyStatsPanel() {
  return (
    <motion.div
      className="rounded-2xl p-5 border"
      style={{ width: "11.5rem", background: "rgba(16,26,30,0.75)", backdropFilter: "blur(14px)", borderColor: "rgba(255,255,255,0.14)", boxShadow: "0 20px 44px rgba(0,0,0,0.32)" }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <Globe size={22} style={{ color: "#f4c542", flexShrink: 0 }} />
        <span
          className="font-mono uppercase tracking-widest font-bold leading-tight"
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", whiteSpace: "pre-line" }}
        >
          {"Journey\nStats"}
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.5)" }}>
        {TRAVEL_HUD_STATS.map((stat, i) => (
          <StatRow key={stat.id} stat={stat} delay={0.2 + i * 0.08} />
        ))}
      </div>
    </motion.div>
  );
}
