import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@lib/types";

export const useTasks = (projectId: string) => {
  const qc = useQueryClient();

  const query = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () =>
      fetch(`/api/projects/${projectId}/tasks`).then((r) => r.json()),
  });

  const add = useMutation<
    Task,
    Error,
    Omit<Task, "id" | "subtasks" | "projectId">
  >({
    mutationFn: (t) =>
      fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

  const update = useMutation<Task, Error, { id: string; data: Partial<Task> }>({
    mutationFn: ({ id, data }) =>
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

  const remove = useMutation<void, Error, string>({
    mutationFn: (id) =>
      fetch(`/api/tasks/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });

  return { ...query, add, update, remove };
};
