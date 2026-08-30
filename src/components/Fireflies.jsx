// Scattered positions (% of .hero__media), kept above the soil veil so
// they don't compete visually with its darkened band. Each firefly gets
// its own drift/glow timing (duration + negative delay to start
// mid-cycle) so they don't all pulse in lockstep.
const FIREFLIES = [
  { top: "15%", left: "12%", duration: 7.5, delay: -1.2 },
  { top: "35%", left: "22%", duration: 9, delay: -4.5 },
  { top: "10%", left: "45%", duration: 8.2, delay: -2.8 },
  { top: "28%", left: "58%", duration: 10.5, delay: -6.1 },
  { top: "45%", left: "8%", duration: 6.8, delay: -0.5 },
  { top: "20%", left: "78%", duration: 9.6, delay: -3.7 },
  { top: "50%", left: "68%", duration: 7.9, delay: -5.3 },
  { top: "38%", left: "90%", duration: 8.8, delay: -2.1 },
];

// Ambient, not tied to hover — ongoing ever since the page loads.
function Fireflies() {
  return (
    <div className="hero__fireflies" aria-hidden="true">
      {FIREFLIES.map((firefly, i) => (
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
