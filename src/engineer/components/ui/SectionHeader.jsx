import { Eyebrow } from "./Eyebrow";

/** Consistent section title block. */
export function SectionHeader({ n, eyebrow, title, subtitle }) {
  return (
    <div className="mb-9">
      <Eyebrow n={n} label={eyebrow} />
      <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{title}</h2>
      {subtitle && (
        <p className="text-sm mt-1.5 max-w-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
