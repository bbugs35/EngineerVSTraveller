/**
 * Wraps an arbitrary DOM node as a google.maps.OverlayView so React content
 * can be positioned on the map at a lat/lng, independent of the default
 * marker rendering. This is what lets marker "pins" be full photo cards
 * instead of default map pins, with no Map ID / Advanced Markers setup
 * required.
 *
 * @param {typeof google.maps} maps - the loaded google.maps namespace
 * @param {google.maps.Map} map
 * @param {{lat:number,lng:number}} position
 * @param {HTMLElement} contentEl - DOM node to render (mount React into this yourself)
 */
export function createHtmlOverlay(maps, map, position, contentEl) {
  class HtmlOverlay extends maps.OverlayView {
    constructor() {
      super();
      this.position = position;
      this.div = null;
      this.setMap(map);
    }

    onAdd() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      this.div.style.transform = "translate(-50%, -100%)";
      this.div.style.transition = "left 260ms ease-out, top 260ms ease-out";
      this.div.appendChild(contentEl);
      this.getPanes().overlayMouseTarget.appendChild(this.div);
    }

    draw() {
      const projection = this.getProjection();
      if (!projection || !this.div) return;
      const point = projection.fromLatLngToDivPixel(
        new maps.LatLng(this.position.lat, this.position.lng)
      );
      if (point) {
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
      }
    }

    onRemove() {
      if (this.div?.parentNode) this.div.parentNode.removeChild(this.div);
      this.div = null;
    }

    updatePosition(nextPosition) {
      this.position = nextPosition;
      this.draw();
    }
  }

  return new HtmlOverlay();
}
