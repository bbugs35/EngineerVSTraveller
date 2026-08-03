import { motion } from "framer-motion";
import { X } from "lucide-react";
import { TravelMap } from "../TravelMap";

/**
 * The interactive world map, opened as an in-canvas popup (85% of the
 * canvas width) rather than a separate page section — click a destination
 * marker here to jump straight into its journey, same as anywhere else.
 */
export function MapPopup({ onClose, onSelectLocation }) {
  return (
    <motion.div
      className="absolute inset-0 z-[95] flex items-center justify-center p-6"
      style={{ background: "rgba(8,14,18,0.72)", backdropFilter: "blur(6px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border"
        style={{ width: "85%", height: "78%", borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <TravelMap onSelectLocation={onSelectLocation} />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(16,26,30,0.8)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
          aria-label="Close map"
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}
