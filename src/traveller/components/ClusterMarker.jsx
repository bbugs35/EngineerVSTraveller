import { useState } from "react";

const STACK_OFFSETS = [
  { x: -14, y: 2,  rotate: -9 },
  { x: -4,  y: -4, rotate: -3 },
  { x: 8,   y: -1, rotate: 5  },
  { x: 18,  y: 4,  rotate: 11 },
];

/**
 * A cluster of nearby destinations rendered as an overlapping stack of
 * thumbnail photo cards — the Apple Photos "map view" look. Clicking
 * zooms the map to fit the cluster, which causes it to separate into
 * individual cards or smaller sub-clusters (handled by the parent map's
 * re-clustering on zoom).
 */
export function ClusterMarker({ cluster, onClick }) {
  const [hovered, setHovered] = useState(false);
  const visible = cluster.locations.slice(0, 4);
  const extra   = cluster.locations.length - visible.length;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center cursor-pointer bg-transparent border-0 p-0"
      style={{ width: 96, paddingTop: 34 }}
      aria-label={`${cluster.locations.length} destinations — click to zoom in`}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          width: 72,
          height: 60,
          transform: hovered ? "translateY(-4px) scale(1.06)" : "translateY(0) scale(1)",
        }}
      >
        {visible.map((loc, i) => (
          <img
            key={loc.id}
            src={loc.thumbnail}
            alt={loc.name}
            className="absolute w-11 h-11 rounded-xl object-cover border-2 grade"
            style={{
              left:       `calc(50% + ${STACK_OFFSETS[i].x}px)`,
              top:        `calc(50% + ${STACK_OFFSETS[i].y}px)`,
              transform:  `translate(-50%, -50%) rotate(${STACK_OFFSETS[i].rotate}deg)`,
              borderColor: "#fff",
              boxShadow:  hovered
                ? "0 10px 20px rgba(15,41,55,0.28)"
                : "0 3px 8px rgba(15,41,55,0.18)",
              zIndex: i,
              transition: "box-shadow 200ms ease-out",
            }}
          />
        ))}
        {extra > 0 && (
          <span
            className="absolute flex items-center justify-center rounded-full text-[10px] font-bold font-mono text-white"
            style={{
              width: 20, height: 20,
              right: -2, top: -2,
              background: "#0e8c84",
              border: "2px solid #fff",
              zIndex: 10,
            }}
          >
            +{extra}
          </span>
        )}
      </div>
      <span
        className="mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{
          background: "rgba(16,42,54,0.85)",
          color: "#fff",
          opacity: hovered ? 1 : 0.9,
        }}
      >
        {cluster.locations.length} places
      </span>
    </button>
  );
}
