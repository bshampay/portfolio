import heroImage from "../assets/hero.png";

// Static for now, per brief: no hover/canopy/mycelium interactions,
// ambient animation, or sound yet — image, headline, and body copy only.
// Those are documented as future ideas in the project brief.
function Hero() {
  return (
    <header className="hero">
      <img
        className="hero__image"
        src={heroImage}
        alt="A cross-section illustration of trees, roots, and a glowing mycelium network underground"
      />
      <div className="hero__copy">
        <h1 className="hero__headline">
          Finding connections in the complexity
        </h1>
        <div className="hero__body">
          <p>
            For the past 5 years I've been a Senior Product Designer at
            Bayer, bringing Product Design — and increasingly Design
            Engineering — to enterprise software for hundreds of R&D
            Scientists around the world, helping them navigate decades of
            data across our pipelines.
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
