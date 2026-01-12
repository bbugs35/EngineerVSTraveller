/** Signature element: fake JSX component declaration, styled like a code editor. */
export function HeroCodeBlock() {
  return (
    <div
      className="inline-block rounded-xl px-5 py-4 mb-7 font-mono text-sm leading-7 border select-none"
      style={{ background: "var(--code-bg)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <span style={{ color: "#6272a4" }}>{"// Senior Frontend Engineer"}</span>
      <br />
      <span style={{ color: "#ff79c6" }}>{"<"}</span>
      <span style={{ color: "#8be9fd" }}>{"BharathKunamneni"}</span>
      <br />
      {"  "}<span style={{ color: "#bd93f9" }}>{"role"}</span>
      <span style={{ color: "#ff79c6" }}>{"="}</span>
      <span style={{ color: "#f1fa8c" }}>{'"Senior Frontend Engineer"'}</span>
      <br />
      {"  "}<span style={{ color: "#bd93f9" }}>{"experience"}</span>
      <span style={{ color: "#ff79c6" }}>{"="}</span>
      <span style={{ color: "#ffb86c" }}>{"{10}"}</span>
      <br />
      {"  "}<span style={{ color: "#bd93f9" }}>{"stack"}</span>
      <span style={{ color: "#ff79c6" }}>{"="}</span>
      <span style={{ color: "#ffb86c" }}>{"{"}</span>
      <span style={{ color: "#f1fa8c" }}>{"[\"React\", \"TypeScript\", \"JavaScript\"]"}</span>
      <span style={{ color: "#ffb86c" }}>{"}"}</span>
      <br />
      <span style={{ color: "#ff79c6" }}>{"/>"}</span>
      <span
        className="ml-0.5"
        style={{ color: "#f8f8f2", animation: "blink 1.1s step-end infinite" }}
      >
        {"█"}
      </span>
    </div>
  );
}
