/** Small mono label above section titles. */
export function Eyebrow({ n, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="inline-block w-4 h-px" style={{ background: "var(--teal)" }} />
      <span
        className="font-mono text-xs font-semibold tracking-widest uppercase"
        style={{ color: "var(--teal-deep)" }}
      >
        <span className="mr-1.5" style={{ color: "var(--ink-faint)" }}>{n}</span>
        {label}
      </span>
    </div>
  );
}
