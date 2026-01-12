/**
 * Groups locations into clusters based on their pixel distance apart at
 * the map's *current* zoom level — not a fixed geographic radius. This is
 * what makes clusters naturally separate as you zoom in: the same two
 * locations are "close" at zoom 4 and "far apart" at zoom 10, because
 * their pixel distance changes even though their lat/lng doesn't.
 *
 * Uses greedy single-link grouping (simple, fast, good enough for a
 * few dozen points): walk the list, and any not-yet-visited point within
 * `pixelRadius` of the current point joins its cluster. This is an
 * approximation, not true k-means/DBSCAN — acceptable here since cluster
 * shape doesn't need to be perfectly optimal, just visually sensible.
 */
export function clusterLocations(map, maps, locations, pixelRadius = 70) {
  const projection = map.getProjection();
  if (!projection) {
    return locations.map((loc) => ({ id: loc.id, center: loc.coordinates, locations: [loc] }));
  }

  const scale = Math.pow(2, map.getZoom());

  const points = locations.map((loc) => {
    const worldPoint = projection.fromLatLngToPoint(
      new maps.LatLng(loc.coordinates.lat, loc.coordinates.lng)
    );
    return { loc, x: worldPoint.x * scale, y: worldPoint.y * scale };
  });

  const visited = new Set();
  const clusters = [];

  points.forEach((point, i) => {
    if (visited.has(i)) return;
    const group = [point];
    visited.add(i);

    for (let j = i + 1; j < points.length; j++) {
      if (visited.has(j)) continue;
      const dist = Math.hypot(point.x - points[j].x, point.y - points[j].y);
      if (dist <= pixelRadius) {
        group.push(points[j]);
        visited.add(j);
      }
    }

    const avgLat = group.reduce((sum, p) => sum + p.loc.coordinates.lat, 0) / group.length;
    const avgLng = group.reduce((sum, p) => sum + p.loc.coordinates.lng, 0) / group.length;

    clusters.push({
      id:        group.map((p) => p.loc.id).join("+"),
      center:    { lat: avgLat, lng: avgLng },
      locations: group.map((p) => p.loc),
    });
  });

  return clusters;
}

/** Bounding box that contains every location in a cluster, used to zoom-to-fit on click. */
export function clusterBounds(maps, cluster) {
  const bounds = new maps.LatLngBounds();
  cluster.locations.forEach((loc) => bounds.extend(new maps.LatLng(loc.coordinates.lat, loc.coordinates.lng)));
  return bounds;
}
