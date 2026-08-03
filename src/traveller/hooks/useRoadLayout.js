// Nested (country) pages always target the SAME canvas height as the main
// page — this is what guarantees the background photo never needs
// cropping/stretching on a subpage, regardless of how many stops that
// country has. The trade-off (explicitly OK'd): segment height flexes
// per stop count instead of being fixed, so more stops = tighter spacing.
const TARGET_CANVAS_HEIGHT = 2160; // must match WORLD_LAYOUT.canvasHeight
const CANVAS_WIDTH = 1440;

// Compact sizing — subpages only, 10% smaller than the main page's
// 345×255 card (main page is untouched; these constants are never used
// there, only in this generic/nested-page layout).
const CARD_WIDTH = 310;
const CARD_HEIGHT = 230;

const LEFT_CARD_X = 250;
const RIGHT_CARD_X = 860;
// dotX must sit outside the card's footprint — for "left" stops that
// means > LEFT_CARD_X + CARD_WIDTH; for "right" stops, < RIGHT_CARD_X.
const DOT_X_LEFT = 745;
const DOT_X_RIGHT = 750;

/**
 * A straight vertical road: every stop sits at the same horizontal
 * center, spaced one segment apart. Outputs the same shape as
 * worldLayout.js's hand-tuned stops ({cardX, cardY, dotX, dotY, side})
 * so RoadJourney can render both the reference top-level page and any
 * nested country page through one identical rendering path.
 */
export function buildRoadLayout(stopCount) {
  const segmentHeight = TARGET_CANVAS_HEIGHT / (stopCount + 1);

  const stopLayouts = Array.from({ length: stopCount }, (_, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    const y = (i + 0.5) * segmentHeight;
    return {
      side,
      cardX: side === "left" ? LEFT_CARD_X : RIGHT_CARD_X,
      // Clamped so the very first stop's card can never clip above the
      // canvas top when segmentHeight ends up smaller than CARD_HEIGHT
      // (happens with 9+ stops, e.g. India).
      cardY: Math.max(10, y - CARD_HEIGHT / 2),
      dotX: side === "left" ? DOT_X_LEFT : DOT_X_RIGHT,
      dotY: y,
    };
  });

  return {
    totalHeight: TARGET_CANVAS_HEIGHT,
    segmentHeight,
    canvasWidth: CANVAS_WIDTH,
    cardWidth: CARD_WIDTH,
    stopLayouts,
  };
}
