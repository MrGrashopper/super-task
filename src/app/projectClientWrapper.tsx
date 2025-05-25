"use client";

import { Suspense } from "react";
import type { Project } from "@lib/types";
import { FullPageLoader } from "@components/ui";
import ProjectsClient from "./projectsClient";

interface Props {
  projects: Project[];
}

const ProjectsClientWrapper = ({ projects }: Props) => (
  <Suspense fallback={<FullPageLoader />}>
    <ProjectsClient projects={projects} />
  </Suspense>
);

export default ProjectsClientWrapper;
