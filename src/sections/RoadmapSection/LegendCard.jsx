/** One card in the roadmap legend grid. */
export function LegendCard({ segment, isHovered, onEnter, onLeave, onClick }) {
  return (
    <button
      className="text-left rounded-xl p-3.5 border transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
      style={{
        background:   "var(--surface)",
        borderColor:  isHovered ? "var(--teal)" : "var(--line)",
        boxShadow:    isHovered ? "0 4px 14px rgba(14,140,132,0.12)" : "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="font-mono text-xs mb-1" style={{ color: "var(--ink-faint)" }}>{segment.code}</div>
      <div className="text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>{segment.role}</div>
      <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{segment.org}</div>
      <div className="font-mono text-xs mt-2" style={{ color: "var(--ink-faint)" }}>
        {segment.from} — {segment.to}
      </div>
    </button>
  );
}
