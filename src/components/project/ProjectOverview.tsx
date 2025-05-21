"use client";

import React from "react";
import type { Project } from "@lib/types";
import { ProjectCard } from "./ProjectCard";

type Props = { projects: Project[] };

export const ProjectOverview = ({ projects }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);
