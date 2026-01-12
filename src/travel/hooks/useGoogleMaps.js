import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

let loaderPromise = null;

/**
 * Loads the Google Maps JavaScript API exactly once (subsequent calls
 * reuse the same in-flight/resolved promise) and returns the `google`
 * namespace once ready.
 */
export function useGoogleMaps() {
  const [google, setGoogle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError(
        "Missing VITE_GOOGLE_MAPS_API_KEY. Add it to .env.local (see .env.example)."
      );
      return;
    }

    if (!loaderPromise) {
      const loader = new Loader({ apiKey, version: "weekly" });
      loaderPromise = loader.load();
    }

    let cancelled = false;
    loaderPromise
      .then((g) => { if (!cancelled) setGoogle(g); })
      .catch((err) => { if (!cancelled) setError(err.message || "Failed to load Google Maps."); });

    return () => { cancelled = true; };
  }, []);

  return { google, error };
}
