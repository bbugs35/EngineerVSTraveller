import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../components/ui";
import { CONTACT_FIELDS, CONTACT_ACTIONS } from "../../data/resumeData";

export function ContactSection() {
  return (
    <footer id="contact" className="py-16" style={{ background: "var(--navy)", color: "#eaf1f1" }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          {/* Eyebrow on dark bg */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-4 h-px" style={{ background: "var(--teal)" }} />
            <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--teal)" }}>
              <span className="mr-1.5" style={{ color: "rgba(234,241,241,0.4)" }}>06</span>
              Contact
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1.5">Let's build something great</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(234,241,241,0.6)" }}>
            Open to Senior Frontend Engineer, React Lead, and Frontend Architect roles.
          </p>
        </Reveal>

        {/* Info grid */}
        <Reveal delay={60}>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 rounded-xl overflow-hidden border mb-8"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {CONTACT_FIELDS.map(({ label, value }) => (
              <div
                key={label}
                className="px-5 py-4 border-b border-r"
                style={{
                  background:   "rgba(255,255,255,0.03)",
                  borderColor:  "rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-1"
                  style={{ color: "rgba(234,241,241,0.4)" }}
                >
                  {label}
                </div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Action buttons */}
        <Reveal delay={120}>
          <div className="flex flex-wrap gap-3">
            {CONTACT_ACTIONS.map(({ href, Icon: IconComp, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  background:  "rgba(255,255,255,0.06)",
                  border:      "1px solid rgba(255,255,255,0.14)",
                  color:       "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = "rgba(14,140,132,0.22)";
                  e.currentTarget.style.borderColor  = "var(--teal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor  = "rgba(255,255,255,0.14)";
                }}
              >
                <IconComp size={15} style={{ color: "#6fd8d0" }} />
                {label}
                <ArrowUpRight size={12} style={{ color: "rgba(255,255,255,0.35)" }} />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Footer note */}
        <div
          className="mt-10 pt-5 flex flex-wrap justify-between gap-2 font-mono text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(234,241,241,0.38)" }}
        >
          <span>{"// export default FrontendEngineer;"}</span>
          <span>Open to new challenges</span>
        </div>
      </div>
    </footer>
  );
}
