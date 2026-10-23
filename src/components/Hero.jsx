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
        A designer who builds and finds connections in complex systems.
      </h1>
      <div className="hero__copy">
        <div className="hero__body">
          <p>
            Hi, I'm Becky, a product designer with 15 years of
            experience. For the last 5 years, I've been at Bayer as a
            Senior Product Designer, leading design and research on
            several of the global software products for R&D chemists and
            biologists across{" "}
            <a
              href="https://www.bayer.com/en/portfolio/agriculture/agriculture-pipeline"
              target="_blank"
              rel="noreferrer"
            >
              Bayer's Crop Science&nbsp;Pipeline
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
