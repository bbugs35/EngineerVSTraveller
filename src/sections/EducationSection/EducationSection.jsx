import { GraduationCap } from "lucide-react";
import { Reveal, SectionHeader } from "../../components/ui";

export function EducationSection() {
  return (
    <section id="education" className="py-16 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader n="05" eyebrow="Education" title="Academic background" />
        </Reveal>
        <Reveal delay={60}>
          <div
            className="flex gap-4 items-start rounded-xl p-5 border"
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2"
              style={{ background: "var(--teal-tint)", borderColor: "var(--teal)" }}
            >
              <GraduationCap size={22} style={{ color: "var(--teal-deep)" }} />
            </div>
            <div>
              <div className="font-semibold text-base" style={{ color: "var(--ink)" }}>
                Bachelor of Technology
              </div>
              <div className="text-sm mt-0.5" style={{ color: "var(--ink-soft)" }}>
                Computer Science &amp; Engineering
              </div>
              <div className="font-mono text-xs mt-2.5" style={{ color: "var(--ink-faint)" }}>
                2010 — 2014 &middot; India
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
