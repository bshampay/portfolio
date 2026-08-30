import { useEffect, useRef, useState } from "react";
import heroImageDesktop from "../assets/hero_pano.png";
import heroImageMobile from "../assets/hero.png";
import Fireflies from "./Fireflies";

const HOVER_RADIUS = "90px";
// Matches the mobile breakpoint used elsewhere (index.css) so the
// image swap lines up with when the layout itself goes mobile.
const MOBILE_QUERY = "(max-width: 640px)";

// Static for now, per brief: no canopy/mycelium hover or sound yet —
// those are documented as future ideas in the project brief. The soil
// veil and the drifting fireflies are the two built so far. A WebGL
// canopy-wind-warp effect was tried and pulled back out — displacing
// pixels on one flat image reads as morphing, not swaying, since there's
// no way to distinguish one leaf cluster from another. Revisit that idea
// only with layered source art or a purpose-made looping video clip.
function Hero() {
  const veilRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );

  // Same fireflies/spotlight interactions on both — only the source
  // image changes.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

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
          src={isMobile ? heroImageMobile : heroImageDesktop}
          alt="A cross-section illustration of trees, roots, and a glowing mycelium network underground"
        />
        <Fireflies isMobile={isMobile} />
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
      <h1 className="hero__headline">
        Complex systems. Finding simplicity &amp; connection.
      </h1>
      <div className="hero__copy">
        <div className="hero__body">
          <p>
            <strong>
              For the past 5 years I've been a Senior Product Designer at
              Bayer, bringing Product Design — and increasingly Design
              Engineering
            </strong>{" "}
            — to enterprise software for hundreds of R&D Scientists around
            the world, helping them navigate decades of data across
            pipelines.
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
