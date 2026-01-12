/** Small mono pill for tech stack tags. */
export function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium border"
      style={{ background: "var(--surface-alt)", color: "var(--ink-soft)", borderColor: "var(--line)" }}
    >
      {children}
    </span>
  );
}
