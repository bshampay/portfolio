import { Link } from "react-router-dom";

// No visible label yet — frames are plain placeholders until real
// project content/titles are ready. `title` is kept as an accessible
// name so the link still reads sensibly to screen readers.
function ProjectCard({ slug, title, size = "regular" }) {
  return (
    <Link
      className={`project-card project-card--${size}`}
      to={`/projects/${slug}`}
      aria-label={title}
    >
      <div className="project-card__thumb" aria-hidden="true" />
    </Link>
  );
}

export default ProjectCard;
