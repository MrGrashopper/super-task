"use client";

import React from "react";
import type { Project } from "@lib/types";
import { ProjectCard } from "./ProjectCard";

type Props = { projects: Project[] };

export const ProjectOverview = ({ projects }: Props) => (
  <div className="columns-1 sm:columns-2 lg:columns-3 space-y-6">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);
