import { CheckCircle2 } from "lucide-react";
import { Reveal, Tag } from "../../components/ui";

/** Renders a single job as a "ticket" card. */
export function ExperienceCard({ exp, delay = 0 }) {
  const current = exp.status === "current";

  return (
    <Reveal delay={delay}>
      <article
        id={`exp-${exp.code.split("-")[1]}`}
        className="rounded-xl p-6 mb-4 relative overflow-hidden border"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        {/* Status rail */}
        <span
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ background: current ? "var(--amber)" : "var(--teal)" }}
        />

        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs" style={{ color: "var(--ink-faint)" }}>{exp.code}</span>
            <span className="font-mono text-xs" style={{ color: "var(--ink-soft)" }}>{exp.dates}</span>
          </div>

          {/* Status badge */}
          <span
            className="flex items-center gap-1.5 font-mono text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={current
              ? { background: "var(--amber-tint)", color: "#9a6a16" }
              : { background: "var(--teal-tint)",  color: "var(--teal-deep)" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: current ? "var(--amber)" : "var(--teal)",
                animation: current ? "pulseDot 2.2s ease-in-out infinite" : "none",
              }}
            />
            {current ? "Current sprint" : "Completed"}
          </span>
        </div>

        <h3 className="text-lg font-bold mt-3" style={{ color: "var(--navy)" }}>{exp.title}</h3>
        <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
          {exp.org} &middot; {exp.location}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
          {exp.stack.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>

        {/* Achievement bullets */}
        <ul className="space-y-2.5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "var(--teal)" }} />
              {b}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}
