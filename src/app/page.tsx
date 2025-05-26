import { getProjects } from "@lib/projects";
import ProjectsClient from "./projectsClient";

const Page = async () => {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
};
export default Page;
