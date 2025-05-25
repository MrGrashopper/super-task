import { getProjects } from "@lib/projects";
import ProjectsClientWrapper from "./projectClientWrapper";

const Page = async () => {
  const projects = await getProjects();
  return <ProjectsClientWrapper projects={projects} />;
};
export default Page;
