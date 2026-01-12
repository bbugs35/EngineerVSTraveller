// ⚠️ TEMPORARY CALIBRATION MODE ⚠️
// journey-backdrop.png currently holds the DESIGN REFERENCE MOCKUP
// (cards, text, and all), not the real photo — swapped in on purpose so
// every UI element can be visually compared/aligned directly against it.
// The real photo is safe at journey-backdrop-REAL.png.bak in this same
// folder. To restore it:
//   cd public/images/road && cp journey-backdrop-REAL.png.bak journey-backdrop.png
const PHOTO = "/images/road/journey-backdrop.png";

/**
 * The background photo, sized to exactly fill the design canvas. When the
 * canvas height matches the photo's native height (the top-level 7-stop
 * page: 1440×2160, the photo's actual dimensions), this is a 1:1 fit —
 * zero stretching, zero cropping, exactly as uploaded. For journeys with
 * a different stop count (no matching reference image exists for those),
 * it falls back to `object-fit: cover` so it still looks intentional
 * rather than distorted.
 */
export function JourneyBackdrop({ height, exact = false }) {
  return (
    <img
      src={PHOTO}
      alt=""
      className="absolute top-0 left-0 w-full"
      style={{ height, objectFit: exact ? "fill" : "cover", objectPosition: "top center" }}
    />
  );
}
