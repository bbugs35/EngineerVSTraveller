import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Map as MapIcon } from "lucide-react";
import { useGoogleMaps } from "../hooks/useGoogleMaps";
import { MINIMAL_MAP_STYLE } from "../data/mapStyle";
import { TRAVEL_LOCATIONS } from "../data/travelLocations";
import { clusterLocations } from "../utils/clusterLocations";
import { createHtmlOverlay } from "../utils/createHtmlOverlay";
import { ClusterMarker } from "./ClusterMarker";
import { LocationMarker } from "./LocationMarker";

const INITIAL_CENTER = { lat: 24, lng: 60 }; // frames both India + the international spread
const INITIAL_ZOOM   = 3;
const PIXEL_RADIUS    = 70; // clustering distance in screen pixels

/**
 * The centerpiece map: loads the Google Maps JS API, renders every travel
 * location as a custom photo-card marker, and re-clusters them by pixel
 * distance every time the view settles (pan/zoom) — clusters that were
 * one stacked card at a low zoom pop apart into individual cards (or
 * smaller clusters) as you zoom in, and re-merge as you zoom out.
 */
export function TravelMap({ onSelectLocation }) {
  const { google, error } = useGoogleMaps();
  const containerRef = useRef(null);
  const mapRef        = useRef(null);
  const overlaysRef    = useRef(new Map()); // cluster id -> { overlay, root, wrapper }

  // Create the map once, when the API is ready.
  useEffect(() => {
    if (!google || !containerRef.current || mapRef.current) return;

    mapRef.current = new google.maps.Map(containerRef.current, {
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      styles: MINIMAL_MAP_STYLE,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy",
      minZoom: 2,
      maxZoom: 14,
    });
  }, [google]);

  // Recompute + re-render clusters on every settled view change.
  useEffect(() => {
    if (!google || !mapRef.current) return;
    const map = mapRef.current;
    const maps = google.maps;

    const recompute = () => {
      const clusters = clusterLocations(map, maps, TRAVEL_LOCATIONS, PIXEL_RADIUS);
      const nextIds  = new Set(clusters.map((c) => c.id));
      const existing = overlaysRef.current;

      // Remove overlays whose cluster grouping no longer exists.
      existing.forEach((entry, id) => {
        if (!nextIds.has(id)) {
          entry.overlay.setMap(null);
          entry.root.unmount();
          existing.delete(id);
        }
      });

      // Add or update.
      clusters.forEach((cluster) => {
        const isNew = !existing.has(cluster.id);

        if (isNew) {
          const wrapper = document.createElement("div");
          wrapper.style.opacity = "0";
          wrapper.style.transform = "scale(0.4)";
          wrapper.style.transition = "opacity 200ms ease-out, transform 200ms ease-out";

          const root = createRoot(wrapper);
          const handleClick = () => {
            if (cluster.locations.length === 1) {
              onSelectLocation(cluster.locations[0]);
            } else {
              map.panTo(cluster.center);
              map.setZoom(Math.min(map.getZoom() + 3, 14));
            }
          };

          root.render(
            cluster.locations.length === 1
              ? <LocationMarker location={cluster.locations[0]} onClick={handleClick} />
              : <ClusterMarker cluster={cluster} onClick={handleClick} />
          );

          const overlay = createHtmlOverlay(maps, map, cluster.center, wrapper);
          overlaysRef.current.set(cluster.id, { overlay, root, wrapper });

          // Pop-in animation once mounted.
          requestAnimationFrame(() => {
            wrapper.style.opacity = "1";
            wrapper.style.transform = "scale(1)";
          });
        } else {
          existing.get(cluster.id).overlay.updatePosition(cluster.center);
        }
      });
    };

    const listener = maps.event.addListener(map, "idle", recompute);
    recompute();

    return () => {
      maps.event.removeListener(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [google, onSelectLocation]);

  // Full cleanup on unmount (e.g. switching back to Engineer mode).
  useEffect(() => {
    return () => {
      overlaysRef.current.forEach(({ overlay, root }) => {
        overlay.setMap(null);
        root.unmount();
      });
      overlaysRef.current.clear();
    };
  }, []);

  if (error) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center px-6 text-center gap-3"
        style={{ background: "linear-gradient(155deg, var(--surface-alt) 0%, var(--bg) 100%)" }}
      >
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--teal-tint)" }}
        >
          <MapIcon size={20} style={{ color: "var(--teal-deep)" }} />
        </span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>Map isn't connected yet</p>
          <p className="text-xs mt-1 max-w-xs" style={{ color: "var(--ink-faint)" }}>{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
