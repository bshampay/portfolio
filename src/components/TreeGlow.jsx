const GLOW_RADIUS = "70px";

// Cursor-tracked "flashlight" glow, same interaction model as the
// soil veil's spotlight — position follows the pointer, growing in
// slowly and closing quickly (see the --active class handling in
// CSS, mirroring hero__soil-veil--active). Unlike the soil veil this
// doesn't reveal anything hidden; it just adds a warm screen-blended
// glow at the cursor. Only ever active on hover-capable pointers
// (gated in CSS), so no touch handling needed.
//
// One continuous region rather than several separate per-tree boxes
// (tried first) — each box clipped its own glow at its own edges,
// which showed up as a hard rectangular seam cutting across a tree
// whenever the glow neared a box boundary. A single area has no
// internal edges to cut across.
function trackGlow(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--glow-x", `${x}%`);
  el.style.setProperty("--glow-y", `${y}%`);
}

function showGlow(event) {
  trackGlow(event);
  event.currentTarget.classList.add("hero__glow-hotspot--active");
  event.currentTarget.style.setProperty("--glow-radius", GLOW_RADIUS);
}

function hideGlow(event) {
  event.currentTarget.classList.remove("hero__glow-hotspot--active");
  event.currentTarget.style.setProperty("--glow-radius", "0px");
}

function TreeGlow() {
  return (
    <div className="hero__glow-layer" aria-hidden="true">
      <div
        className="hero__glow-hotspot"
        onPointerEnter={showGlow}
        onPointerMove={trackGlow}
        onPointerLeave={hideGlow}
      />
    </div>
  );
}

export default TreeGlow;
