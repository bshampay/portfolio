# Hero Motion & Sound Plan

Reference doc for the hero image's interactions — what's built, what was
tried and rejected, and what's left to get to the full vision:

1. A default, continuous ambient breeze moving through the canopy
2. An extra gust of wind when hovering specific leaves/branches, layered
   on top of the glow spotlight that's already there
3. A subtle looping forest-breeze sound, with a mute/unmute toggle

## Built so far

All of it is plain CSS + vanilla JS/React — no animation libraries, no
new dependencies.

**Soil veil spotlight** ([Hero.jsx](src/components/Hero.jsx),
[index.css](src/index.css))
The soil under the trees starts darkened, with a small resting glow
over the center tree's roots as a cue. Hovering (or press-and-drag on
touch) reveals a circular "flashlight" area following the pointer,
via a `mask-image: radial-gradient(...)` on the darkened veil layer —
the roots underneath are already part of the source image, so
revealing is just cutting a hole in the mask. `@property` registers
the radius as an animatable custom property so it can transition
smoothly; the close is deliberately faster than the open so it reads
as a quick wink-out rather than a visible "iris closing."

**Canopy/mushroom glow spotlight** (`TreeGlow.jsx`)
Same technique, but additive instead of subtractive: a warm
`mix-blend-mode: screen` radial gradient follows the pointer over one
continuous region spanning the whole canopy area (ends exactly where
the soil veil begins). This started as five separate hotspot boxes
(one per tree/mushroom cluster) but that produced a hard rectangular
seam wherever the glow neared a box edge, since each box clipped its
own gradient independently — consolidating into one region removed
the internal edges entirely.

**Fireflies** (`Fireflies.jsx`)
Small glowing dots that drift in loose independent loops and twinkle
via opacity, each on randomized timing. Desktop gets a denser field
(80) styled as tiny pinpoint sparkles with a soft `box-shadow` bloom,
matched to the sparkle dots already in the illustration; mobile stays
sparser (8) with a slightly larger, simpler glow.

**Responsive hero image**
Swaps between two source illustrations at the existing 640px
breakpoint (`hero.png` on mobile, `hero_pano.png` on desktop) — same
interactions run on both.

## Tried and rejected

**WebGL canopy wind-warp.** Rendered the hero image into a `<canvas>`
via a hand-rolled WebGL shader, displacing pixels in the canopy region
with layered Perlin-ish noise over time, masked to fade out above the
ground line. Technically worked (verified via pixel-level readback,
not just eyeballing), but it read as the canopy *morphing* — pixels
smearing — rather than leaves swaying, because a flat raster image has
no way to distinguish one leaf cluster from another. Geometric
displacement on a single flattened image fundamentally can't fake real
per-object motion. Pulled back out; the code is gone, but the shader
math is preserved in git history (`CanopyCanvas.jsx`, removed).

## What's left

### 1. Default ambient breeze

This is the piece that genuinely needs something beyond CSS/JS
trickery on the current flat image. Two real paths:

- **Layered source art.** If the illustration ever gets redone with
  separate leaf-cluster/branch layers (e.g. as an SVG or a layered
  file), each layer could get its own subtle CSS `@keyframes`
  transform (rotate/skew, staggered timing) for genuine per-object
  sway. This is the "correct" long-term answer but depends on new
  artwork, not just code.
- **A generated looping video clip.** Prompt an AI video tool with the
  existing still (or a close variant) for a few seconds of gentle
  breeze motion in the canopy, exported as a seamless loop. Composite
  it in as a `<video autoplay loop muted playsinline>`, sized/masked to
  just the canopy region (reusing the same top/bottom bounds as the
  glow spotlight), likely blended or cross-faded with the static image
  at the edges so the seam isn't visible. This is asset production
  first, then a moderate integration pass.

Recommendation: start here with the video-loop path once there's a
clip to work with — it's the option achievable without new source art,
and it directly unblocks the hover-gust idea below.

### 2. Hover gust (leaves-specific)

An intensification of whichever ambient breeze solution exists,
triggered by hovering specific leaves/branches rather than the whole
canopy region the glow spotlight already covers. Depends entirely on
what #1 ends up being:

- If it's a video loop: could cross-fade to a second, more energetic
  clip, or briefly bump playback rate / a CSS transform scale on
  gust-hover.
- If it's layered art: a hover-triggered class could kick individual
  leaf-cluster layers with a stronger transform for a moment.

Not a real design yet — needs #1 settled first. Worth deciding then
whether "leaves" means a few specific hoverable sub-regions of the
canopy (same rectangular-hotspot problem the glow ran into — may need
similar care to avoid hard seams) or something coarser.

### 3. Forest breeze sound

Straightforward integration, the open question is the audio asset
itself:

- A plain `<audio loop>` element, muted by default (autoplay policies
  require a user gesture before unmuted audio can play), with a small,
  easy-to-find mute/unmute toggle in the UI.
- Needs a subtle, seamless-loop ambient breeze recording — either a
  royalty-free sound library or an AI audio-generation tool. Loop
  point needs to be clean (no audible seam/click) or it'll undercut
  the "subtle" goal.
- Should sync loosely with the ambient breeze visual once that exists,
  though it can be built and shipped independently first if useful.

## Open questions

- Video loop vs. redone layered art for the breeze — which is worth
  investing in first?
- Where's the breeze sound coming from (asset source), and who owns
  making sure the loop is clean?
- Does the hover gust need its own hoverable sub-regions, or is
  "anywhere in the canopy" (reusing the existing glow region) good
  enough?
