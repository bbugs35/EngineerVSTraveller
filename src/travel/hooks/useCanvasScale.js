import { useEffect, useState } from "react";

/**
 * Drives the "fixed design canvas" pattern: the canvas is authored at a
 * fixed pixel width (e.g. 1440) and never reflows. On viewports narrower
 * than that, the whole canvas is scaled down uniformly (never up) via
 * CSS transform, preserving every element's relative position exactly —
 * the opposite of a normal responsive layout, and what "match the
 * reference exactly at every size" actually requires.
 */
export function useCanvasScale(canvasWidth) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / canvasWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [canvasWidth]);

  return scale;
}
