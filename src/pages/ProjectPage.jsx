import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

// Single template every project page runs through, so structure stays
// consistent even as each project's images/blurb change.
function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="project-page">
        <Link className="back-link" to="/">
          ← Back
        </Link>
        <h1>Project not found</h1>
      </main>
    );
  }

  return (
    <main className="project-page">
      <Link className="back-link" to="/">
        ← Back
      </Link>
      <h1 className="project-page__title">{project.title}</h1>
      <div className="project-page__gallery">
        {Array.from({ length: project.images }).map((_, i) => (
          <div className="project-page__image" key={i} aria-hidden="true" />
        ))}
      </div>
      <div className="project-page__blurb">
        {project.blurb.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}

export default ProjectPage;
