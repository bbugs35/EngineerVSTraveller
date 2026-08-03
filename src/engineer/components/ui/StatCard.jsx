/** Single metric tile. */
export function StatCard({ value, unit, label }) {
  return (
    <div
      className="rounded-xl p-4 relative overflow-hidden border"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "var(--teal)" }} />
      <div className="font-mono text-2xl font-semibold leading-none" style={{ color: "var(--navy)" }}>
        {value}
        {unit && <span className="text-xs ml-0.5" style={{ color: "var(--ink-faint)" }}>{unit}</span>}
      </div>
      <div className="text-xs mt-1.5 leading-snug" style={{ color: "var(--ink-soft)" }}>{label}</div>
    </div>
  );
}
