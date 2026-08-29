import { Link } from "react-router-dom";

function ProjectCard({ slug, title }) {
  return (
    <Link className="project-card" to={`/projects/${slug}`}>
      <div className="project-card__thumb" aria-hidden="true" />
      <span className="project-card__title">{title}</span>
    </Link>
  );
}

export default ProjectCard;
