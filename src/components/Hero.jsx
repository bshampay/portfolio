import { useEffect, useRef, useState } from "react";
import heroImageDesktop from "../assets/hero_pano.png";
import heroImageMobile from "../assets/hero.png";
import Fireflies from "./Fireflies";
import TreeGlow from "./TreeGlow";

const HOVER_RADIUS = "90px";
// Delay before re-opening at the new position on the very first
// engagement, giving the fast 0.06s close-transition (see
// hero__soil-veil in index.css) time to finish fading the resting
// center glow out before it reopens elsewhere.
const FIRST_FADE_MS = 90;
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
  const hasInteractedRef = useRef(false);
  const firstRevealTimeoutRef = useRef(null);
  // True only during the brief FIRST_FADE_MS window on the very first
  // engagement. onPointerMove is bound to trackSpot directly (below),
  // and the same movement that triggers pointerenter also fires a
  // pointermove for that spot — without this guard, position jumped to
  // the new spot immediately via that parallel handler, while the
  // circle was still visibly mid-shrink, instead of only moving once
  // it's already invisible at radius 0.
  const suppressTrackRef = useRef(false);
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

  useEffect(() => {
    return () => clearTimeout(firstRevealTimeoutRef.current);
  }, []);

  // A touch-only device can't have a real mouse pointer, so any
  // pointerType "mouse" event reaching these handlers on such a device
  // has to be one of the synthetic "ghost" compatibility events real
  // mobile browsers fire a moment after a genuine touch ends (to keep
  // mouse-only sites working). preventDefault() on the real touch's
  // pointerdown (below) is supposed to suppress that, but that
  // suppression isn't reliably honored across every real mobile
  // browser — this device-capability check is the actual fix: it
  // ignores the ghost event outright regardless of whether the
  // browser generated it anyway.
  const isGhostMouseEvent = (event) =>
    event.pointerType === "mouse" &&
    !window.matchMedia("(hover: hover)").matches;

  // Written straight to the DOM (not React state) so dragging/hovering
  // doesn't trigger a re-render on every pointer move.
  const trackSpot = (event) => {
    if (suppressTrackRef.current || isGhostMouseEvent(event)) return;
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
  //
  // The very first time anyone engages with the veil, this fades the
  // resting center glow out in place first (reusing the fast base
  // transition, no repositioning yet), then re-opens at wherever the
  // pointer landed a beat later — a clean fade-out/fade-in rather than
  // a snap. Tried making it travel/sweep across (slow position
  // transition, then a bulging-radius variant on top of that) — both
  // read as fiddly rather than smooth, so this is deliberately simpler.
  const revealSpot = (event) => {
    // See isGhostMouseEvent above — this is the real fix for the
    // synthetic ghost pointerenter/pointerdown mobile browsers fire a
    // moment after a real touch ends, which was reopening the veil
    // right after hideSpot had just closed it (and since there's no
    // real mouse to ever "leave" on a touch device, it just stayed
    // open indefinitely).
    if (isGhostMouseEvent(event)) return;
    // Also try to stop the browser from generating that ghost sequence
    // in the first place — kept as defense in depth, but not relied on
    // alone since it isn't consistently honored on every real mobile
    // browser. touch-action stays default, so this doesn't affect page
    // scroll.
    if (event.pointerType === "touch") {
      event.preventDefault();
    }
    const veil = veilRef.current;
    if (!veil) return;

    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      suppressTrackRef.current = true;
      const { clientX, clientY } = event;
      veil.style.setProperty("--spot-radius", "0px");
      firstRevealTimeoutRef.current = setTimeout(() => {
        suppressTrackRef.current = false;
        trackSpot({ clientX, clientY });
        veil.classList.add("hero__soil-veil--active");
        veil.style.setProperty("--spot-radius", HOVER_RADIUS);
      }, FIRST_FADE_MS);
      return;
    }

    trackSpot(event);
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
  //
  // Also cancels any pending first-fade reopen: if someone leaves
  // before that fires (a very fast in-and-out), this stops it from
  // popping the glow back open after they've already moved away.
  const hideSpot = () => {
    clearTimeout(firstRevealTimeoutRef.current);
    suppressTrackRef.current = false;
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
        <TreeGlow />
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
        Finding connection in complex systems.
      </h1>
      <div className="hero__copy">
        <div className="hero__body">
          {isMobile ? (
            <>
              <p>
                <strong>
                  I've been a designer for 16 years, the past 5 a Senior
                  Product Designer at Bayer, working on enterprise software
                  for hundreds of R&D Scientists around the world, helping
                  them navigate decades of data across pipelines.
                </strong>
              </p>
              <p>
                These applications are under NDA, so I can't show them
                here, but coming soon below will be some recent side
                projects to give you a glimpse into how I think and work.
              </p>
            </>
          ) : (
            <p>
              <strong>
                I've been a designer for 16 years, the past 5 a Senior
                Product Designer at Bayer, working on enterprise software
                for hundreds of R&D Scientists around the world, helping
                them navigate decades of data across pipelines.
              </strong>{" "}
              These applications are under NDA, so I can't show them here,
              but coming soon below will be some recent side projects to
              give you a glimpse into how I think and work.
            </p>
          )}
          <p>
            Since 2026, I've also been getting back into shipping
            production code for the first time in a decade, which has been
            really exciting.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Hero;
