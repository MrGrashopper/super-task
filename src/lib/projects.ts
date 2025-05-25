import { prisma } from "@lib/prisma";
import type { Project, Task, Subtask } from "@lib/types";

export const getProjects = async (): Promise<Project[]> => {
  const raw = await prisma.project.findMany({
    include: { tasks: { include: { subtasks: true } } },
  });
  return raw.map<Project>(
    ({ id, title, description, dueDate, status, tasks }) => ({
      id,
      title,
      description: description ?? undefined,
      dueDate: dueDate.toISOString(),
      status,
      tasks: tasks.map<Task>(
        ({
          id,
          title,
          description,
          dueDate,
          status,
          order,
          projectId,
          subtasks,
        }) => ({
          id,
          title,
          description: description ?? undefined,
          dueDate: dueDate.toISOString(),
          status,
          order,
          projectId,
          subtasks: subtasks.map<Subtask>(
            ({ id, title, description, dueDate, status, taskId }) => ({
              id,
              title,
              description: description ?? undefined,
              dueDate: dueDate.toISOString(),
              status,
              taskId,
            })
          ),
        })
      ),
    })
  );
};
