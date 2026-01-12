import { NavBar } from "../components/layout/NavBar";
import { HeroSection } from "../sections/HeroSection";
import { RoadmapSection } from "../sections/RoadmapSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { SkillsSection } from "../sections/SkillsSection";
import { EducationSection } from "../sections/EducationSection";
import { ContactSection } from "../sections/ContactSection";
import { useActiveSection } from "../hooks/useActiveSection";

/** The original resume portfolio, unchanged — one of the two modes App.jsx switches between. */
export function EngineerExperience() {
  const [active, navigateTo] = useActiveSection();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <NavBar active={active} onNav={navigateTo} />
      <HeroSection />
      <SkillsSection />
      <RoadmapSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
