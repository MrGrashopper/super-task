import { useQuery } from "@tanstack/react-query";
import type { Task } from "@lib/types";

export const useTaskDetail = (projectId: string, taskId: string) =>
  useQuery<Task, Error>({
    queryKey: ["projects", projectId, "tasks", taskId],
    queryFn: () =>
      fetch(`/api/projects/${projectId}/tasks/${taskId}`).then((res) => {
        if (!res.ok) throw new Error("Task nicht gefunden");
        return res.json();
      }),
  });
