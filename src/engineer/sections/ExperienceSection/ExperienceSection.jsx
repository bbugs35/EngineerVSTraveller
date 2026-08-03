import { Reveal, SectionHeader } from "../../components/ui";
import { EXPERIENCES } from "../../data/resumeData";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            n="04"
            eyebrow="Experience"
            title="Where I've made an impact"
            subtitle="Most recent first — with the stack I used to get it done on each engagement."
          />
        </Reveal>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.code} exp={exp} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}
