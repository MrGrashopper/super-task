"use client";

import React from "react";
import type { Project } from "@lib/types";
import { ProjectCard } from "./ProjectCard";

type Props = { projects: Project[] };

export const ProjectOverview = ({ projects }: Props) => (
  <div className="flex flex-wrap items-start -mx-3">
    {projects.map((project) => (
      <div key={project.id} className="px-3 w-full sm:w-1/2 lg:w-1/3">
        <ProjectCard project={project} />
      </div>
    ))}
  </div>
);
