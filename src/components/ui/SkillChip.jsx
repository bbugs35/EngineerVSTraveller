/** Skill chip with teal left accent. */
export function SkillChip({ children }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded"
      style={{
        background: "var(--surface-alt)",
        color: "var(--ink-soft)",
        borderLeft: "2px solid var(--teal)",
      }}
    >
      {children}
    </span>
  );
}
