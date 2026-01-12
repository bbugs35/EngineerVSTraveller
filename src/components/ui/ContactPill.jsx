/** Quick-contact pill (link or static). */
export function ContactPill({ href, Icon: IconComp, label }) {
  const base = {
    background:   "var(--surface)",
    borderColor:  "var(--line)",
    color:        "var(--ink)",
  };
  const inner = (
    <>
      <IconComp size={14} style={{ color: "var(--teal-deep)", flexShrink: 0 }} />
      <span>{label}</span>
    </>
  );
  const cls = "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors duration-150 hover:border-teal-500/60";

  return href
    ? <a href={href} target="_blank" rel="noreferrer" className={cls} style={base}>{inner}</a>
    : <span className={cls} style={base}>{inner}</span>;
}
