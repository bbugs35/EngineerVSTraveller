import { NAV_ITEMS } from "../data/resumeData";

export function NavBar({ active, onNav }) {
  return (
    <nav
      className="sticky top-14 z-50 border-b"
      style={{
        background:     "rgba(244,246,248,0.88)",
        backdropFilter: "blur(10px)",
        borderColor:    "var(--line)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16 gap-4">
        {/* Brand mark — click to jump back to top */}
        <button
          type="button"
          onClick={() => onNav("hero")}
          className="flex items-center gap-2.5 font-semibold shrink-0 bg-transparent border-0 p-0 cursor-pointer transition-opacity duration-150 hover:opacity-80"
          aria-label="Scroll to top"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white"
            style={{ background: "var(--navy)" }}
          >
            BK
          </div>
          <span className="text-sm hidden sm:inline" style={{ color: "var(--ink)" }}>
            Bharath Kunamneni
          </span>
        </button>

        {/* Nav links */}
        <div className="flex gap-0.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(({ id, n, label }) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="flex items-baseline gap-1.5 px-2.5 py-2 rounded-lg text-sm whitespace-nowrap transition-colors duration-150"
              style={{
                color:      active === id ? "var(--teal-deep)" : "var(--ink-soft)",
                fontWeight: active === id ? 600 : 400,
              }}
            >
              <span
                className="font-mono text-xs"
                style={{ color: active === id ? "var(--teal)" : "var(--ink-faint)" }}
              >
                {n}
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs font-semibold shrink-0"
          style={{
            background:  "var(--teal-tint)",
            borderColor: "rgba(14,140,132,0.25)",
            color:       "var(--teal-deep)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--teal)", animation: "pulseDot 2.2s ease-in-out infinite" }}
          />
          <span className="hidden sm:inline">OPEN TO WORK</span>
          <span className="sm:hidden">OPEN</span>
        </div>
      </div>
    </nav>
  );
}
