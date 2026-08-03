import { Eyebrow, ContactPill, StatCard, Reveal } from "../../components/ui";
import { STATS, HERO_CONTACTS, PROFILE } from "../../data/resumeData";
import { HeroCodeBlock } from "./HeroCodeBlock";

export function HeroSection() {
  return (
    <header
      id="hero"
      className="relative py-16 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(15,42,54,0.07) 1px, transparent 1px)",
        backgroundSize:  "18px 18px",
      }}
    >
      {/* Fade mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(244,246,248,0) 0%, var(--bg) 92%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <Reveal>
          <Eyebrow n="01" label="Frontend Engineering · React · TypeScript" />

          <HeroCodeBlock />

          <h1
            className="font-bold tracking-tight mb-2"
            style={{ fontSize: "clamp(36px, 5vw, 54px)", color: "var(--navy)", lineHeight: 1.08 }}
          >
            {PROFILE.name}
          </h1>
          <p className="text-lg font-semibold mb-4" style={{ color: "var(--teal-deep)" }}>
            {PROFILE.role}
          </p>
          <p className="max-w-2xl mb-7 leading-relaxed text-base" style={{ color: "var(--ink-soft)" }}>
            {PROFILE.summary}
          </p>

          {/* Quick contacts */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {HERO_CONTACTS.map(({ href, Icon, label }) => (
              <ContactPill key={label} href={href} Icon={Icon} label={label} />
            ))}
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </Reveal>
      </div>
    </header>
  );
}
