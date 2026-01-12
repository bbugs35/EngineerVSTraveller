import { Reveal, SectionHeader } from "../../components/ui";
import { SKILL_GROUPS } from "../../data/resumeData";
import { SkillGroupCard } from "./SkillGroupCard";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            n="02"
            eyebrow="Core Skills"
            title="Tech stack & tooling"
            subtitle="The tools I reach for daily, organized the way real frontend work is actually divided."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GROUPS.map((group, i) => (
            <SkillGroupCard key={group.title} group={group} delay={i * 45} />
          ))}
        </div>
      </div>
    </section>
  );
}
