import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

function ProjectGrid() {
  return (
    <section className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          title={project.title}
        />
      ))}
    </section>
  );
}

export default ProjectGrid;
