import { useRef } from "react";
import heroImage from "../assets/hero_pano.png";

const HOVER_RADIUS = "90px";

// Static for now, per brief: no canopy/mycelium hover, ambient animation,
// or sound yet — those are documented as future ideas in the project brief.
// The soil veil is the one interaction built so far.
function Hero() {
  const veilRef = useRef(null);

  // Written straight to the DOM (not React state) so dragging/hovering
  // doesn't trigger a re-render on every pointer move.
  const trackSpot = (event) => {
    const veil = veilRef.current;
    if (!veil) return;
    const rect = veil.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    veil.style.setProperty("--spot-x", `${x}%`);
    veil.style.setProperty("--spot-y", `${y}%`);
  };

  // "is-active" switches to a slower transition (see CSS) for a soft
  // bloom-in while opening; hideSpot below removes it first so the
  // close uses the fast one instead — an open circle visibly shrinking
  // to a point reads as a deliberate animation, which isn't the goal.
  const revealSpot = (event) => {
    trackSpot(event);
    const veil = veilRef.current;
    if (!veil) return;
    veil.classList.add("hero__soil-veil--active");
    veil.style.setProperty("--spot-radius", HOVER_RADIUS);
  };

  // Fully closes the spotlight on leave — a "leave" can only happen
  // after an "enter", so the CSS default glow below (the resting cue
  // over the center tree's roots) only ever shows before the very
  // first hover/touch, and never comes back after that. Deliberately
  // leaves --spot-x/--spot-y untouched: resetting them here would snap
  // the position back to center while --spot-radius is still animating
  // down, making the shrink-to-zero visibly happen at center instead of
  // wherever the pointer actually left from.
  const hideSpot = () => {
    const veil = veilRef.current;
    if (!veil) return;
    veil.classList.remove("hero__soil-veil--active");
    veil.style.setProperty("--spot-radius", "0px");
  };

  return (
    <header className="hero">
      <div className="hero__media">
        <img
          className="hero__image"
          src={heroImage}
          alt="A cross-section illustration of trees, roots, and a glowing mycelium network underground"
        />
        {/*
          Pointer Events unify mouse and touch: on desktop this is a
          hover-follow spotlight (pointerenter/move/leave). On touch,
          there's no hover, so pointerdown/move/up naturally becomes
          "press and drag to reveal" instead — no separate touch code
          needed. Left as default touch-action so a vertical swipe that
          turns into a page scroll still cancels the gesture and scrolls
          normally rather than getting stuck.
        */}
        <div
          ref={veilRef}
          className="hero__soil-veil"
          aria-hidden="true"
          onPointerEnter={revealSpot}
          onPointerDown={revealSpot}
          onPointerMove={trackSpot}
          onPointerLeave={hideSpot}
          onPointerUp={hideSpot}
          onPointerCancel={hideSpot}
        />
      </div>
      <h1 className="hero__headline">Finding connections in the complexity</h1>
      <div className="hero__copy">
        <div className="hero__body">
          <p>
            For the past 5 years I've been a Senior Product Designer at
            Bayer, bringing Product Design — and increasingly Design
            Engineering — to enterprise software for hundreds of R&D
            Scientists around the world, helping them navigate decades of
            data across pipelines.
          </p>
          <p>
            These applications are under NDA, so I can't show them here,
            but these recent side projects will give you a glimpse into
            how I think and work.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Hero;
