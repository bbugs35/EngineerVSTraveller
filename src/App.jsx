import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModeSwitcher } from "./components/layout/ModeSwitcher";
import { EngineerExperience } from "./engineer/EngineerExperience";
import { TravelExperience } from "./travel/TravelExperience";
import "./styles/globals.css";

export default function App() {
  const [mode, setMode] = useState("engineer"); // "engineer" | "traveller"

  return (
    <>
      <ModeSwitcher mode={mode} onChange={setMode} />
      <AnimatePresence mode="wait">
        {mode === "engineer" ? (
          <motion.div
            key="engineer"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <EngineerExperience />
          </motion.div>
        ) : (
          <motion.div
            key="traveller"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <TravelExperience />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
