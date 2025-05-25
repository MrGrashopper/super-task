import { prisma } from "@lib/prisma";
import type { Project } from "@lib/types";

export const getProjects = async (): Promise<Project[]> => {
  const raw = await prisma.project.findMany({
    include: { tasks: { include: { subtasks: true } } },
  });
  return JSON.parse(JSON.stringify(raw)) as Project[];
};
