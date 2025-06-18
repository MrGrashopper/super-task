"use client";

import React, { Suspense } from "react";
import { FullPageLoader } from "@components/ui";
import type { Project } from "@lib/types";

const ProjectsClient = React.lazy(() => import("./projectsClient"));

type Props = { projects: Project[] };

const ProjectsClientWrapper = ({ projects }: Props) => (
  <Suspense fallback={<FullPageLoader />}>
    <ProjectsClient projects={projects} />
  </Suspense>
);

export default ProjectsClientWrapper;
