import SocialLinks from "./SocialLinks";
import WorkHistory from "./WorkHistory";

// The illustrated hero image (soil-veil spotlight, canopy glow, fireflies)
// was removed from the top of the page — it's still in git history at
// 7e9d148 (Hero.jsx, TreeGlow.jsx, Fireflies.jsx) and documented in
// HERO_MOTION_PLAN.md if it ever comes back.
function Hero() {
  return (
    <header className="hero">
      <h1 className="hero__headline">
        A designer who builds. Finding connections in complex systems.
      </h1>
      <div className="hero__copy">
        <div className="hero__body">
          <p>
            Hi, I'm Becky Shampay, a Senior Product Designer with 15 years of experience.
            At Bayer, I lead design and research for global software used
            by R&D Scientists across the{" "}
            <a
              href="https://www.bayer.com/en/portfolio/agriculture/agriculture-pipeline"
              target="_blank"
              rel="noreferrer"
            >
              Crop Science&nbsp;Pipeline
            </a>
            .
          </p>
        </div>
        <WorkHistory />
        <SocialLinks />
      </div>
    </header>
  );
}

export default Hero;
