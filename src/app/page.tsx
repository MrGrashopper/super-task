import React from "react";
import { getProjects } from "@lib/projects";
import type { Project } from "@lib/types";
import ProjectsClientWrapper from "./projectClientWrapper";

const Page = async () => {
  const projects: Project[] = await getProjects();
  return <ProjectsClientWrapper projects={projects} />;
};

export default Page;
