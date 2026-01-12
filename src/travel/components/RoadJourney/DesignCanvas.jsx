import { useCanvasScale } from "../../hooks/useCanvasScale";

/**
 * A fixed-size canvas (default 1440 wide) that scales down uniformly on
 * narrower viewports instead of reflowing — children are positioned in
 * true design pixels, and CSS transform:scale handles the rest. The
 * outer wrapper reserves the correctly-scaled height in normal document
 * flow so page scrolling still works normally.
 */
export function DesignCanvas({ width = 1440, height, children }) {
  const scale = useCanvasScale(width);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: height * scale }}>
      <div
        className="absolute top-0 left-1/2"
        style={{ width, height, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
      >
        {children}
      </div>
    </div>
  );
}
