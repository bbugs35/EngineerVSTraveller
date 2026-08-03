import { useCallback, useState } from "react";
import { Reveal, SectionHeader } from "../../components/ui";
import { ROADMAP_SEGMENTS, YEAR_TICKS } from "../../data/resumeData";
import { RoadmapBar } from "./RoadmapBar";
import { YearTicks } from "./YearTicks";
import { LegendCard } from "./LegendCard";

export function RoadmapSection() {
  const [hovered, setHovered] = useState(null);

  const scrollToExp = useCallback((code) => {
    const num = code.split("-")[1];
    const el  = document.getElementById(`exp-${num}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="roadmap" className="py-16 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            n="03"
            eyebrow="Career Timeline"
            title="A decade of shipping frontend at scale"
            subtitle="Each segment is one engagement, sized to its duration. Click a segment or card to jump straight to that role."
          />
        </Reveal>

        <Reveal delay={80}>
          <RoadmapBar
            segments={ROADMAP_SEGMENTS}
            hoveredCode={hovered}
            onHover={setHovered}
            onSegmentClick={scrollToExp}
          />
          <YearTicks ticks={YEAR_TICKS} />

          {/* Legend cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {ROADMAP_SEGMENTS.map((seg) => (
              <LegendCard
                key={seg.code}
                segment={seg}
                isHovered={hovered === seg.code}
                onEnter={() => setHovered(seg.code)}
                onLeave={() => setHovered(null)}
                onClick={() => scrollToExp(seg.code)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
