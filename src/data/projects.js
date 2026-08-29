// Placeholder project data. Replace title/summary/blurb/images as real
// projects are chosen. Every project routes to the same ProjectPage
// template, so the structure stays consistent as content changes.
//
// `size` drives the collage grid on the homepage:
//   "regular" — one grid cell
//   "tall"    — spans 2 rows
//   "wide"    — spans 2 columns
// Reorder or resize entries here to change the collage layout. Current
// sizes mirror left/right (tall, regular, regular, tall, regular,
// regular, wide, wide) so the grid reads as balanced overall despite
// the size mix.

export const projects = [
  {
    slug: "example-project",
    title: "Example Project",
    summary: "A short one-line description of what this project is.",
    blurb: [
      "This is a placeholder blurb for the project page template. Replace it with a written description of the problem, your approach, and the outcome.",
      "A project page can have multiple paragraphs. Keep it visual-forward and minimal — this is the one spot for more text context per project.",
    ],
    images: 3,
    size: "tall",
  },
  {
    slug: "project-2",
    title: "Project 2",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "regular",
  },
  {
    slug: "project-3",
    title: "Project 3",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "regular",
  },
  {
    slug: "project-4",
    title: "Project 4",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "tall",
  },
  {
    slug: "project-5",
    title: "Project 5",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "regular",
  },
  {
    slug: "project-6",
    title: "Project 6",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "regular",
  },
  {
    slug: "project-7",
    title: "Project 7",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "wide",
  },
  {
    slug: "project-8",
    title: "Project 8",
    summary: "Placeholder description.",
    blurb: ["Placeholder blurb for this project."],
    images: 1,
    size: "wide",
  },
];
