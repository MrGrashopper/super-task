"use client";

import type { Project } from "@lib/types";
import ProjectsClient from "./projectsClient";

type Props = { projects: Project[] };

const ProjectsClientWrapper = ({ projects }: Props) => (
  <ProjectsClient projects={projects} />
);

export default ProjectsClientWrapper;
