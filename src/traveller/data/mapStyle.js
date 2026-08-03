// A clean, modern, minimal map theme — light base, muted labels, no
// clutter (no POI icons/labels, no transit lines) so the custom photo
// markers stay the visual focus.
export const MINIMAL_MAP_STYLE = [
  { elementType: "geometry",              stylers: [{ color: "#f4f6f8" }] },
  { elementType: "labels.text.fill",      stylers: [{ color: "#7a8790" }] },
  { elementType: "labels.text.stroke",    stylers: [{ color: "#f4f6f8" }] },
  { featureType: "administrative",        elementType: "geometry",        stylers: [{ color: "#dbe2e6" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "poi",                   stylers: [{ visibility: "off" }] },
  { featureType: "road",                  elementType: "geometry",        stylers: [{ color: "#e3e8eb" }] },
  { featureType: "road",                  elementType: "labels",          stylers: [{ visibility: "off" }] },
  { featureType: "road.arterial",         elementType: "geometry",        stylers: [{ color: "#eaeef1" }] },
  { featureType: "road.highway",          elementType: "geometry",        stylers: [{ color: "#dbe2e6" }] },
  { featureType: "transit",               stylers: [{ visibility: "off" }] },
  { featureType: "water",                 elementType: "geometry",        stylers: [{ color: "#d3e6e4" }] },
  { featureType: "landscape.natural",     elementType: "geometry",        stylers: [{ color: "#eef1ef" }] },
];
