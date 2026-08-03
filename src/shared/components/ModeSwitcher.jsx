import { motion } from "framer-motion";
import { Code2, Compass } from "lucide-react";

const MODES = [
  { id: "engineer",  label: "Engineer",  Icon: Code2   },
  { id: "traveller", label: "Traveller", Icon: Compass },
];

/**
 * Persistent top bar that lets visitors switch between the two experiences.
 * Sits above both NavBar (Engineer mode) and the full-viewport map
 * (Traveller mode), so it never unmounts when the mode changes.
 */
export function ModeSwitcher({ mode, onChange }) {
  return (
    <div
      className="sticky top-0 z-[70] h-14 flex items-center justify-center border-b"
      style={{
        background:     "rgba(16,42,54,0.92)",
        backdropFilter: "blur(10px)",
        borderColor:    "rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative flex p-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {MODES.map(({ id, label, Icon }) => {
          const isActive = mode === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wide transition-colors duration-200"
              style={{ color: isActive ? "#0f2937" : "rgba(255,255,255,0.7)" }}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#6fd8d0", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={13} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
