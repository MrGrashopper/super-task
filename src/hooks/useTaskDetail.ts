import { useQuery } from "@tanstack/react-query";
import type { Task } from "@lib/types";

export const useTaskDetail = (taskId: string) =>
  useQuery<Task, Error>({
    queryKey: ["task", taskId],
    queryFn: () => fetch(`/api/tasks/${taskId}`).then((r) => r.json()),
  });
