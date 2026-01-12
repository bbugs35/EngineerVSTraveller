import { Reveal, SkillChip } from "../../components/ui";

/** One category of skills — icon, heading, chips. */
export function SkillGroupCard({ group, delay = 0 }) {
  const { Icon, title, skills } = group;
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="rounded-xl p-5 border h-full"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <div className="flex items-center gap-2.5 mb-3.5">
          <Icon size={16} style={{ color: "var(--teal-deep)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => <SkillChip key={s}>{s}</SkillChip>)}
        </div>
      </div>
    </Reveal>
  );
}
