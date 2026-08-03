// Hand-estimated positions (in true canvas pixels, on the 1440×2160
// canvas) matching the reference design for the top-level 7-country page.
// These are visual estimates, not measured coordinates — there's no
// pixel-picker tool available to extract exact values from a reference
// image, so treat this as "as close as careful eyeballing gets," not
// mathematically exact. Keyed by destination id so it only applies when
// all 7 reference destinations are present, in this order.
//
// IMPORTANT geometry constraint: for "left" stops, dotX MUST be greater
// than cardX + cardWidth (the dot sits on the road, to the right of the
// card). For "right" stops, dotX MUST be less than cardX (the dot sits
// to the left of the card). Getting this backwards is what caused the
// "missing waypoint/connector" bug on the left-side cards — the dot
// ended up positioned *underneath* the card instead of beside it.
export const WORLD_LAYOUT = {
  canvasWidth: 1440,
  canvasHeight: 2160,
  hero: { left: 76, top: 208 },
  outline: { left: 76, top: 545 },
  stats: { right: 25, top: 208 },
  cardWidth: 345,
  stops: {
    "india":       { cardX: 864, cardY: 250,  dotX: 758, dotY: 335,  side: "right" },
    "vietnam":     { cardX: 308, cardY: 645,  dotX: 745, dotY: 730,  side: "left"  },
    "malaysia":    { cardX: 845, cardY: 853,  dotX: 715, dotY: 938,  side: "right" }, // shifted 20px left
    "singapore":   { cardX: 247, cardY: 1078, dotX: 680, dotY: 1163, side: "left"  }, // shifted 75px left
    "abu-dhabi":   { cardX: 905, cardY: 1298, dotX: 778, dotY: 1383, side: "right" }, // shifted 30px right
    "georgia":     { cardX: 243, cardY: 1500, dotX: 695, dotY: 1585, side: "left"  }, // shifted 15px left
    "kazakhstan":  { cardX: 927, cardY: 1707, dotX: 798, dotY: 1792, side: "right" }, // shifted 30px right
  },
};
