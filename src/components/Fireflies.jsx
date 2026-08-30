import { useMemo } from "react";

const DESKTOP_COUNT = 80;
const MOBILE_COUNT = 8;

// Random each time this generates — scattered positions (% of
// .hero__media), kept above the soil veil so they don't compete
// visually with its darkened band. Each firefly gets its own
// drift/glow timing (duration + negative delay to start mid-cycle)
// so they don't all pulse in lockstep.
function generateFireflies(count) {
  return Array.from({ length: count }, () => {
    const duration = 6 + Math.random() * 5;
    return {
      top: `${(5 + Math.random() * 55).toFixed(1)}%`,
      left: `${(2 + Math.random() * 96).toFixed(1)}%`,
      duration,
      delay: -(Math.random() * duration).toFixed(2),
    };
  });
}

// Ambient, not tied to hover — ongoing ever since the page loads.
// Desktop gets a denser field (80); mobile stays at the original,
// already-tuned density (8).
function Fireflies({ isMobile }) {
  const fireflies = useMemo(
    () => generateFireflies(isMobile ? MOBILE_COUNT : DESKTOP_COUNT),
    [isMobile],
  );

  return (
    <div className="hero__fireflies" aria-hidden="true">
      {fireflies.map((firefly, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            top: firefly.top,
            left: firefly.left,
            "--firefly-duration": `${firefly.duration}s`,
            "--firefly-delay": `${firefly.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Fireflies;
