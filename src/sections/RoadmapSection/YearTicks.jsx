/** Year labels below the tenure bar. */
export function YearTicks({ ticks }) {
  return (
    <div className="relative h-5 mt-2">
      {ticks.map(({ label, pct }) => (
        <span
          key={label}
          className="absolute font-mono text-xs -translate-x-1/2"
          style={{ left: `${pct}%`, color: "var(--ink-faint)" }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
