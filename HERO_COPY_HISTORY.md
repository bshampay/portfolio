# Hero Body Copy History

Snapshots of the hero's headline/body copy, kept so a past version can be
restored if a rewrite doesn't work out. Not auto-generated — add a new
entry by hand whenever the copy changes meaningfully.

## 2026-08-31 — replaced with third-person bio + social icons

Headline (unchanged, kept as-is in the 2026-08-31 rewrite):

> Finding connection in complex systems.

Body copy (desktop — one paragraph, bold lead sentence):

> **I've been a designer for 16 years, the past 5 a Senior Product
> Designer at Bayer, working on enterprise software for hundreds of R&D
> Scientists around the world, helping them navigate decades of data
> across pipelines.** These applications are under NDA, so I can't show
> them here, but coming soon below will be some recent side projects to
> give you a glimpse into how I think and work.
>
> Since 2026, I've also been getting back into shipping production code
> for the first time in a decade, which has been really exciting.

Body copy (mobile-only — same text, split into three paragraphs at
640px and below): the bold lead sentence as its own paragraph, then the
NDA sentence as its own paragraph, then the "Since 2026..." paragraph
unchanged.

Mobile-only headline size at the time: `clamp(1.85rem, 8vw, 2.5rem)`,
`line-height: 1.15` (desktop unaffected, its own `clamp(1.5rem, 4vw,
2.5rem)`).

Source at this snapshot: [src/components/Hero.jsx](src/components/Hero.jsx)
as of commit `6c70d04`.
