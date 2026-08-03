import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../data/resumeData";

// Distance from the top of the viewport used as the "crossing line" for
// deciding which section is active — should roughly match the combined
// height of the sticky ModeSwitcher (56px) + NavBar (64px) so a section
// counts as active right as it clears both sticky bars.
const NAV_OFFSET = 128;

const IDS = NAV_ITEMS.map((n) => n.id);
const LAST_ID = IDS[IDS.length - 1];

/**
 * Tracks which section is active by finding the last section whose top has
 * crossed above NAV_OFFSET, and exposes a `navigateTo(id)` that
 * smooth-scrolls to a section while keeping the active state in sync.
 *
 * Two failure modes this avoids:
 * 1. Flicker through intermediate sections during a smooth-scroll click —
 *    solved by setting `active` immediately on click and suppressing
 *    scroll-driven recalculation until the scroll animation settles.
 * 2. The last section never registering as active — solved by treating
 *    "scrolled to the bottom of the page" as its own case rather than
 *    relying on the section crossing a mid-viewport line it may never
 *    reach.
 */
export function useActiveSection() {
  const [active, setActive] = useState(IDS[0]);
  const suppressScroll = useRef(false);
  const rafId = useRef(null);

  const computeActive = useCallback(() => {
    const doc = document.documentElement;
    const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
    if (atBottom) {
      setActive(LAST_ID);
      return;
    }

    let current = IDS[0];
    for (const id of IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= NAV_OFFSET) {
        current = id;
      } else {
        break;
      }
    }
    setActive(current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (suppressScroll.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(computeActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    computeActive();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [computeActive]);

  const navigateTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    suppressScroll.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Poll until the browser's smooth-scroll animation actually settles
    // (scrollY stops moving for a few consecutive frames), then hand
    // control back to the scroll listener and reconcile once more —
    // this catches cases like a short last section getting clamped by
    // the bottom of the page instead of landing exactly at its top.
    let lastY = window.scrollY;
    let stableFrames = 0;
    const poll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 1) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastY = y;
      }
      if (stableFrames >= 4) {
        suppressScroll.current = false;
        computeActive();
        return;
      }
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  }, [computeActive]);

  return [active, navigateTo];
}
