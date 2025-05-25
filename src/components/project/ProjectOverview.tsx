import React from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@lib/types";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
};

export const ProjectOverview = ({ projects, onEdit }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onEdit={() => onEdit(project)}
      />
    ))}
  </div>
);
