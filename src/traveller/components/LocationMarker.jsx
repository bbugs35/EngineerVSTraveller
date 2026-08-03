import { useState } from "react";

/**
 * A single destination as a photo card marker. Hover lifts and scales it
 * slightly with a deepening shadow; click opens the immersive story view.
 */
export function LocationMarker({ location, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center cursor-pointer bg-transparent border-0 p-0"
      style={{ width: 96, paddingTop: 12 }}
      aria-label={`Open ${location.name} travel story`}
    >
      <div
        className="rounded-2xl overflow-hidden border-2 transition-transform duration-200 ease-out"
        style={{
          width: 68,
          height: 68,
          borderColor: "#fff",
          transform: hovered ? "translateY(-6px) scale(1.08)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? "0 14px 26px rgba(15,41,55,0.32)"
            : "0 4px 10px rgba(15,41,55,0.2)",
          transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
        }}
      >
        <img src={location.thumbnail} alt={location.name} className="w-full h-full object-cover grade" />
      </div>
      <span
        className="mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{ background: "rgba(16,42,54,0.85)", color: "#fff" }}
      >
        {location.name}
      </span>
    </button>
  );
}
