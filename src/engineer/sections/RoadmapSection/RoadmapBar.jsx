/** Horizontal tenure bar. */
export function RoadmapBar({ segments, hoveredCode, onHover, onSegmentClick }) {
  return (
    <div
      className="flex h-12 rounded-xl overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--surface-alt)" }}
    >
      {segments.map((seg) => {
        const current  = seg.status === "current";
        const hovered  = hoveredCode === seg.code;
        return (
          <button
            key={seg.code}
            className="relative h-full flex items-center justify-center border-r last:border-r-0 border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-1"
            style={{
              width:     `${seg.width}%`,
              background: current
                ? "linear-gradient(180deg, #f0b35f, var(--amber))"
                : "linear-gradient(180deg, #14a39a, var(--teal-deep))",
              filter:    hovered ? "brightness(1.1)" : "brightness(1)",
              transition: "filter 0.15s",
              animation: current ? "pulseSegment 2.4s ease-in-out infinite" : "none",
            }}
            onMouseEnter={() => onHover(seg.code)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSegmentClick(seg.code)}
            aria-label={`${seg.role} at ${seg.org}, ${seg.from} to ${seg.to}`}
          >
            {current && (
              <span
                className="absolute left-2 font-mono text-xs font-bold flex items-center gap-1"
                style={{ top: "-22px", color: "var(--amber)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--amber)", animation: "pulseDot 2.2s ease-in-out infinite" }}
                />
                NOW
              </span>
            )}
            {seg.width > 10 && (
              <span className="font-mono text-xs font-semibold text-white/90 select-none">
                {seg.code}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
