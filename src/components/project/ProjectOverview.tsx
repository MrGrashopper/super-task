"use client";

import React from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@lib/types";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
};

export const ProjectOverview = ({ projects, onEdit }: Props) => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onEdit={() => onEdit(project)}
      />
    ))}
  </div>
);
