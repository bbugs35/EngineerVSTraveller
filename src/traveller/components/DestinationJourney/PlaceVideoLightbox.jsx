import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Click-to-watch video lightbox for a single place. Opened via a direct
 * click (a user gesture), so autoplay-with-sound is allowed by the
 * browser — no need to default to muted like the ambient hero videos.
 */
export function PlaceVideoLightbox({ place, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const video = place.videos[activeIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(10,20,26,0.92)", backdropFilter: "blur(6px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest" style={{ color: "#6fd8d0" }}>
              Stop {String(place.order).padStart(2, "0")}
            </div>
            <h3 className="text-white font-bold text-lg">{place.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors duration-150 hover:bg-white/15"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.12)", aspectRatio: "16 / 9" }}>
          {video.src ? (
            <video
              key={video.id}
              className="w-full h-full object-cover"
              src={video.src}
              poster={video.poster}
              autoPlay
              controls
              playsInline
            />
          ) : (
            <div className="relative w-full h-full">
              <img src={video.poster} alt={video.title} className="w-full h-full object-cover grade" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(15,41,55,0.55)" }}>
                <span className="text-white text-sm font-mono px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.35)" }}>
                  Video coming soon
                </span>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm mt-3" style={{ color: "rgba(255,255,255,0.75)" }}>{place.note}</p>

        {place.videos.length > 1 && (
          <div className="flex gap-2 mt-4">
            {place.videos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="rounded-lg overflow-hidden border-2 flex-shrink-0"
                style={{ width: 84, height: 48, borderColor: i === activeIndex ? "#6fd8d0" : "transparent" }}
              >
                <img src={v.poster} alt={v.title} className="w-full h-full object-cover grade" />
              </button>
            ))}
          </div>
        )}

        {place.photos?.length > 0 && (
          <div className="flex gap-2 mt-4">
            {place.photos.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 64, height: 64 }}>
                <img src={src} alt="" className="w-full h-full object-cover grade" />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
